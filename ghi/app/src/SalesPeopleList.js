import React, {useEffect, useState} from "react";

function SalesPeopleList() {
    const [salespeople, setSalesPeople] = useState([])

    async function fetchSalespeopleData() {
        try {
            const response = await fetch("http://localhost:8090/api/salespeople/")

            if (response.ok) {
                const data = await response.json()
                setSalesPeople(data.salespeople)
            }

        } catch(e) {
            console.error(e)
        }
    };

    useEffect(() => {
        fetchSalespeopleData()
    }, []);

    return (
        <div>
            <h1>Salespeople</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>Employee ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                    </tr>
                </thead>
                <tbody>
                    {salespeople.map(salesperson => {
                        return (
                            <tr key={salesperson.employee_id}>
                                <td>{salesperson.employee_id}</td>
                                <td>{salesperson.first_name}</td>
                                <td>{salesperson.last_name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default SalesPeopleList;
