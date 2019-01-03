import React from 'react'

function Progress1(props){
    let completedTasks = props.tickets.filter((ticket) => {
        return ticket.status == 'completed';
    })
    var result = Math.round((completedTasks.length / props.tickets.length) *100 )
    console.log(result)
    result = Number(result)
    return (
        <div class="progress">
            <div class="progress-bar" role="progressbar" aria-valuemax="20"></div>
        </div>
    )
}


export default Progress1 
