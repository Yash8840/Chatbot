import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/login'
import Register from "./pages/Register";
// import './style.scss'
import { useContext } from "react";
import AuthContext from "./Context/AuthContext";

function App() {
  
  const authCtx = useContext(AuthContext);
  
  //the below function changes the current route if user is logged in and prevents routing to login page if user refreshes the page.
  const ProtectedRoute = ({children})=>{
    if(!authCtx.currentUser){
      return <Navigate to='/login'/> // changes the current location when it is rendered
    }
    return children;
  }
  return (
   <BrowserRouter>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path="login" element = {<Login/>} />
      <Route path="register" element={<Register/>}/>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
