import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Button, { ButtonProps } from "../components/Button";
import {
  mainButtonArgs,
  authButtonArgs,
  kakaoButtonArgs,
  naverButtonArgs,
  googleButtonArgs,
} from "../components/ButtonArgs";

export default {
  title: "Button",
  component: Button,
} as Meta;

const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;

export const Main = Template.bind({});
Main.args = {
  ...mainButtonArgs,
};

export const Auth = Template.bind({});
Auth.args = {
  ...authButtonArgs,
};

export const Kakao = Template.bind({});
Kakao.args = {
  ...kakaoButtonArgs,
};

export const Naver = Template.bind({});
Naver.args = {
  ...naverButtonArgs,
};

export const Google = Template.bind({});
Google.args = {
  ...googleButtonArgs,
};
