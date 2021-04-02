import React from 'react'
import { render } from '@testing-library/react'
import Button from './index'

//分类/分组
describe('test Button', () => {
	it('渲染按钮', () => {
		const wrapper = render(<Button>Nice</Button>)
		const element = wrapper.queryByText('Nice')
		expect(element).toBeInTheDocument()
		expect(element?.tagName).toEqual('BUTTON')
		expect(element).toHaveClass('btn btn-default')
	})
	it('不同属性的按钮', () => {})
	it('渲染链接', () => {})
	it('禁止按钮', () => {})
})
