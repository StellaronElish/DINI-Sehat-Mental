// src/routes/ResultRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function ResultRoute({ children }: Props) {
  // cek apakah ada hasil dari questionnaire
  const resultRaw = localStorage.getItem("respondent_id");

  if (!resultRaw) {
    return <Navigate to="/questionnaire" replace />;
  }

  return <>{children}</>;
}
