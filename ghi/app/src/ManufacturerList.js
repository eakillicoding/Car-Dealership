import React, {useState , useEffect} from 'react';

function ManufacturerList() {
    const [manufacturers, setManufacturers] = useState([])

    async function fetchManufacturersData() {
        try {
            const response = await fetch("http://localhost:8100/api/manufacturers/")

            if (response.ok) {
                const data = await response.json()
                setManufacturers(data.manufacturers)
            }

        } catch(e) {
            console.error(e)
        }
    };

    useEffect(() => {
        fetchManufacturersData()
    }, []);

    return (
        <div>
            <h2>Manufacturers</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {manufacturers.map(manufacturer => {
                        return (
                            <tr key={manufacturer.id}>
                                <td>{manufacturer.name}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default ManufacturerList;
