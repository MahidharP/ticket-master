import React from 'react'
import axios from 'axios'
import api from '../config/api'
import key from '../config/credentials'
class TicketRow extends React.Component {
    // constructor is optional here.. props will always be available
    
    handleChange(ticket_code, status) {
        const putData= {
            ticket_code,
            status : status === "completed" ? "open" : "completed"
        }
        axios.put(`${api.tickets.baseUrl}/${ticket_code}?api_key=${key}`, putData).then((response)=>{
            this.props.handleStatusChange(response.data);
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
            <td><input type="checkbox" value={ticket_code} checked= {status==="completed" ? true : false}onChange={()=>{
                this.handleChange(ticket_code, status)
                }}/></td>
        </tr>)
        
    }
}
export default TicketRow