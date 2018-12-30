import React from 'react'
import axios from 'axios';
import api from '../config/api'
import key from '../config/credentials'
class TicketForm extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            name:'',
            department:'',
            priority:'',
            message:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }
    handleSubmit(event) {
        event.preventDefault();
        const formData= {
            name:this.state.name,
            department: this.state.department,
            priority:this.state.priority,
            message:this.state.message
        }
        axios.post(`${api.tickets.baseUrl}?api_key=${key}`, formData).then((response)=>{
            if(response.data.errors) {
                console.log(response.data)
            } else {
                this.props.handleResponse(response.data)
                this.setState({
                    name:'',
                    department:'',
                    priority:'',
                    message:''
                })
            }
        })
    }
    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        }
        )
    }
    render() {
        return (
            <div>
                <h2>Add Ticket</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Name
                            <input type="text" value={this.state.name} name="name" onChange={this.handleChange} className="form-control"/>
                        </label>
                    </div>
                    <div className="form-group">
                        <label>Department
                            <select value={this.state.department} name="department" onChange={this.handleChange} className="form-control">
                                <option value="">Select</option>
                                <option value="Technical">Technical</option>
                                <option value="HR">HR</option>
                                <option value="Sales">Sales</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>Priority</label> </div>
                    
                    <div className="custom-control custom-radio custom-control-inline">
                        <label className="form-check-label">
                            <input type="radio" value="High" checked={this.state.priority === 'High'} onChange={this.handleChange} name="priority" className="form-check-input"/> High
                        </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <label className="form-check-label">
                            <input type="radio" value="Medium" checked={this.state.priority === 'Medium'} onChange={this.handleChange} name="priority" className="form-check-input"/> Medium
                        </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                        <label className="form-check-label">
                            <input type="radio" value="Low" checked={this.state.priority === 'Low'} onChange={this.handleChange} name="priority" className="form-check-input"/> Low
                        </label>
                    </div>
                    
                    <div className="form-group">
                        <label>Message
                            <textarea className="form-control" onChange={this.handleChange} value={this.state.message} name="message"></textarea>
                        </label>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default TicketForm