import React, { FC, ChangeEvent, useState, ReactElement } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = Record<string, any>> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 建议回调 */
  fetchSuggestions: (keyword: string) => DataSourceType[];
  /** 选中回调 */
  onSelect?: (item: string) => void;
  /** 自定义渲染item */
  renderOption?: (item: DataSourceType) => ReactElement;
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
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);

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

  const handleItemClick = (item: { data?: DataSourceType; index: number }) => {
    setInputValue(item.data?.value);
    setSuggestions([]);
    if (onSelect) {
      const _onSelect = onSelect as (item: string) => void;
      _onSelect(item.data?.value as string);
    }
  };
  /** 渲染自定义的模板 */
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
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
