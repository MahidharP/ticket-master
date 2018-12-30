import React from 'react'
import Chart from 'react-google-charts';


function PieChart (props) {
    let highTickets=props.tickets.filter((ticket)=>{
        return ticket.priority==='High';
    })
    
    let mediumTickets=props.tickets.filter((ticket)=>{
        return ticket.priority==='Medium';
    })
    
    let lowTickets=props.tickets.filter((ticket)=>{
        return ticket.priority==='Low';
    })
    return (
        
    <Chart  width={'500px'}
  height={'300px'}
  chartType="PieChart"
  loader={<div>Loading Chart</div>}
  data={[
    ['Task', 'Hours per Day'],
    ['High', highTickets.length],
    ['Medium', mediumTickets.length],
    ['Low', lowTickets.length]
  ]}
  options={{
    title: 'Tickets Based on Priority',
  }}
  rootProps={{ 'data-testid': '1' }}
/>)

}

export default PieChart