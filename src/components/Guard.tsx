import React from "react";
import { useQuickGuard } from "./QuickGuardProvider";

export interface GuardProps {
  /** สิทธิ์ที่อนุญาตให้เข้าถึงได้ เช่น ['admin', 'editor'] */
  allowedRoles: string[];
  /** สิทธิ์ของผู้ใช้ปัจจุบันที่ดึงมาจาก Auth ของแอป */
  userRole?: string;
  /** สิ่งที่จะแสดงถ้าผู้ใช้ไม่มีสิทธิ์ */
  fallback?: React.ReactNode;
  /** เนื้อหาภายในที่จะแสดงเมื่อมีสิทธิ์ */
  children: React.ReactNode;
}

export const Guard = ({
  allowedRoles,
  userRole: customRole,
  fallback,
  children,
}: GuardProps) => {
  const { userRole: providerRole } = useQuickGuard();

  // ใช้ customRole ถ้ามีการส่งมา ถ้าไม่มีให้ใช้จาก Provider
  const currentRole = customRole || providerRole;

  const hasAccess = currentRole ? allowedRoles.includes(currentRole) : false;

  return hasAccess ? <>{children}</> : <>{fallback || null}</>;
};
