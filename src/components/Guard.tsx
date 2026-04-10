import React from "react";
import { useQuickGuard } from "./QuickGuardProvider";

export interface GuardProps {
  /** Allowed roles for access, e.g., ['admin', 'editor'] */
  allowedRoles: string[];
  /** The current user's role retrieved from the app's Auth */
  userRole?: string;
  /** Content to display if the user lacks access */
  fallback?: React.ReactNode;
  /** Internal content to display when access is granted */
  children: React.ReactNode;
}

export const Guard = ({
  allowedRoles,
  userRole: customRole,
  fallback,
  children,
}: GuardProps) => {
  const { userRole: providerRole } = useQuickGuard();

  // Use customRole if provided; otherwise, fallback to the Provider's role
  const currentRole = customRole || providerRole;

  const hasAccess = currentRole ? allowedRoles.includes(currentRole) : false;

  return hasAccess ? <>{children}</> : <>{fallback || null}</>;
};
