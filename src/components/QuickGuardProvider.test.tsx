import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Guard } from "./Guard";
import { QuickGuardProvider, useQuickGuard } from "./QuickGuardProvider";

// สร้าง Component สมมติเพื่อใช้ทดสอบ Hook
const TestComponent = () => {
  const { userRole } = useQuickGuard();
  return <div data-testid="role-display">{userRole}</div>;
};

describe("QuickGuard System", () => {
  // เคสที่ 1: ใช้งานถูกต้องผ่าน Provider
  test("ควรดึงค่า userRole ได้ถูกต้องเมื่ออยู่ภายใต้ QuickGuardProvider", () => {
    render(
      <QuickGuardProvider userRole="admin">
        <TestComponent />
      </QuickGuardProvider>,
    );

    expect(screen.getByTestId("role-display").textContent).toBe("admin");
  });

  // เคสที่ 2: เคสที่คุณต้องการ (ลืมใส่ Provider)
  test("ควรโยน Error ออกมาเมื่อใช้งาน useQuickGuard โดยไม่มี Provider หุ้มอยู่", () => {
    // ซ่อน console.error ชั่วคราวไม่ให้รกหน้าจอขณะรันเทสต์ที่ตั้งใจให้พัง
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useQuickGuard must be used within a QuickGuardProvider");

    consoleSpy.mockRestore();
  });

  // เคสที่ 3: ทดสอบ Guard Component ร่วมกับ Provider
  test("Guard ควรแสดงเนื้อหาเมื่อ Role ใน Provider ตรงกับที่อนุญาต", () => {
    render(
      <QuickGuardProvider userRole="editor">
        <Guard allowedRoles={["editor", "admin"]}>
          <div data-testid="secret-content">Secret Area</div>
        </Guard>
      </QuickGuardProvider>,
    );

    expect(screen.getByTestId("secret-content")).toBeInTheDocument();
  });
});
