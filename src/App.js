import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navigation from './components/shared/Navigation';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (

    <div >

    <Navigation/>

    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/register' element={<Register/>}/>
    <Route path='/login' element={<Login/>} />
   </Routes>

    </div>
  
   
  );
}

export default App;
