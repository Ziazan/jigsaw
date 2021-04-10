import React from 'react';
import { Meta, Story } from '@storybook/react';
import Input, { InputProps } from './input';
export default {
  title: 'Components/Input',
  component: Input,
} as Meta;

export const Default: Story<InputProps> = (args) => <Input {...args} />;
Default.parameters = {
  info: {
    inline: false, //是否在展示页面内显示
  },
};

export const InputWithSize: Story<InputProps> = (args) => (
  <>
    <Input placeholder="默认表单" />
    <Input size="lg" placeholder="超大表单" />
    <Input size="sm" placeholder="小表单" />
  </>
);

export const DisabledInput: Story<InputProps> = (args) => (
  <>
    <Input disabled={true} placeholder="禁用表单" />
  </>
);

export const InputWithIcon: Story<InputProps> = (args) => (
  <>
    <Input placeholder="带图标的表单" icon="calendar" />
  </>
);

export const InputWithAppend: Story<InputProps> = (args) => (
  <>
    <Input prepend="https://" placeholder="前缀" />
    <Input append=".com" placeholder="后缀" />
    <Input prepend="https://" append=".com" placeholder="前后缀" />
  </>
);
