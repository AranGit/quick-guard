import { createContext, ReactNode, useContext } from "react";

interface AuthContextType {
  userRole: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const QuickGuardProvider = ({
  userRole,
  children,
}: {
  userRole: string | null;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ userRole }}>{children}</AuthContext.Provider>
  );
};

// สร้าง Hook ภายในเพื่อดึงค่า Context
export const useQuickGuard = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useQuickGuard must be used within a QuickGuardProvider");
  }
  return context;
};
