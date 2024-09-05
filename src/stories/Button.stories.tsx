// stories/Button.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "../components/Button";

export default {
  title: "Button",
  component: Button,
  argTypes: {
    size: {
      control: {
        type: "radio",
        options: ["small", "medium", "large"],
      },
    },
    color: {
      control: {
        type: "radio",
        options: ["primary", "secondary"],
      },
    },
  },
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: "medium",
  color: "primary",
  children: "Click Me",
};

export const SmallPrimary = Template.bind({});
SmallPrimary.args = {
  size: "small",
  color: "primary",
  children: "Click Me",
};

export const LargeSecondary = Template.bind({});
LargeSecondary.args = {
  size: "large",
  color: "secondary",
  children: "Click Me",
};
