import React, { PureComponent } from 'react';
import { Story, Meta } from '@storybook/react';
import AutoComplete, { AutoCompleteProps } from './autoComplete';
export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    info: {
      inline: false, //是否在展示页面内显示
    },
  },
} as Meta;

const fetchSuggestions = (keyword: string) => {
  return [1, 2, 3, 4, 5].map((item) => {
    return `${keyword}-${item}`;
  });
};
const onSelect = (item: string) => {
  console.log('item', item);
};
const DefaultAutonCompleteProps: AutoCompleteProps = {
  fetchSuggestions: fetchSuggestions,
  onSelect: onSelect,
};
export const Default: Story<AutoCompleteProps> = (args) => {
  return <AutoComplete {...DefaultAutonCompleteProps} />;
};
