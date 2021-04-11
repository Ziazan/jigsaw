import React, { FC, ChangeEvent, useState, ReactElement } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from './../Icon';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => string[];
  onSelect?: (item: string) => void;
  renderOption?: (item: string) => ReactElement;
}
//可以优化的点
//可以自定义option的样式
//支持键盘上下移动选中
//debource 防抖
//点击外部收起菜单

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, className, renderOption, ...restProps } = props;

  const classes = classNames('jigsaw-auto-complete', className, {});

  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  /**
   * 输入值改变
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    if (value) {
      const results = fetchSuggestions(value);
      setSuggestions(results);
    } else {
      setSuggestions([]);
    }
  };

  const handleItemClick = (item: { data?: string; index: number }) => {
    setInputValue(item.data);
    setSuggestions([]);
    if (onSelect) {
      const _onSelect = onSelect as (item: string) => void;
      _onSelect(item.data as string);
    }
  };
  /** 渲染自定义的模板 */
  const renderTemplate = (item: string) => {
    return renderOption ? renderOption(item) : item;
  };
  const generateDropDown = () => {
    return (
      <ul className="jigsaw-auto-complete-list">
        {suggestions.map((item, index) => {
          return (
            <li
              className="auto-complete-item"
              key={index}
              onClick={(e) => {
                handleItemClick({ data: item, index });
              }}
            >
              {renderTemplate(item)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className={classes}>
      <Input placeholder="请输入关键词" value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
