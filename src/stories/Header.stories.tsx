// stories/Button.stories.tsx
import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Header } from "../components/Header";

export default {
  title: "Header",
  component: Header,
} as Meta;

const Template: StoryFn = () => <Header/>;

export const Default = Template.bind({});