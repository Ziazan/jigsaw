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
Primary.storyName = '按钮';
Primary.parameters = {
  info: {
    text: `
      # 这是一个按钮组件
      addon-info 支持markdown语法
      ~~~js
      const onClick = ()=>{}
      ~~~`,
    inline: true, //是否在展示页面内显示
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
