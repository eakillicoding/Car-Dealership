import React, {useEffect , useState} from 'react';

function AutomobilesAdd () {
    const [color, setColor] = useState('')
    const [year, setYear] = useState('')
    const [vin, setVIN] = useState('')
    const [model, setModel] = useState('')
    const [models, setModels] = useState([])

    const fetchModelsData = async () => {
        try {
            const response = await fetch('http://localhost:8100/api/models/')

            if (response.ok) {
                const data = await response.json()
                setModels(data.models)
            };

        } catch(e) {
            console.error(e)
        }
    };

    const handleColorChange = (event) => {
        const value = event.target.value
        setColor(value)
    };

    const handleYearChange = (event) => {
        const value = event.target.value
        setYear(value)
    };

    const handleVINChange = (event) => {
        const value = event.target.value
        setVIN(value)
    };

    const handleModelChange = (event) => {
            const value = event.target.value
            setModel(value)
        };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const data = {}
        data.color = color
        data.year = year
        data.vin = vin
        data.model_id = model
        const url =`http://localhost:8100/api/automobiles/`

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
                setColor('')
                setYear('')
                setVIN('')
                setModel('')
            };

        } catch(e) {
            console.error(e)
        }
    };

    useEffect(() => {
        fetchModelsData()
    }, []);

    return (
        <div className="row">
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h2>Add an automobile to inventory</h2>
                    <form onSubmit={handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3">
                            <input value={color} onChange={handleColorChange} placeholder="Color" required type="text" name="color" id="color" autoComplete="on" className="form-control" />
                            <label htmlFor="color">Color...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={year} onChange={handleYearChange} placeholder="Year" required type="text" name="year" id="year" autoComplete="on" className="form-control" />
                            <label htmlFor="year">Year...</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={vin} onChange={handleVINChange} placeholder="VIN" required type="text" name="vin" id="vin" autoComplete="on" className="form-control" />
                            <label htmlFor="vin">VIN...</label>
                        </div>
                        <div className="mb-3">
                            <select value={model} onChange={handleModelChange} required name="model_id" id="model_id" className="form-select" >
                                <option value="">Choose a model...</option>
                                {models.map(model => {
                                    return (
                                        <option key={model.id} value={model.id}>
                                            {model.name}
                                        </option>
                                    );
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

export default AutomobilesAdd;
