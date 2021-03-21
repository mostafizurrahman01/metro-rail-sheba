import React from 'react';
// import "./RiderCard.css";
import Ticket from "../../images/tickets 3.png"
import './DestinationDetails.css';

const DestinationDetails = (props) => {
    const { name} = props.selectedVehicle;
    const {cost ,ticketNum} = props.tickets;
  
    return (
        <div className ="ticket-book">
            <div className="ticket-info">
                <span>{name}</span>
                <span className="Ticket" > <img src={Ticket} alt="" /> <span>{ticketNum}</span> </span>
                
            </div>
            <div className="cost-info">
                    <span>$ {cost}</span>
            </div>
        </div>
    );
};

export default DestinationDetails;