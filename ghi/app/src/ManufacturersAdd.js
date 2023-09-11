import React, {useState} from 'react';

function ManufacturersAdd () {
    const [name, setName] = useState('')

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name
        const url = 'http://localhost:8100/api/manufacturers/'

        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig)

        if (response.ok) {
            event.target.reset()
            setName('')
        }
    };

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Create a manufacturer</h2>
                    <form onSubmit={handleSubmit} id="create-manufacturer-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Manufacturer name" required type="text" id="name" autoComplete="on" className="form-control" />
                            <label htmlFor="name">Manufacturer name...</label>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ManufacturersAdd;
