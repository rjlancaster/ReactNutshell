import React, { Component } from 'react';
import { Button, Form } from 'semantic-ui-react'


export default class EventForm extends Component {
  state = {
    id: "",
    name: "",
    date: "",
    location: ""
  }


  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)

}

constructNewEvent = evt => {
  evt.preventDefault()

  const createEvent = {
    id: this.state.id,
    name: this.state.name,
    date: this.state.date,
    location: this.state.location

  }
console.log(this.props)
  this.props.addEvent(createEvent).then(() => this.props.history.push("/events"))

}

  render() {
    return (
      <form className="ui form">
      <div className="event-form-group">
        <label htmlFor="eventName">Event</label>
        <input type="text" required
          className="event-form-control"
          onChange={this.handleFieldChange}
          id="name"
          placeholder="Event Name" />
      </div>
      <div className="event-form-group">
            <label htmlFor="Date">Date</label>
            <input type="datetime-local" required
              className="event-form-control"
              onChange={this.handleFieldChange}
              id="date"
              placeholder="Date" />
          </div>
          <div className="event-form-group">
            <label htmlFor="Location">Location</label>
            <input type="text" required
              className="event-form-control"
              onChange={this.handleFieldChange}
              id="location"
              placeholder="Event Location" />
          </div>
          <Button type="submit" onClick={this.constructNewEvent} color="blue">Save</Button>
        </form>
    )

  }
}