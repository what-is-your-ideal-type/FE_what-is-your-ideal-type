import React from "react";
import { Meta, StoryFn } from "@storybook/react/*";
import Input, { InputProps } from "../components/ui/Input";

export default {
  title: "Input",
  component: Input,
} as Meta;

const Template: StoryFn<InputProps> = (args) => <Input {...args} />;

export const Email = Template.bind({});
Email.args = {
  type: "email",
  placeholder: "이메일을 입력하세요",
};

export const Password = Template.bind({});
Password.args = {
  type: "password",
  placeholder: "비밀번호를 입력하세요",
};
