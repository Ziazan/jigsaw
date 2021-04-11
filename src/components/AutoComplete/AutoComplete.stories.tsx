import React from 'react';
import { Story, Meta } from '@storybook/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';
import Icon from './../Icon';

export default {
  title: 'Components/AutoComplete',
  component: AutoComplete,
  parameters: {
    info: {
      inline: false, //是否在展示页面内显示
    },
  },
} as Meta;

const lakersWithNumber = [
  { value: 'bradley', number: 11 },
  { value: 'pope', number: 1 },
  { value: 'caruso', number: 4 },
  { value: 'cook', number: 2 },
  { value: 'cousins', number: 15 },
  { value: 'james', number: 23 },
  { value: 'AD', number: 3 },
  { value: 'green', number: 14 },
  { value: 'howard', number: 39 },
  { value: 'kuzma', number: 0 },
];

const fetchSuggestions = (keyword: string) => {
  return lakersWithNumber.filter((item) => item.value.includes(keyword));
};
const onSelect = (item: string) => {
  console.log('item', item);
};

const renderOption = (item: DataSourceType) => {
  return (
    <>
      <Icon icon="book" />
      {item.value}
    </>
  );
};
const DefaultAutonCompleteProps: AutoCompleteProps = {
  fetchSuggestions: fetchSuggestions,
  onSelect: onSelect,
};
export const Default: Story<AutoCompleteProps> = (args) => {
  return <AutoComplete {...DefaultAutonCompleteProps} />;
};

export const CustomAutoCompleteItem: Story<AutoCompleteProps> = (args) => {
  return <AutoComplete {...DefaultAutonCompleteProps} renderOption={renderOption} />;
};
