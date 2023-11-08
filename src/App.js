import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navigation from './components/shared/Navigation';
import Register from './pages/Register';
import Login from './pages/Login';
import Authenticate from "./pages/Authenticate"
import OpenRoute from './components/Routes/OpenRoute';

function App() {
  return (

    <div >

    <Navigation/>

    <Routes>
    <Route path="/" element={<OpenRoute> <Home/> </OpenRoute>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>} />
    <Route path='/authenticate' element={<OpenRoute> <Authenticate/> </OpenRoute>} />

    
   </Routes>

    </div>
  
   
  );
}

export default App;
