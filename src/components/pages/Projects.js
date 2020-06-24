import axios from 'axios'
import React, { Component, Fragment } from 'react'
import Project from './Project'
const config = require('../../config.json')

export default class Projects extends Component {
  state = {
    newproject: null,
    projects: []
  }

  fetchProjects = async () => {
    // add call to AWS API Gateway to fetch projects here
    // then set them in state
    try {
      const res = await axios.get(`${config.api.invokeUrl}/projects`)
      const projects = res.data
      this.setState({ projects: projects })
    } catch (err) {
      console.log(`An error has occurred: ${err}`)
    }
  }

  componentDidMount = () => {
    this.fetchProjects()
  }

  render() {
    return (
      <Fragment>
        <section className="section">
          <div className="container">
            <h1>Your Projects</h1>
            <p className="subtitle is-5">List of projects you have uploaded.</p>
            <br />
            <div className="columns">
              <div className="column">
                <div className="tile is-ancestor">
                  <div className="tile is-4 is-parent  is-vertical">{this.state.projects && this.state.projects.length > 0 ? this.state.projects.map(project => <Project name={project.projectname} id={project.id} key={project.id} />) : <div className="tile notification is-warning">No projects available</div>}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    )
  }
}
