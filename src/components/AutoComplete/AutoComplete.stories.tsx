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

interface LakerProps {
  number: number;
}

interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
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

const handleFetch = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then((res) => res.json())
    .then(({ items }) => {
      return items.slice(0, 10).map((item: any) => ({ value: item.login, ...item }));
    });
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
const renderGitHubUserOption = (item: DataSourceType) => {
  return (
    <>
      <Icon icon="user" />
      {item.login}:{item.url}
    </>
  );
};
const DefaultAutoCompleteProps: AutoCompleteProps = {
  fetchSuggestions: fetchSuggestions,
  onSelect: onSelect,
};

const AsyncAutoCompleteProps: AutoCompleteProps = {
  fetchSuggestions: handleFetch,
  onSelect: onSelect,
};
export const Default: Story<AutoCompleteProps> = (args) => {
  return <AutoComplete {...DefaultAutoCompleteProps} />;
};

export const CustomAutoCompleteItem: Story<AutoCompleteProps> = (args) => {
  return <AutoComplete {...DefaultAutoCompleteProps} renderOption={renderOption} />;
};

export const AsyncData: Story<AutoCompleteProps> = (args) => {
  return (
    <AutoComplete placeholder="输入github账号" {...AsyncAutoCompleteProps} renderOption={renderGitHubUserOption} />
  );
};
