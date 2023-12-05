import React from 'react'
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import GerichtList from "./components/gerichtList.jsx";
import GerichtForm from "./components/gerichtForm.jsx";
import Navigation from "./components/Navigation.jsx";
import ExerciseForm from "./components/exerciseForm.jsx";
import WorkoutList from "./components/workoutsList.jsx";
import './index.css'



const App = () => {

  return (
    <div>
      
      <Router>
      <Navigation />
      <WorkoutList />
      <Routes>
        <Route exact path="/" element={<GerichtList />} />
        <Route path="/gerichtForm" element={<GerichtForm />} />
        <Route path="/exerciseForm" element={<ExerciseForm />} />
      </Routes>
      </Router>
    </div>
  );

};

export default App;
