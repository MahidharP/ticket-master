import React from 'react'
import {ProgressBar} from 'react-bootstrap'

function Progress (props) {
    let completedTickets=props.tickets.filter((ticket)=>{
        return ticket.status=='completed';
    })
    var result=Math.round((completedTickets.length / props.tickets.length)*100);

    return <ProgressBar active now={result} label={`${result}%`}/>
}

export default Progress