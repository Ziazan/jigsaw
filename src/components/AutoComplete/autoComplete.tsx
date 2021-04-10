import React from 'react';

export interface AutoCompleteProps {
  fetchSugestions: (keyword: string) => string[];
  onSelect: (item: string) => void;
}

//可以自定义option的样式
//支持键盘上下移动选中
//debource 防抖
//点击外部收起菜单
