import React, { CSSProperties } from 'react';
import { Meta, Story } from '@storybook/react';
import Button, { ButtonProps } from './index';

const styles: CSSProperties = {
  textAlign: 'center',
  margin: '3em',
};
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
} as Meta;

export const Primary: Story<ButtonProps> = (args) => <Button {...args}>Button</Button>;
Primary.parameters = {
  info: {
    inline: false, //是否在展示页面内显示
  },
};

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
