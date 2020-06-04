import React, { Component, Fragment }  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class ProjectAdmin extends Component {

  state = {
    isEditMode: false,
    updatedprojectname: this.props.name
  }

  handleProjectEdit = event => {
    event.preventDefault();
    this.setState({ isEditMode: true });
  }

  handleEditSave = event => {
    event.preventDefault();
    this.setState({ isEditMode: false });
    this.props.handleUpdateProject(this.props.id, this.state.updatedprojectname);
  }

  onAddProjectNameChange = event => this.setState({ "updatedprojectname": event.target.value });

  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProjectEdit} className="project-edit-icon">
              <FontAwesomeIcon icon="edit" />
            </a>
            <button onClick={event => this.props.handleDeleteProject(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit project name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedprojectname}
                onChange={this.onAddProjectNameChange}
              />
              <p className="project-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="project-title">{ this.props.name }</p>
              <p className="project-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}
