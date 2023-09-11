import React, {useState, useEffect} from 'react';

function ModelsAdd () {
    const [name, setName] = useState('')
    const [pictureUrl, setPictureUrl] = useState('')
    const [manufacturer, setManufacturer] = useState('')
    const [manufacturers, setManufacturers] = useState([])

    const fetchManufacturersData = async () => {
        const url = 'http://localhost:8100/api/manufacturers/'
        const response = await fetch(url)

        if (response.ok) {
            const data = await response.json()
            setManufacturers(data.manufacturers)
        };
    };

    const handleNameChange = (event) => {
        const value = event.target.value
        setName(value)
    }

    const handlePictureUrlChange = (event) => {
        const value = event.target.value
        setPictureUrl(value)
    }

    const handleManufacturerChange = (event) => {
        const value = event.target.value
        setManufacturer(value)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.name = name
        data.picture_url = pictureUrl
        data.manufacturer_id = manufacturer
        const url = 'http://localhost:8100/api/models/'

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
            setPictureUrl('')
            setManufacturer('')
        };
    };

    useEffect(() => {
        fetchManufacturersData()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Create a model</h2>
                    <form onSubmit={handleSubmit} id="create-model-form">
                        <div className="form-floating mb-3">
                            <input value={name} onChange={handleNameChange} placeholder="Model name" required type="text" id="name" autoComplete="on" className="form-control" />
                            <label htmlFor="name">Model name...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={pictureUrl} onChange={handlePictureUrlChange} placeholder="Picture URL" required type="text" id="picture_url" autoComplete="on" className="form-control" />
                            <label htmlFor="picture_url">Picture URL...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <select value={manufacturer} onChange={handleManufacturerChange} required name="manufacturer_id" id="manufacturer_id" className="form-select" >
                                <option value="">Choose a manufacturer...</option>
                                {manufacturers.map(manufacturer => {
                                    return(
                                        <option key={manufacturer.id} value={manufacturer.id}>
                                            {manufacturer.name}
                                        </option>
                                    )
                                })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModelsAdd;
