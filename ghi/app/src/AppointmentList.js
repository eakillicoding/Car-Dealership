import React, { useState, useEffect } from 'react';


export default function ListAppointments() {
    let [appointments, setAppointments] = useState([]);

    useEffect(() => {
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
        loadAppointments();
    }, []);

    return (
        <div>
            <h1>Service Appointments</h1>
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
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.vin}</td>
                            <td></td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.technician.first_name} {appointment.technician.last_name}</td>
                            <td>{appointment.reason}</td>
                            <td>
                                <button type="button" className="btn btn-danger">Cancel</button>
                                <button type="button" className="btn btn-success">Finish</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
