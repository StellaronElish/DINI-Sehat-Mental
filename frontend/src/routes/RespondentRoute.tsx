// src/routes/RespondentRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function RespondentRoute({ children }: Props) {
  const respondentRaw = localStorage.getItem("respondent");

  if (!respondentRaw) {
    return <Navigate to="/form" replace />;
  }

  try {
    const respondent = JSON.parse(respondentRaw);

    // cek apakah semua field terisi
    if (!respondent.name || !respondent.age || !respondent.status) {
      return <Navigate to="/form" replace />;
    }
  } catch (err) {
    // kalau parsing JSON gagal
    return <Navigate to="/form" replace />;
  }

  return <>{children}</>;
}
