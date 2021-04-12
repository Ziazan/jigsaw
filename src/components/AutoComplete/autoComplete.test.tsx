import React from 'react';
import { render, fireEvent, RenderResult, waitFor, cleanup } from '@testing-library/react';
import AutoComplete, { AutoCompleteProps, DataSourceType } from './autoComplete';
import Icon from './../Icon';

const onSelect = (item: string) => {
  console.log('item', item);
};

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
const renderOption = (item: DataSourceType) => {
  return (
    <>
      <span>名称：</span>
      {item.value}
    </>
  );
};
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

const renderGitHubUserOption = (item: DataSourceType) => {
  return <>{item.login}</>;
};
const AsyncAutoCompleteProps: AutoCompleteProps = {
  fetchSuggestions: handleFetch,
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
  renderOption: renderGitHubUserOption,
};
const testProps: AutoCompleteProps = {
  fetchSuggestions: fetchSuggestions,
  onSelect: jest.fn(),
  placeholder: 'auto-complete',
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe('test AutoComplete component', () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.queryByPlaceholderText('auto-complete') as HTMLInputElement;
  });
  it('基本的功能', async () => {
    fireEvent.change(inputNode, { target: { value: 'c' } });
    await waitFor(() => {
      expect(wrapper.queryByText('caruso')).toBeInTheDocument();
    });
    expect(wrapper.container.querySelectorAll('.auto-complete-item').length).toEqual(3);
    fireEvent.click(wrapper.getByText('caruso'));
    expect(testProps.onSelect).toHaveBeenCalledWith('caruso');
    expect(wrapper.queryByText('caruso')).not.toBeInTheDocument();
    expect(inputNode.value).toBe('caruso');
  });
  it('支持键盘事件', async () => {
    fireEvent.change(inputNode, { target: { value: 'c' } });
    await waitFor(() => {
      expect(wrapper.queryByText('caruso')).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText('caruso');
    const secondResult = wrapper.queryByText('cook');

    //移动光标
    fireEvent.keyDown(inputNode, { keyCode: 40 }); //下
    expect(firstResult).toHaveClass('is-highlighted');
    fireEvent.keyDown(inputNode, { keyCode: 40 }); //下
    expect(secondResult).toHaveClass('is-highlighted');

    //arrow up
    fireEvent.keyDown(inputNode, { keyCode: 38 }); //上
    expect(firstResult).toHaveClass('is-highlighted');

    //enter
    fireEvent.keyDown(inputNode, { keyCode: 13 });
    expect(testProps.onSelect).toHaveBeenCalledWith('caruso');
    expect(wrapper.queryByText('caruso')).not.toBeInTheDocument();
    expect(inputNode.value).toBe('caruso');
  });
  it('点击外部收起列表', async () => {
    fireEvent.change(inputNode, { target: { value: 'c' } });
    await waitFor(() => {
      expect(wrapper.queryByText('caruso')).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText('caruso')).not.toBeInTheDocument();
  });
  it('自定义渲染', async () => {
    cleanup();

    wrapper = render(<AutoComplete {...testProps} renderOption={renderOption} />);
    inputNode = wrapper.queryByPlaceholderText('auto-complete') as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: 'c' } });
    await waitFor(() => {
      expect(wrapper.queryByText('caruso')).toBeInTheDocument();
    });
    expect(wrapper.queryAllByText('名称：').length).toBeGreaterThanOrEqual(3);
  });
  it('异步拉取', async () => {
    cleanup();
    wrapper = render(<AutoComplete {...AsyncAutoCompleteProps} />);
    inputNode = wrapper.queryByPlaceholderText('auto-complete') as HTMLInputElement;
    fireEvent.change(inputNode, { target: { value: 'ziazan' } });
    //TODO:不会异步的代码测试
    // expect(AsyncAutoCompleteProps.fetchSuggestions).toBeCalled();
    // await waitFor(() => {
    //   expect(wrapper.queryAllByText('ziazan').length).toBeGreaterThan(1);
    // });
  });
});
