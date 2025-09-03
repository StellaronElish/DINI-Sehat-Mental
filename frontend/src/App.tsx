import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RespondentForm from "./pages/RespondentForm";
import Questionnaire from "./pages/Questionnaire";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResultRoute from "./routes/ResultsRoutes";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RespondentRoute from "./routes/RespondentRoute";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        {/* hanya bisa diakses kalau belum login dokter */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <LandingPage />
            </PublicRoute>
          }
        />

        {/* form responden selalu bisa diakses */}
        <Route path="/form" element={<RespondentForm />} />

        {/* questionnaire hanya bisa diakses kalau sudah isi form */}
        <Route
          path="/questionnaire"
          element={
            <RespondentRoute>
              <Questionnaire />
            </RespondentRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ResultRoute>
              <Results />
            </ResultRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* dashboard dokter → harus login */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
