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
          <Route path="technicians/">
            <Route index element={<ListTechnicians />} />
            <Route path="create" element={<CreateTechnician />} />
          </Route>
          <Route path="appointments/">
            <Route index element={<ListAppointments />} />
            <Route path="create" element={<CreateAppointment />} />
            <Route path="history" element={<ServiceHistory />} />
          </Route>
          <Route path="manufacturers/">
            <Route index element={<ManufacturerList />} />
            <Route path="create" element={<ManufacturersAdd />} />
          </Route>
          <Route path="models/">
            <Route index element={<ModelsList />} />
            <Route path="create"element={<ModelsAdd />} />
          </Route>
          <Route path="automobiles/">
            <Route index element={<AutomobilesList />} />
            <Route path="create"element={<AutomobilesAdd />} />
          </Route>
          <Route path="salespeople/">
            <Route index element={<SalesPeopleList />} />
            <Route path="create" element={<SalesPeopleAdd />} />
          </Route>
          <Route path="customers/">
            <Route index element={<CustomersList />} />
            <Route path="create" element={<CustomerAdd />} />
          </Route>
          <Route path="sales/">
            <Route index element={<SalesList />} />
            <Route path="create" element={<SalesAdd />} />
            <Route path="history" element={<SalesPeopleHistory />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
