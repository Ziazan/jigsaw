import React from 'react';
import { Meta, Story } from '@storybook/react';
import TransMenu from './index';
import { MenuProps } from './menu';

export default {
  title: 'Components/TransMenu',
  component: TransMenu,
  argTypes: {
    defaultIndex: { type: 'string' },
    className: { type: 'string' },
    mode: {
      control: {
        type: 'radio',
        options: ['horizontal', 'vertical'],
      },
    },
    defaultOpenSubMenus: {
      type: 'object',
    },
  },
} as Meta;

const Template: Story<MenuProps> = (args) => (
  <TransMenu {...args}>
    <TransMenu.Item>link1</TransMenu.Item>
    <TransMenu.Item>link2</TransMenu.Item>
    <TransMenu.SubMenu title="dropdown">
      <TransMenu.Item>link-a</TransMenu.Item>
      <TransMenu.Item>link-b</TransMenu.Item>
    </TransMenu.SubMenu>
  </TransMenu>
);
export const Menu = Template.bind({});
