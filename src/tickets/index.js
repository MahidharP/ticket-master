import React from 'react'
import axios from 'axios'
import api from '../config/api'
import key from '../config/credentials'
import TicketForm from '../tickets/form.js'
import TicketTable from '../tickets/ticket-table'
import PieChart from '../tickets/piechart'
import BarChart from '../tickets/bar'
import SearchForm from '../tickets/search'


class TicketIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            tickets:[],
            filteredTickets: [],
            isLoaded: false
        }
        this.handleResponse = this.handleResponse.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }
    componentDidMount() {
        axios.get(`${api.tickets.baseUrl}?api_key=${key}`).then((response)=>{
            this.setState({
                tickets: response.data,
                filteredTickets: response.data,
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
            tickets : prevState.tickets.concat(ticket),
            filteredTickets: prevState.tickets.concat(ticket)
        }))
    }

    handleSearch(code) {
        this.setState(prevState => {
            return {
                filteredTickets: prevState.tickets.filter(ticket => ticket.ticket_code.toLowerCase().indexOf(code.toLowerCase()) >= 0)
            }
        })
    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <div className="row">
                            <div className="col-md-8">
                                <h2> Listing Tickets - {this.state.filteredTickets.length} of {this.state.tickets.length} </h2>
                            </div>
                            <div className="col-md-4">
                                <SearchForm handleSearch={this.handleSearch} />
                            </div>
                        </div>
                        <TicketTable tickets={this.state.filteredTickets} handleStatusChange={this.handleStatusChange}/>
                        
                        {/* <TicketTable tickets={this.state.tickets} handleStatusChange={this.handleStatusChange}/> */}
                            
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