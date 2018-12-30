import React from 'react'
import Chart from 'react-google-charts';


function BarChart (props) {
    let technicalTickets=props.tickets.filter((ticket)=>{
        
        return ticket.department=='Technical';
    })

    let technicalCompleted = technicalTickets.filter((ticket)=>{
        return ticket.status == 'completed';
    })

    let hrTickets=props.tickets.filter((ticket)=>{
        return ticket.department=='HR';
    })
    let hrCompleted = hrTickets.filter((ticket)=>{
        return ticket.status == 'completed';
    })

    let salesTickets=props.tickets.filter((ticket)=>{
        return ticket.department=='Sales';
    })
    let salesCompleted = salesTickets.filter((ticket)=>{
        return ticket.status == 'completed';
    })
    // let openTickets = props.tickets.length-completedTickets.length;
    // var result=Math.round((completedTickets.length / props.tickets.length)*100);
    // console.log('Technical Tickets',technicalTickets.length)
    return (
        
        <Chart
        width={'500px'}
        height={'300px'}
        chartType="Bar"
        loader={<div>Loading Chart</div>}
        data={[
          ['Department', 'Completed', 'Open'],
          ['Technical', technicalCompleted.length, technicalTickets.length-technicalCompleted.length],
          ['HR', hrCompleted.length, hrTickets.length-hrCompleted.length],
          ['Sales', salesCompleted.length, salesTickets.length-salesCompleted.length],
        ]}
        options={{
          // Material design options
          chart: {
            title: 'Tickets By Department',
            
          },
        }}
        // For tests
        rootProps={{ 'data-testid': '2' }}
      />)

}

export default BarChart