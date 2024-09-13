import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import { FlexBox } from "../styles/FlexBox";
export default {
  title: "FlexBox",
  component: FlexBox,
  argTypes: {
    direction: {
        options: ['column', 'row'],
        control: { type: 'radio' },
      },
    isResponsive: {
      control: 'boolean',
    },
    gap: {
      control: 'text',
    },
  },
} as Meta;

const Template: StoryFn<{
    direction: "column" | "row";
    isResponsive?: boolean;
    gap: string;
}> = (args) => (
  <FlexBox {...args} style={{ border: '1px solid #ddd', padding: '1rem' }}>
    <div style={{ width: "10px", height: "10px", backgroundColor: "red" }}>a</div>
    <div style={{ width: "10px", height: "10px", backgroundColor: "blue" }}>b</div>
    <div style={{ width: "10px", height: "10px", backgroundColor: "green" }}>c</div>
  </FlexBox>
);

export const Flex = Template.bind({});
Flex.args = {
    direction: "column",
    isResponsive: false,
    gap: "26px",
};
