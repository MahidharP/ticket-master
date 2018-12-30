import React from 'react'
import axios from 'axios'
import api from '../config/api'
import key from '../config/credentials'
import TicketForm from '../tickets/form.js'
import TicketTable from '../tickets/ticket-table'
import PieChart from '../tickets/piechart'
import BarChart from '../tickets/bar'


class TicketIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            tickets:[],
            isLoaded: false
        }
        this.handleResponse = this.handleResponse.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    componentDidMount() {
        axios.get(`${api.tickets.baseUrl}?api_key=${key}`).then((response)=>{
            this.setState({
                tickets: response.data,
                isLoaded: true
            })
        })
    }
    handleStatusChange(responseTicket) {
        let oldTicket = this.state.tickets.find(ticket => ticket.ticket_code == responseTicket.ticket_code)
        oldTicket.status = responseTicket.status;
        this.setState(prevState=>({
            tickets: [].concat(prevState.tickets)
        }))
    }
    handleResponse(ticket) {
        this.setState(prevState=>({
            tickets : prevState.tickets.concat(ticket)
        }))
    }
    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        
                        {this.state.isLoaded ? <TicketTable tickets={this.state.tickets} handleStatusChange={this.handleStatusChange}/> : 'Loading'}
                            
                    </div>
                    <div className="col-md-4">
                        <TicketForm handleResponse={this.handleResponse}/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <PieChart tickets={this.state.tickets}/>
                    </div>
                    <div className="col-md-6">
                        <BarChart tickets={this.state.tickets}/>
                    </div>
                </div>
                
                
                
                
            </div>
            
        )
    }
}
// function LoadImg () {
//     return <img style={{alignContent:"center"}}src={require ('../images/giphy.gif')} alt="loader"/>
// }
export default TicketIndex