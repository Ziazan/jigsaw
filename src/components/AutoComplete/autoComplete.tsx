import React, { FC, InputHTMLAttributes, ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from './../Icon';

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (keyword: string) => string[];
  onSelect?: (item: string) => void;
}
//可以优化的点
//可以自定义option的样式
//支持键盘上下移动选中
//debource 防抖
//点击外部收起菜单

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, className, ...restProps } = props;
  const classes = classNames('jigsaw-auto-complete', className, {});
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [active, setActive] = useState(-1);

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
    setActive(item.index);
    if (onSelect) {
      const _onSelect = onSelect as (item: string) => void;
      _onSelect(item.data as string);
    }
  };

  const liClasses = (index: number) => {
    return classNames('auto-complete-item', {
      'is-active': active === index,
    });
  };

  return (
    <div className={classes}>
      <Input placeholder="请输入关键词" value={inputValue} onChange={handleChange} {...restProps} />
      {suggestions.length > 0 && (
        <ul className="jigsaw-auto-complete-list">
          {suggestions.map((_str, index) => {
            return (
              <li
                className={liClasses(index)}
                key={index}
                onClick={(e) => {
                  handleItemClick({ data: _str, index });
                }}
              >
                {_str}
                {active === index && <Icon className="item-icon" icon="check" />}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
