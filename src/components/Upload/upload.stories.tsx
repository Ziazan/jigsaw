import React, { ChangeEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import Upload, { UploadProps } from './upload';

export default {
  title: 'Components/Upload',
  component: Upload,
  parameters: { actions: { argTypesRegex: '^on.*' } },
} as Meta;

export const Default: Story<UploadProps> = (args) => {
  return <Upload {...args} />;
};
Default.args = {
  action: 'https://jsonplaceholder.typicode.com/users/1/posts',
};
Default.parameters = {
  info: {
    inline: false, //是否在展示页面内显示
  },
};
