import React from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router';
import './TicketCard.css'


const TicketCard = (props) => {
    
    const { name, price, img,key } = props.ticket;
    const handleTicket = props.handleTicket;

    return (
        <div className="ticket">
            <Card className="bg-dark text-white ticket-card">
                <Card.Img src={img} alt="Card image" />
                <Card.ImgOverlay>
                    <Card.Title className="ticket-title">{name}</Card.Title>
                    <Card.Text className="ticket-btn">
                        <button onClick={() => handleTicket(key)}>Buy Now</button>
                    </Card.Text>
                    <Card.Text className="ticket-footer">{price}</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>

    );
};

export default TicketCard;