import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, { ButtonProps, ButtonSize, ButtonType } from './index';

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: 'default',
  className: 'klass',
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};
//分类/分组
describe('test Button', () => {
  it('渲染按钮', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    const element = wrapper.queryByText('Nice');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('BUTTON');
    expect(element).toHaveClass('btn btn-default');
    //Firing Events
    fireEvent.click(element as HTMLElement);
    expect(defaultProps.onClick).toHaveBeenCalled();
  });
  it('不同属性的按钮', () => {
    const wrapper = render(<Button {...testProps}>button</Button>);
    const element = wrapper.queryByText('button');
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('btn-primary btn-lg klass');
  });
  it('渲染链接', () => {
    const wrapper = render(
      <Button btnType={ButtonType.Link} href="www.baidu.com">
        link
      </Button>
    );
    const element = wrapper.queryByText('link');
    expect(element).toBeInTheDocument();
    expect(element?.tagName).toEqual('A');
    expect(element).toHaveClass('btn-link');
  });
  it('禁止按钮', () => {
    const wrapper = render(<Button {...disabledProps}>button</Button>);
    const element = wrapper.queryByText('button') as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toBeCalled();
  });
});
