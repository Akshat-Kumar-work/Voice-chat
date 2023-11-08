import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navigation from './components/shared/Navigation';

import Authenticate from "./pages/Authenticate"
import OpenRoute from './components/Routes/OpenRoute';
import SemiProtectedRoute from './components/Routes/SemiProtectedRoute';
import Activate from './pages/Activate';

function App() {
  return (

    <div >

    <Navigation/>

    <Routes>

    {/* open route */}
    <Route path="/" element={<OpenRoute> <Home/> </OpenRoute>} />
    <Route path='/authenticate' element={<OpenRoute> <Authenticate/> </OpenRoute>} />

    {/* semi protected route */}
    <Route path="/activate" element={<SemiProtectedRoute> <Activate/> </SemiProtectedRoute>} />

    {/* protected */}
    


   </Routes>

    </div>
  
   
  );
}

export default App;
