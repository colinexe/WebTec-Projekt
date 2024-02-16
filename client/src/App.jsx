import React from 'react'
import { Route, Routes, BrowserRouter as Router, Navigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import GerichtForm from "./components/gerichtForm.jsx";
import Navigation from "./components/Navigation.jsx";
import WorkoutList from "./components/workoutsList.jsx";
import WorkoutDetail from "./components/workoutDetail.jsx";
import FAQ from "./components/FAQ.jsx";
import HomeScreen from "./components/HomeScreen.jsx"
import Impressum from './components/Impressum.jsx';
import './index.css'
import { AuthProvider } from './components/authContext.jsx';
import ProtectedWrapper from './components/protectedRoute.jsx';



const App = () => {

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<ProtectedWrapper authElement={<Navigate to="/Home"></Navigate>} altElement={<Login />} />} />

            <Route path="/Home" element={<ProtectedWrapper authElement={<HomeScreen />} altElement={<Navigate to="/" replace></Navigate>} />} />
            <Route path="/Impressum" element={<ProtectedWrapper authElement={<Impressum />} altElement={<Navigate to="/" replace></Navigate>} />} />
            <Route path="/gerichtForm" element={<ProtectedWrapper authElement={<GerichtForm />} altElement={<Navigate to="/" replace></Navigate>} />} />
            <Route path="/workoutList" element={<ProtectedWrapper authElement={<WorkoutList />} altElement={<Navigate to="/" replace></Navigate>} />} />
            <Route path="/workoutList/workoutDetail" element={<ProtectedWrapper authElement={<WorkoutDetail />} altElement={<Navigate to="/" replace></Navigate>} />} />
            <Route path="/FAQ" element={<ProtectedWrapper authElement={<FAQ />} altElement={<Navigate to="/" replace></Navigate>} />} />

          </Routes>

        </Router>
      </AuthProvider>
    </>
  );

};

export default App;
