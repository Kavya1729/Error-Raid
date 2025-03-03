import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './pages/Login';
// import Signup from './pages/Signup';
import Auth from './pages/Auth';
import AISolution from './AiSolution';
import './App.css';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
        <Route
          path="/ai/get-solution"
          element={isAuthenticated ? <AISolution /> : <Navigate to="/auth" />}
        />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/ai/get-solution" />
            ) : (
              <Navigate to="/auth" />
            )
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
};

export default App;