import React, {useState, useEffect} from 'react';

function SalesAdd () {
    const [automobile, setAutomobile] = useState('')
    const [automobiles, setAutomobiles] = useState([])
    const [salesperson, setSalesperson] = useState('')
    const [salespeople, setSalespeople] = useState([])
    const [customer, setCustomer] = useState('')
    const [customers, setCustomers] = useState([])
    const [price, setPrice] = useState('')

    const fetchAutomobilesData = async () => {
        try {
            const response = await fetch('http://localhost:8100/api/automobiles/')

            if (response.ok) {
                const data = await response.json()
                setAutomobiles(data.autos)
            }
        } catch(e) {
            console.error(e)
        }
    };

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

    const fetchCustomersData = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/customers/')

            if (response.ok) {
                const data = await response.json()
                setCustomers(data.customers)
            }
        } catch(e) {
            console.error(e)
        }
    };

    useEffect(() => {
        fetchAutomobilesData()
        fetchSalespeopleData()
        fetchCustomersData()
    }, []);

    const handleAutomobileChange = (event) => {
        const value = event.target.value
        setAutomobile(value)
    };

    const handleSalespersonChange = (event) => {
        const value = event.target.value
        setSalesperson(value)
    };

    const handleCustomerChange = (event) => {
        const value = event.target.value
        setCustomer(value)
    };

    const handlePriceChange = (event) => {
        const value = event.target.value
        setPrice(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.automobile = automobile
        data.salesperson = salesperson
        data.customer = customer
        data.price = price
        const url = `http://localhost:8090/api/sales/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const solddata = {
            "sold": true
        }

        const fetchSoldConfig = {
            method: "put",
            body: JSON.stringify(solddata),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const soldresponse = await fetch(`http://localhost:8100/api/automobiles/${automobile}/`, fetchSoldConfig)

            if (soldresponse.ok) {
            }
        } catch(e) {
            console.error(e)
        }

        try {
            const response = await fetch(url, fetchConfig)

            if (response.ok) {
                setAutomobile('')
                setSalesperson('')
                setCustomer('')
                setPrice('')
            }
        } catch(e) {
            console.error(e)
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={(event) => handleSubmit(event)} id="create-sale-form">
                        <h5>Automobile VIN</h5>
                        <div className="mb-3">
                            <select value={automobile} onChange={handleAutomobileChange} required name="automobile" id="automobile" className="form-select" >
                                <option value="">Choose an automobile VIN...</option>
                                {automobiles.filter(automobile => automobile.sold===false).map(automobile => {
                                    return (
                                        <option key={automobile.vin} value={automobile.vin}>
                                            {automobile.vin}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                        <h5>Salesperson</h5>
                        <div className="mb-3">
                            <select value={salesperson} onChange={handleSalespersonChange} required name="salesperson" id="salesperson" className="form-select" >
                                <option value="">Choose a salesperson...</option>
                                {salespeople.map(salesperson => {
                                    return (
                                        <option key={salesperson.employee_id} value={salesperson.employee_id}>
                                            {salesperson.first_name} {salesperson.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <h5>Customer</h5>
                        <div className="mb-3">
                            <select value={customer} onChange={handleCustomerChange} required name="customer" id="customer" className="form-select" >
                                <option value="">Choose a customer...</option>
                                {customers.map(customer => {
                                    return (
                                        <option key={customer.id} value={customer.id}>
                                            {customer.first_name} {customer.last_name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <h5>Price</h5>
                        <div className="form-floating mb-3">
                            <input value={price} onChange={handlePriceChange} placeholder="Price" required type="number" id="price" className="form-control" />
                            <label htmlFor="price">0</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SalesAdd;
