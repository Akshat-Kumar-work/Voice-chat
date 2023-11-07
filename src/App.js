import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Navigation from './components/shared/Navigation';

function App() {
  return (

    <div >

    <Navigation/>

    <Routes>
    <Route path="/" element={<Home/>} />
   </Routes>

    </div>
  
   
  );
}

export default App;
