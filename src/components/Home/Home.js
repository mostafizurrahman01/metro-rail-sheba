import React, { useEffect, useState } from 'react';
import FakeData from '../../FakeData/FakeData.json';
import TicketCard from '../TicketCard/TicketCard';
import './Home.css';
import header from '../../images/header.png';
import { useHistory } from 'react-router';


const Home = () => {
    const [ticket, setTicket] = useState([]);

    useEffect(() => {

        setTicket(FakeData.metro);
    }, [])

    const history = useHistory()
    const handleTicket = (id) => {
        history.push(`/destination/${id}`);
    }
    return (
        <div className="home-container">
            
            <div style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${header})` }} className="home">
                
                {
                    ticket.map(ticket => <TicketCard ticket={ticket} key={ticket.key} handleTicket={handleTicket}></TicketCard>)
                }
            </div>

        </div>

    );
};



export default Home;