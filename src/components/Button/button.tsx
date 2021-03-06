import React, { FC, ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import classNames from 'classnames';
import { layer } from '@fortawesome/fontawesome-svg-core';

//字符串字面量
export type ButtonSize = 'lg' | 'sm';
export type ButtonType = 'primary' | 'default' | 'danger' | 'link';

interface BaseButtonProps {
  className?: string;
  /**是否禁用 */
  disabled?: boolean;
  /**按钮尺寸 */
  size?: ButtonSize;
  /** 按钮类型 */
  btnType?: ButtonType;
  children: ReactNode;
  /** link 类型时 有效 */
  href?: string;
}
//& 混合两种的属性
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLElement>;

//Partial 设置属性可选
export type ButtonProps = Partial<AnchorButtonProps & NativeButtonProps>;
/**
 * 这是一个Button组件
 * ## Button header
 * 使用方式
 *  ```javascript
 *  import { Button } from 'jigsaw'
 *  ```
 * @param props
 * @returns
 */
export const Button: FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, children, href, ...restProps } = props;
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disable: btnType === 'link' && disabled,
  });
  if (btnType === 'link' && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }
  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  disabled: false,
  btnType: 'default',
};

export default Button;
