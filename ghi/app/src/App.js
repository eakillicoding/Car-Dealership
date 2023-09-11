import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateTechnician from './TechnicianCreate';
import ListTechnicians from './TechnicianList';
import CreateAppointment from './AppointmentCreate';
import ListAppointments from './AppointmentList';
import ServiceHistory from './AppointmentHistory';
import SalesPeopleList from './SalesPeopleList';
import SalesPeopleAdd from './SalesPeopleAdd';
import CustomersList from './CustomersList';
import CustomerAdd from './CustomerAdd';
import SalesList from './SalesList';
import SalesAdd from './SalesAdd';
import SalesPeopleHistory from './SalesPeopleHistory';
import ManufacturerList from './ManufacturerList';
import ManufacturersAdd from './ManufacturersAdd';
import ModelsList from './ModelsList';
import ModelsAdd from './ModelsAdd';
import AutomobilesList from './AutomobilesList';
import AutomobilesAdd from './AutomobilesAdd';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/technicians" element={<ListTechnicians />} />
          <Route path="/technicians/create" element={<CreateTechnician />} />
          <Route path="/appointments" element={<ListAppointments />} />
          <Route path="/appointments/create" element={<CreateAppointment />} />
          <Route path="/appointments/history" element={<ServiceHistory />} />
          <Route path="manufacturers/">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturersAdd />} />
          </Route>
          <Route path="models/">
            <Route index element={<ModelsList />} />
            <Route path="new"element={<ModelsAdd />} />
          </Route>
          <Route path="automobiles/">
            <Route index element={<AutomobilesList />} />
            <Route path="new"element={<AutomobilesAdd />} />
          </Route>
          <Route path="salespeople/">
            <Route index element={<SalesPeopleList />} />
            <Route path="new" element={<SalesPeopleAdd />} />
          </Route>
          <Route path="customers/">
            <Route index element={<CustomersList />} />
            <Route path="new" element={<CustomerAdd />} />
          </Route>
          <Route path="sales/">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SalesAdd />} />
            <Route path="history" element={<SalesPeopleHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
