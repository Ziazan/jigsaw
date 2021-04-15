import React, { ChangeEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload, { UploadProps } from './upload';

export default {
  title: 'Components/Upload',
  component: Upload,
} as Meta;

export const Default: Story<UploadProps> = (args) => {
  return <Upload {...args} />;
};
Default.args = {
  action: 'https://jsonplaceholder.typicode.com/users/1/posts',
  onProgress: () => {
    action('progress');
  },
  onSuccess: () => {
    action('onSuccess');
  },
  onError: () => {
    action('onError');
  },
};
Default.parameters = {
  info: {
    inline: false, //是否在展示页面内显示
  },
};
