// stories/Button.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Button, ButtonProps } from "../components/ui/button";

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
  bgColor: "main",
  children: "로그인하기",
};