import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps, ButtonSize } from './index';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    backgrounds: {
      values: [
        { name: 'red', value: '#f00' },
        { name: 'green', value: '#0f0' },
        { name: 'blue', value: '#00f' },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ margin: '3em' }}>
        <Story />
      </div>
    ),
  ],
} as Meta;

// const Template: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;
export const Primary: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

Primary.storyName = '按钮';
