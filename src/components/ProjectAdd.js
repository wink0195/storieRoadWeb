import React, { Component, Fragment } from 'react';
import Project from './Project';
import axios from "axios";
const config = require('../config.json');

export default class ProjectAdd extends Component {

  state = {
    newproject: { 
      "projectname": "", 
      "id": ""
    },
    projects: []
  }

  handleAddProject = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway add project endpoint here
    try {
      const params = {
        "id": id,
        "projectname": this.state.newproject.projectname
      };
      await axios.post(`${config.api.invokeUrl}/projects/${id}`, params);
      this.setState({ projects: [...this.state.projects, this.state.newproject] });
      this.setState({ newproject: { "projectname": "", "id": "" }});
    }catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  handleUpdateProject = async (id, name) => {
    // add call to AWS API Gateway update project endpoint here
    try {
      const params = {
        "id": id,
        "projectname": name
      };
      await axios.patch(`${config.api.invokeUrl}/projects/${id}`, params);
      const projectToUpdate = [...this.state.projects].find(project => project.id === id);
      const updatedProjects = [...this.state.projects].filter(project => project.id !== id);
      projectToUpdate.projectname = name;
      updatedProjects.push(projectToUpdate);
      this.setState({projects: updatedProjects});
    }catch (err) {
      console.log(`Error updating project: ${err}`);
    }
  }

  handleDeleteProject = async (id, event) => {
    event.preventDefault();
    // add call to AWS API Gateway delete project endpoint here
    try {
      await axios.delete(`${config.api.invokeUrl}/projects/${id}`);
      const updatedProjects = [...this.state.projects].filter(project => project.id !== id);
      this.setState({projects: updatedProjects});
    }catch (err) {
      console.log(`Unable to delete project: ${err}`);
    }
  }

  fetchProjects = async () => {
    // add call to AWS API Gateway to fetch projects here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/projects`);
      const projects = res.data;
      this.setState({ projects: projects });
    } catch (err) {
      console.log(`An error has occurred: ${err}`);
    }
  }

  onAddProjectNameChange = event => this.setState({ newproject: { ...this.state.newproject, "projectname": event.target.value } });
  onAddProjectIdChange = event => this.setState({ newproject: { ...this.state.newproject, "id": event.target.value } });

  componentDidMount = () => {
    this.fetchProjects();
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Add Project</h1>
            <p className="subtitle is-5">Add and remove projects using the form below:</p>
            <br />
            <div className="columns">
              <div className="column is-one-third">
                <form onSubmit={event => this.handleAddProject(this.state.newproject.id, event)}>
                  <div className="field has-addons">
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Project Name"
                        value={this.state.newproject.projectname}
                        onChange={this.onAddProjectNameChange}
                      />
                    </div>
                    <div className="control">
                      <input 
                        className="input is-medium"
                        type="text" 
                        placeholder="Enter id"
                        value={this.state.newproject.id}
                        onChange={this.onAddProjectIdChange}
                      />
                    </div>
                    <div className="control">
                      <button type="submit" className="button is-primary is-medium">
                        Add project
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="column is-two-thirds">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">
                    { 
                      this.state.projects.map((project, index) => 
                        <Project 
                          isAdd={true}
                          handleUpdateProject={this.handleUpdateProject}
                          handleDeleteProject={this.handleDeleteProject} 
                          name={project.projectname} 
                          id={project.id}
                          key={project.id}
                        />)
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
