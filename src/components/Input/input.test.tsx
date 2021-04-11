import React, { useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input, { InputProps } from './input';

const DefaultInputProps = {
  onChange: jest.fn(),
  placeholder: 'test input',
};

describe('test Input', () => {
  it('渲染input', () => {
    const wrapper = render(<Input {...DefaultInputProps} />);
    const element = wrapper.queryByPlaceholderText(DefaultInputProps.placeholder) as HTMLInputElement;
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass('jigsaw-input-inner');
    fireEvent.change(element, { target: { value: '123' } });
    expect(DefaultInputProps.onChange).toBeCalled();
    expect(element.value).toEqual('123');
  });
  it('禁用的input', () => {
    const wrapper = render(<Input disabled={true} placeholder="disabled" />);
    const element = wrapper.queryByPlaceholderText('disabled') as HTMLInputElement;
    expect(element.disabled).toBeTruthy();
  });
  it('不同size的Input', () => {
    const { container } = render(<Input size="lg" placeholder="large" />);
    const testContainer = container.querySelector('.jigsaw-input');
    expect(testContainer).toHaveClass('input-lg ');
  });

  it('有前缀和后缀的input', () => {
    const { container } = render(<Input prepend="https://" append=".com" placeholder="append" />);
    const testContainer = container.querySelector('.jigsaw-input');
    expect(testContainer).toHaveClass('jigsaw-input has-prepend has-append');
  });
});
