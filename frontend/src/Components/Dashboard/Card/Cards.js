import {useEffect,useState} from 'react';
import Card from './Card';
import {SERVER_URL} from '../../../Services/helper';

const Cards = () => {

    //Count Total Number of Requests
    const [totalTickets, setTotalTickets] = useState();
    const [pendingTickets, setPendingTickets] = useState();
    const [solvedTickets, setSolvedTickets] = useState();
    const [holdTickets, setHoldTickets] = useState();
    

    const getTicketsCount = () =>
    {
        fetch(`${SERVER_URL}/totalTickets/`)
        .then(resposne=> resposne.json())
        .then(res=>setTotalTickets(res))

        fetch(`${SERVER_URL}/pendingTickets/`)
        .then(resposne=> resposne.json())
        .then(res=>setPendingTickets(res))

        fetch(`${SERVER_URL}/solvedTickets/`)
        .then(resposne=> resposne.json())
        .then(res=>setSolvedTickets(res))

        fetch(`${SERVER_URL}/holdTickets/`)
        .then(resposne=> resposne.json())
        .then(res=>setHoldTickets(res))
    }

    useEffect(() => {
        getTicketsCount();
    },[])

    return (
        <div class="container-sm border mb-3 mt-5">
            {/* <div class="d-flex justify-content-start"> */}
                <div class="row">
                    <div class="col-md-4 col-xl-3">
                        <Card heading={"Total Tickets"} number={totalTickets}/>     
                    </div>
                    <div class="col-md-4 col-xl-3">
                        <Card heading={"Solved Tickets"} number={solvedTickets}/>
                    </div>
                    <div class="col-md-4 col-xl-3">
                        <Card heading={"Pending Tickets"} number={pendingTickets}/>
                    </div>
                    <div class="col-md-4 col-xl-3">
                        <Card heading={"Tickets On Hold"} number={holdTickets}/>
                    </div>
                </div>
            {/* </div> */}
        </div>  
    )
}

export default Cards