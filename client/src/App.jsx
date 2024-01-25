import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import GerichtList from "./components/gerichtList.jsx";
import GerichtForm from "./components/gerichtForm.jsx";
import Navigation from "./components/Navigation.jsx";
import WorkoutList from "./components/workoutsList.jsx";
import WorkoutDetail from "./components/workoutDetail.jsx";
import FAQ from "./components/FAQ.jsx";
import './index.css'



const App = () => {

  return (
    <div>
      
      <Router>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<GerichtList />} />
        <Route path="/gerichtForm" element={<GerichtForm />} />
        <Route path="/workoutList" element={<WorkoutList />} />
        <Route path="/workoutList/workoutDetail" element={<WorkoutDetail />} />
        <Route path="/FAQ" element={<FAQ />} />
      </Routes>
      </Router>
    </div>
  );

};

export default App;
