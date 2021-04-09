import React from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from './index';

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

export const Primary: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;

Primary.storyName = '按钮';

export const ButtonWithType: Story<ButtonProps> = (args) => (
  <>
    <Button btnType="default">Button</Button>
    <Button btnType="primary">Button</Button>
    <Button btnType="danger">Button</Button>
    <Button btnType="link" href="www.baidu.com">
      Button
    </Button>
  </>
);
ButtonWithType.storyName = '不同类型的按钮';

export const ButtonWithSize: Story<ButtonProps> = (args) => (
  <>
    <Button btnType="primary" size="lg">
      Larg Button
    </Button>
    <Button btnType="primary" size="sm">
      Small Button
    </Button>
  </>
);
ButtonWithSize.storyName = '不同大小的按钮';
