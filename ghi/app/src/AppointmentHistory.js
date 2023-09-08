import React, { useState, useEffect } from 'react';

export default function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [query, setQuery] = useState('');

    async function loadAppointments() {
        try {
            const response = await fetch('http://localhost:8080/api/appointments/');

            if (response.ok) {
                const data = await response.json();
                setAppointments(data.appointments);
            }

        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        loadAppointments();
    }, []);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearch = () => {

        if (`${query}` !== '') {
            setAppointments(appointments.filter((aptmt) => aptmt.vin === `${query}`));
        } else {
            loadAppointments();
        }

        setQuery('');
    };


    return (
        <div>
            <h1>Service History</h1>
            <div className="input-group mb-3">
                <input type="text" className="form-control" placeholder="Search by VIN..." id="search" onChange={handleInputChange} value={query} />
                <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={handleSearch}>Search</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Is VIP?</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td>{appointment.vip}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
