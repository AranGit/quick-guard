import type { Meta, StoryObj } from "@storybook/react";
import { Guard } from "../components/Guard";
import { QuickGuardProvider } from "../components/QuickGuardProvider";

const meta: Meta<typeof Guard> = {
  title: "Security/GuardWithProvider",
  component: Guard,
  // ใช้ Decorator เพื่อหุ้ม Provider ให้กับทุก Story ในไฟล์นี้
  decorators: [
    (Story) => (
      <QuickGuardProvider userRole="admin">
        <Story />
      </QuickGuardProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Guard>;

export const UsingProvider: Story = {
  args: {
    allowedRoles: ["admin"],
    children: <div>เข้าถึงได้เพราะ Provider บอกว่าเป็น admin</div>,
  },
};
