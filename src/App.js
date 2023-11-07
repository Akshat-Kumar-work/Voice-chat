import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navigation from './components/shared/Navigation';
import Register from './pages/Register';

function App() {
  return (

    <div >

    <Navigation/>

    <Routes>
    <Route path="/" element={<Home/>} />
    <Route path='/register' element={<Register/>}/>
   </Routes>

    </div>
  
   
  );
}

export default App;
