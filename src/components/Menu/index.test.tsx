import React from 'react'
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react'
import Menu, { MenuProps } from './index'
import MenuItem from './menuItem'

const testProps: MenuProps = {
	defaultIndex: '0',
	onSelect: jest.fn(),
	className: 'test',
}

const testVerticalProps: MenuProps = {
	defaultIndex: '0',
	mode: 'vertical',
	onSelect: jest.fn(),
	className: 'test',
}
//渲染不同类型的组件
const TestMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem index="0">active</MenuItem>
			<MenuItem disabled index="1">
				disabled
			</MenuItem>
			<MenuItem index="2">link2</MenuItem>
		</Menu>
	)
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试menu组件', () => {
	//通用的元素 都放到beforeEach中，每个case都会跑
	beforeEach(() => {
		wrapper = render(TestMenu(testProps))
		menuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('active')
		disabledElement = wrapper.getByText('disabled')
	})
	it('是否正确渲染组件', () => {
		expect(menuElement).toBeInTheDocument()
		expect(menuElement).toHaveClass('jigsaw-menu test')
		expect(menuElement.getElementsByTagName('li').length).toEqual(3)
		expect(activeElement).toHaveClass('menu-item is-active')
		expect(disabledElement).toHaveClass('menu-item is-disabled')
	})
	it('点击样式是否正确，select是否正确回调', () => {
		const thirdItem = wrapper.getByText('link2')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-active')
		expect(activeElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).toHaveBeenCalledWith('2') //调用入参数
		//禁用菜单不触发
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('is-active')
		expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
		//调用结束 会自动调用 cleanup()
	})
	it('垂直模式样式是否正确', () => {
		cleanup() //清干净
		wrapper = render(TestMenu(testVerticalProps))
		menuElement = wrapper.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
})
