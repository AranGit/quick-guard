import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Guard } from "./Guard";
import { QuickGuardProvider, useQuickGuard } from "./QuickGuardProvider";

// Create a mock Component to test the Hook
const TestComponent = () => {
  const { userRole } = useQuickGuard();
  return <div data-testid="role-display">{userRole}</div>;
};

describe("QuickGuard System", () => {
  // Case 1: Used correctly via Provider
  test("should correctly retrieve userRole when wrapped in QuickGuardProvider", () => {
    render(
      <QuickGuardProvider userRole="admin">
        <TestComponent />
      </QuickGuardProvider>,
    );

    expect(screen.getByTestId("role-display").textContent).toBe("admin");
  });

  // Case 2: Desired case (forgot to include Provider)
  test("should throw an Error when useQuickGuard is used without a wrapping Provider", () => {
    // Temporarily hide console.error to keep the console clean during an expected failure
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow("useQuickGuard must be used within a QuickGuardProvider");

    consoleSpy.mockRestore();
  });

  // Case 3: Test Guard Component alongside Provider
  test("Guard should render content when the Role in the Provider matches allowed roles", () => {
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
