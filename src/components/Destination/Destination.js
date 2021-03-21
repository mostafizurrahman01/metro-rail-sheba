import FakeData from '../../FakeData/FakeData.json';
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import DestinationDetails from '../DestinationDetails/DestinationDetails';
import Map from '../Map/Map';
import './Destination.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Destination = () => {
    const [route, setRoute] = useState({
        from: "",
        to: ""
    });
    const [startDate, setStartDate] = useState(new Date());
    const [searched, setSearched] = useState(false);
    const { id } = useParams();
    const [selectedTicket, setSelectedTicket] = useState([])
    useEffect(() => {

        const data = FakeData.metro;
        const matchedData = data.find(ticket => ticket.key === id);
        console.log(matchedData);
        setSelectedTicket(matchedData);

    }, [id]);


    const handleChange = (e) => {

        const location = { ...route };
        if (e.target.name === "from") {
            location.from = e.target.value;
            setRoute(location);
        }
        if (e.target.name === "to") {
            location.to = e.target.value;
            setRoute(location);
        }
        e.preventDefault();
    }


    console.log(route);
    return (
        <div className="container" >
            
            <div className="search-div container">
                {!searched &&
                    <form onSubmit={() => setSearched(!searched)} className="submit-form">
                        <div className="input-group">
                            <span>
                                Pick From:
                        </span>
                            <input onChange={handleChange} id="from" type="text" name="from" placeholder="<< Location From " required />
                        </div>
                        <div className="input-group">
                            <span>
                                Pick To:
                        </span>
                            <input onChange={handleChange} type="text" id="to" name="to" placeholder="Location to >>" required />
                        </div>
                        <div className="">
                            <span>
                                PickUp Date:
                        </span>
                            <DatePicker className="datePicker" selected={startDate} onChange={date => setStartDate(date)} />
                        </div>
                        <input className="btn-search" type="submit" value="Search" />
                    </form>}
                {searched &&
                    <div className="search-results">
                        <div className="route-info">
                            <h3>{route.from}</h3>
                            <br />
                            <h6>To</h6>
                            <h3> {route.to} </h3>
                            <button onClick={() => setSearched(!searched)} className="btn-search">Back</button>
                        </div>
                        {
                            selectedTicket?.tickets?.map(tickets => <DestinationDetails selectedTicket={selectedTicket} tickets={tickets} ></DestinationDetails>)
                        }

                    </div>
                }


                <div className="map">
                    <Map></Map>
                </div>
            </div>
        </div>
    );

};
export default Destination;