export default function CreateTechnician() {

    const handleSubmit = (async event => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const formJson = JSON.stringify(Object.fromEntries(formData.entries()));

        try {
            const response = await fetch(
                'http://localhost:8080/api/technicians/',
                {method: "post", body: formJson, headers: {'Content-Type': 'application/json'}}
                );

            if (response.ok) {
                event.target.reset();
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
                        <h1>Add a Technician</h1>
                        <form onSubmit={handleSubmit} id="technician-form">
                            <div className="form-floating mb-3">
                                <input placeholder="First name" required type="text" id="FirstName" name="first_name" className="form-control"/>
                                <label htmlFor="FirstName">First name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Last name" required type="text" id="LastName" name="last_name" className="form-control"/>
                                <label htmlFor="LastName">Last name...</label>
                            </div>
                            <div className="form-floating mb-3">
                                <input placeholder="Employee ID" required type="number" id="EmployeeID" name="employee_id" className="form-control"/>
                                <label htmlFor="EmployeeID">Employee ID...</label>
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
