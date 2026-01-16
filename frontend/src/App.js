import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './components/Dashboard';
import Intro from './pages/Intro';
import ProtectedRoute from './pages/ProtectedRoute';
import { useEffect } from 'react';
import { getBackendStatus } from './services/api';
import ProfilePage from './pages/ProfilePage';
import Water from './pages/Water';
import Calorie from './pages/Calorie';
import Bmi from './pages/Bmi';
import Sleep from './pages/Sleep';

function App() {
  useEffect(() => {
    getBackendStatus().then(res => console.log(res.data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Intro/>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route exact path="/dashboard/calories" element={<ProtectedRoute><Calorie/></ProtectedRoute>} />
        <Route exact path="/dashboard/water" element={<ProtectedRoute><Water/></ProtectedRoute>} />
        <Route exact path="/dashboard/bmi" element={<ProtectedRoute><Bmi/></ProtectedRoute>} />
        <Route exact path="/dashboard/sleep" element={<ProtectedRoute><Sleep /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
