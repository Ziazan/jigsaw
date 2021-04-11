import React, { InputHTMLAttributes, ReactElement, FC, ChangeEvent } from 'react';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import classNames from 'classnames';
import Icon from './../Icon';

type InputSize = 'lg' | 'sm';
export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
  /** 表单是否禁用 */
  disabled?: boolean;
  /** 表单尺寸 */
  size?: InputSize;
  /** 有图标的表单 */
  icon?: IconProp;
  /** 表单前缀 */
  prepend?: string | ReactElement;
  /** 表单后缀 */
  append?: string | ReactElement;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}
/**
 * 表单输入框
 * @param props
 * @returns
 */
export const Input: FC<InputProps> = (props) => {
  //取出各种属性
  const { disabled, size, icon, className, prepend, append, ...restProps } = props;

  //根据属性计算不同的className
  const classes = classNames('jigsaw-input', className, {
    'input-sm': size === 'sm',
    'input-lg': size === 'lg',
    'is-disabled': disabled,
    'has-prepend': !!prepend,
    'has-append': !!append || !!icon,
  });

  //防止react 报错:把非受控组件变成受控组件
  const fixControlledValue = (value: any) => {
    if (typeof value === 'undefined' || value === null) {
      return '';
    }
    return value;
  };
  //如果设置了value 属性，就删除defaultValue
  if ('value' in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    //根据属性判断是否要添加特定的节点
    <div className={classes}>
      {prepend && <div className="input-prepend">{prepend}</div>}
      <input className="jigsaw-input-inner" disabled={disabled} {...restProps} />
      {(icon || append) && <div className="input-append">{icon ? <Icon icon={icon} /> : append}</div>}
    </div>
  );
};

export default Input;
