import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
// import Register from './pages/Register/Register';
// import Login from './pages/Login/Login';
import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";

const isAuth = false;
const user={
  activated:false,
}
function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<GuestRoute><Home /></GuestRoute>} />

        <Route path='/authenticate' element={<GuestRoute><Authenticate/></GuestRoute>}/>
        <Route path='/activate' element={<SemiProtectedRoute><Activate/></SemiProtectedRoute>}/>
        <Route path='/rooms' element={<ProtectedRoute><Rooms/></ProtectedRoute>}/>
       {/* <SemiProtectedRoute path="/activate" element={<Activate/>}></SemiProtectedRoute>
        */}
      </Routes>
    </BrowserRouter>
  );
}
const GuestRoute = ({ children }) => {
  return isAuth ? <Navigate to="/rooms" /> : children;
};
const SemiProtectedRoute = ({ children }) => {
  return !isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? children : <Navigate to="/rooms" />
};
const ProtectedRoute = ({ children }) => {
  return !isAuth ? <Navigate to="/" /> : isAuth && !user.activated ? <Navigate to="/activate"/> : children 
};


export default App;
