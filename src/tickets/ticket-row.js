import React from 'react'
import axios from 'axios'
import api from '../config/api'
import key from '../config/credentials'
class TicketRow extends React.Component {
    // constructor is optional here.. props will always be available
    constructor(props){
        super(props)
        this.state = {
            loading: false 
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange() {
        this.setState({
            loading: true 
        })
        const putData= {
            status : this.props.status === "completed" ? "open" : "completed"
        }
        axios.put(`${api.tickets.baseUrl}/${this.props.ticket_code}?api_key=${key}`, putData).then((response)=>{
            this.props.handleStatusChange(response.data);
            this.setState({
                loading: false
            })
        }).catch((err)=>{
            console.log(err)
        })
    }
    render() {
        const {ticket_code, name, department, priority, message, status} = this.props
        
        return (
        <tr>
            <td>{ticket_code}</td>
            <td>{name}</td>
            <td>{department}</td>
            <td>{priority}</td>
            <td>{message}</td>
            <td>{status}</td>
            <td><input type="checkbox" value={ticket_code} checked= {status==="completed" ? true : false}onChange={this.handleChange} disabled={this.state.loading}/>
            {this.state.loading && <img src="http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" height="32" width="32" alt="spinner" />}</td>
        </tr>)
    }
}
export default TicketRow