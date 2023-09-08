import React, {useEffect, useState} from "react";


export default function CreateAppointment() {
    let [technicians, setTechnicians] = useState([]);

    useEffect(() => {
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
        loadTechnicians();
    }, []);

    const handleSubmit = (async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formJson = JSON.stringify(Object.fromEntries(formData.entries()));
        try {
            const response = await fetch(
                'http://localhost:8080/api/appointments/',
                {method: "post", body: formJson, headers: {'Content-Type': 'application/json'}}
                );

            if (response.ok) {
                event.target.reset();
                window.location.href = "/appointments";
            }

        } catch(e) {
            console.error(e);
        }
    });

    return (
        <div className="container">
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Create a Service Appointment</h1>
                        <form onSubmit={handleSubmit} id="appointment-form">
                            <div className="form-floating mb-3">
                                <input required placeholder="Automobile VIN" type="text" id="vin" name="vin" className="form-control"/>
                                <label htmlFor="vin">Automobile VIN</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Customer" type="text" id="customer" name="customer" className="form-control"/>
                                <label htmlFor="customer">Customer</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Select a date and time" type="datetime-local" id="dateTime" name="date_time" className="form-control"/>
                                <label htmlFor="dateTime" className="form-label">Select a date and time</label>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="technician" className="form-label">Technician</label>
                                <select required id="technician" name="technician" className="form-select">
                                    <option value="">Choose a technician</option>
                                    {technicians.map((technician) => (
                                        <option key={technician.id} value={technician.id}>{technician.first_name} {technician.last_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-floating mb-3">
                                <input required placeholder="Reason" type="text" id="reason" name="reason" className="form-control"/>
                                <label htmlFor="reason" className="form-label">Reason</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
