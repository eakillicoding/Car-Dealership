import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import CreateTechnician from './TechnicianCreate';
import ListTechnicians from './TechnicianList';
import CreateAppointment from './AppointmentCreate';
import ListAppointments from './AppointmentList';

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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
