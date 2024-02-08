import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home"
import Pharmacy from "./pages/Pharmacy/Pharmacy"
import MedicineDetails from './pages/MedicineDetails/MedicineDetails';
import MedicineOrder from "./pages/MedicineOrder/MedicineOrder"
import Profile from "./pages/Profile/Profile"
import Sidebar from "./components/Sidebar/Sidebar"
import Login from './components/Login/Login';
import BookedCare from './pages/BookedCare/BookedCare';
import CareCentre from './pages/CareCentre/CareCentre';
import Services from './pages/Services/Services';
function App() {  
  return (
    <BrowserRouter >  
        <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/login" exact component={<Login />} />
        <Route path="/pageprofile/:userId" element={<Profile />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/pharmacies" element={<Pharmacy />} />
        <Route path="/pharmacies/:pharmacyName" element={<MedicineDetails />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/carecentres" element={<CareCentre />} />
        <Route path="/carecentres/:CareName" element={<Services />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/bookedservices" element={<BookedCare />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/pageorder/:userId" element={<MedicineOrder />} ><Route index element={<Sidebar />} /></Route>
          
          {/*<Route
          path="/pageprofile"
          render={({ location }) => {
            if (location.pathname.startsWith('/page')) {
              return <Sidebar />;
            }
            return null;
          }}
        />*/}
        </Routes>       
         
    </BrowserRouter>
  );
}

export default App;