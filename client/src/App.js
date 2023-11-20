import './App.css';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from "./pages/Home/Home"
import Pharmacy from "./pages/Pharmacy/Pharmacy"
import MedicineDetails from './pages/MedicineDetails/MedicineDetails';
import Services from "./pages/Services/Services"
import MedicineOrder from "./pages/MedicineOrder/MedicineOrder"
import Profile from "./pages/Profile/Profile"
import Sidebar from "./components/Sidebar/Sidebar"
import Login from './components/Login/Login';
import BookedCare from './pages/BookedCare/BookedCare';
function App() {  
  return (
    <BrowserRouter>  
        <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/login" exact component={<Login />} />
        <Route path="/pageprofile/:userId" element={<Profile />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/pharmacies" element={<Pharmacy />} />
        <Route path="/:pharmacyName" element={<MedicineDetails />} ><Route index element={<Sidebar />} /></Route>
        <Route path="/pageservices" element={<Services />} />
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