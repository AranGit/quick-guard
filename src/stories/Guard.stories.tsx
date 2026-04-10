import type { Meta, StoryObj } from "@storybook/react";
import { Guard } from "../components/Guard";
import { QuickGuardProvider } from "../components/QuickGuardProvider";

const meta: Meta<typeof Guard> = {
  title: "Security/GuardWithProvider",
  component: Guard,
  // Use a Decorator to wrap every Story in this file with the Provider
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
    children: <div>Accessible because the Provider role is admin</div>,
  },
};
