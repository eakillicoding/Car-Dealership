import React, { useState, useEffect } from 'react';


export default function ListTechnicians() {
    let [technicians, setTechnicians] = useState([]);
    
    async function loadTechnicians() {
        try {
            const response = await fetch('http://localhost:8080/api/technicians/');

            if(response.ok) {
                const data = await response.json();
                setTechnicians(data.technicians);
            }

        } catch(e) {
            console.error(e);
        }
    }

    useEffect(() => {
        loadTechnicians();
    }, []);

    return (
        <div>
            <h1>Technicians</h1>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician) => (
                        <tr key={technician.id}>
                            <td>{technician.employee_id}</td>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
