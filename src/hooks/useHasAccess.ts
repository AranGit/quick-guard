import { useQuickGuard } from "../components/QuickGuardProvider";

export const useHasAccess = (allowedRoles: string[]) => {
  const { userRole } = useQuickGuard();

  if (!userRole) return false;
  return allowedRoles.includes(userRole);
};
