import React, { ChangeEvent } from 'react';
import { Meta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Upload, { UploadProps } from './upload';

const filePromise = (file: File) => {
  //修改文件名称
  const newFile = new File([file], 'new_name.docx', { type: file.type });
  return Promise.resolve(newFile);
};

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
  onChange: () => {
    action('change');
  },
  beforeUpload: (file: File) => {
    // if (Math.round(file.size / 1024) > 50) {
    //   alert('file too big');
    //   return false;
    // }
    // return true;
    return filePromise(file);
  },
};
Default.parameters = {
  info: {
    inline: false, //是否在展示页面内显示
  },
};
