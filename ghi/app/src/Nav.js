import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 text-nowrap flex-wrap">
            <li className="nav-item">
              <NavLink className="nav-link active" to="/manufacturers">
                Manufacturers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/manufacturers/create">
                Create a Manufacturer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/models">
                Models
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/models/create">
                Create a Model
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/automobiles">
                Automobiles
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/automobiles/create">
                Create an Automobile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/salespeople">
                Salespeople
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/salespeople/create">
                Add a Salesperson
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/customers">
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/customers/create">
                Add a Customer
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/sales">
                Sales
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/sales/create">
                Add a Sale
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/sales/history">
                Sales History
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/technicians">Technicians</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/technicians/create">Add a Technician</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/appointments">Service Appointments</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/appointments/create">Create a Service Appointment</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link active" to="/appointments/history">Service History</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
