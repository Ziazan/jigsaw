import React, { FC, InputHTMLAttributes, ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import Input from './../Input';

export interface AutoCompleteProps extends Omit<InputHTMLAttributes<HTMLElement>, 'onSelect'> {
  fetchSugestions: (keyword: string) => string[];
  onSelect?: (item: string) => void;
}
//可以优化的点
//可以自定义option的样式
//支持键盘上下移动选中
//debource 防抖
//点击外部收起菜单

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSugestions, onSelect, className, ...restProps } = props;
  const classes = classNames('jigsaw-auto-complete', className, {});
  const initSuggestions: string[] = [];
  const [sugesstions, setSuggestions] = useState(initSuggestions);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSuggestions(fetchSugestions(e.target.value));
  };

  return (
    <div className={classes}>
      <Input placeholder="请输入关键词" onChange={handleChange} />
      <ul className="jigsaw-auto-complete-list">
        {sugesstions.map((_str, index) => {
          return (
            <li className="auto-complete-item" key={index}>
              {_str}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AutoComplete;
