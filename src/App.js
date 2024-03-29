import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./pages/Home"
import Navigation from './components/shared/Navigation';

import Authenticate from "./pages/Authenticate"
import OpenRoute from './components/Routes/OpenRoute';
import SemiProtectedRoute from './components/Routes/SemiProtectedRoute';
import Activate from './pages/Activate';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Rooms from './pages/Rooms';
import { useLoadingWithRefresh } from './hooks/userLoadingWithRefresh';
import CreatedRoom from './pages/CreatedRoom';



function App() {

const {loading} =  useLoadingWithRefresh();

  return loading ? "loading....." :  (

    <div className='min-h-screen w-screen' >

    <Navigation/>

    <Routes>

    {/* open route */}
    <Route path="/" element={<OpenRoute> <Home/> </OpenRoute>} />
    <Route path='/authenticate' element={<OpenRoute> <Authenticate/> </OpenRoute>} />

    {/* semi protected route */}
    <Route path="/activate" element={<SemiProtectedRoute> <Activate/> </SemiProtectedRoute>} />

    {/* protected */}
    <Route path="/rooms" element={<ProtectedRoute> <Rooms/> </ProtectedRoute>} />
    <Route path="/room/:id" element={<ProtectedRoute> <CreatedRoom/> </ProtectedRoute>} />

    


   </Routes>

    </div>
  
   
  );
}

export default App;
