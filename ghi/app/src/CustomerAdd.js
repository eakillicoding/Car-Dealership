import React, {useState} from 'react';

function CustomerAdd () {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    const handleFirstNameChange = (event) => {
        const value = event.target.value
        setFirstName(value)
    };

    const handleLastNameChange = (event) => {
        const value = event.target.value
        setLastName(value)
    };

    const handleAddressChange = (event) => {
        const value = event.target.value
        setAddress(value)
    };

    const handlePhoneNumberChange = (event) => {
        const value = event.target.value
        setPhoneNumber(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.first_name = firstName
        data.last_name = lastName
        data.address = address
        data.phone_number = phoneNumber
        const url = `http://localhost:8090/api/customers/`

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetch(url, fetchConfig)

            if (response.ok) {
                setFirstName('')
                setLastName('')
                setAddress('')
                setPhoneNumber('')
            }

        } catch(e) {
            console.error(e)
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Add a Customer</h1>
                    <form onSubmit={handleSubmit} id="create-salesperson-form">
                        <div className="form-floating mb-3">
                            <input value={firstName} onChange={handleFirstNameChange} placeholder="First Name" required type="text" id="first_name" className="form-control" />
                            <label htmlFor="first_name">First name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={lastName} onChange={handleLastNameChange} placeholder="Last Name" required type="text" id="last_name" className="form-control" />
                            <label htmlFor="last_name">Last name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={address} onChange={handleAddressChange} placeholder="Address" required type="text" id="address" className="form-control" />
                            <label htmlFor="address">Address...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Phone number" required type="text" id="phone_number" className="form-control" />
                            <label htmlFor="phone_number">Phone number...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomerAdd;
