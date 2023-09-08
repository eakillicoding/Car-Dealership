import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import Nav from './Nav';
import SalesPeopleList from './SalesPeopleList';
import SalesPeopleAdd from './SalesPeopleAdd';
import CustomersList from './CustomersList';
import CustomerAdd from './CustomerAdd';
import SalesList from './SalesList';
import SalesAdd from './SalesAdd';
import SalesPeopleHistory from './SalesPeopleHistory';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
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
