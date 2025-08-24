import { Routes, Route, Link } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RespondentForm from "./pages/RespondentForm";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/form" element={<RespondentForm />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
