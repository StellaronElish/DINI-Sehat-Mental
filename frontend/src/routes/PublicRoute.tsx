import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function PublicRoute({ children }: Props) {
  const token = localStorage.getItem("doctor_token");

  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
