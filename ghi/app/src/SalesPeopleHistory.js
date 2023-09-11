import React, {useState, useEffect} from 'react';

function SalesPeopleHistory () {
    const [filter, setFilter] = useState('')
    const [salespeople, setSalespeople] = useState([])
    const [sales, setSales] = useState([])

    const fetchSalespeopleData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/')

            if (response.ok) {
                const data = await response.json()
                setSalespeople(data.salespeople)
            }
        } catch(e) {
            console.error(e)
        }
    };

    const fetchSalesData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/sales/')

            if (response.ok) {
                const data = await response.json()
                setSales(data.sales)
            };
        } catch(e) {
            console.error(e)
        }
    };

    const handleFilter = (event) => {
        const value = event.target.value
        setFilter(value)
    };

    useEffect(() => {
        fetchSalesData()
        fetchSalespeopleData()
    }, []);

    return (
        <div>
            <h1>Salesperson History</h1>
            <div className="row">
                <div className="mb-3">
                    <select value={filter} onChange={handleFilter} required name="salesperson" id="salesperson" className="form-select" >
                        <option value="">Choose a Salesperson</option>
                        {salespeople.map(salesperson => {
                            return(
                                <option key={salesperson.employee_id} value={salesperson.first_name}>
                                    {salesperson.first_name} {salesperson.last_name}
                                </option>
                            )
                        })}
                    </select>
                </div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Salesperson</th>
                            <th>Customer</th>
                            <th>VIN</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.filter(sale => sale.salesperson.first_name === filter).map(sale => {
                            return (
                            <tr key={sale.id}>
                                <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                                <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                                <td>{sale.automobile.vin}</td>
                                <td>${sale.price}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SalesPeopleHistory;
