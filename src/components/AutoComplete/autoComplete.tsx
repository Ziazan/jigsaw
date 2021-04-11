import React, { FC, ChangeEvent, useState, ReactElement, useEffect } from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from './../Icon';
import useDebounce from './../hooks/useDebounce';

interface DataSourceObject {
  value: string;
}

export type DataSourceType<T = Record<string, any>> = T & DataSourceObject;

export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /** 建议回调 支持返回promise */
  fetchSuggestions: (keyword: string) => DataSourceType[] | Promise<DataSourceType[]>;
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

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (debounceValue) {
      const results = fetchSuggestions(debounceValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setSuggestions(data);
          setLoading(false);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
  }, [debounceValue]);

  /**
   * 输入值改变
   * @param e
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
  };

  const handleItemClick = (item: { data?: DataSourceType; index: number }) => {
    setInputValue(item.data?.value as string);
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
      {loading && (
        <div>
          <Icon icon="spinner" spin />
        </div>
      )}
      {suggestions.length > 0 && generateDropDown()}
    </div>
  );
};

export default AutoComplete;
