import { Button } from "@storybook-test/ui"; // ❌ MUI props missing
// import { Button } from "../components/Button"; // ✅ MUI props show up
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Example/Button",
  component: Button,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { label: "Button" },
};
