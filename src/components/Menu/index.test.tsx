import React from 'react'
import { render, fireEvent, RenderResult, cleanup, waitFor } from '@testing-library/react'
import Menu, { MenuProps } from './index'
import MenuItem from './menuItem'
import SubMenu from './SubMenu'

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
	defaultOpenSubMenus: ['4'],
}
//渲染不同类型的组件
const TestMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>active</MenuItem>
			<MenuItem disabled index="1">
				disabled
			</MenuItem>
			<MenuItem>link2</MenuItem>
			<SubMenu title="dropdown">
				<MenuItem>drop1</MenuItem>
			</SubMenu>
			<SubMenu title="dropdown2">
				<MenuItem>drop2</MenuItem>
			</SubMenu>
		</Menu>
	)
}
//测试中没有引入样式 Received element is visible:
const createStyleFile = () => {
	const cssFile: string = `
    .jigsaw-submenu {
        display:none;
    }
    .jigsaw-submenu.menu-opened{
        display:block;
    }
    `
	const style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = cssFile
	return style
}
let wrapper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement
describe('测试menu组件', () => {
	//通用的元素 都放到beforeEach中，每个case都会跑
	beforeEach(() => {
		wrapper = render(TestMenu(testProps))
		wrapper.container.append(createStyleFile()) //插入样式
		menuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('active')
		disabledElement = wrapper.getByText('disabled')
	})
	it('是否正确渲染组件', () => {
		expect(menuElement).toBeInTheDocument()
		expect(menuElement).toHaveClass('jigsaw-menu test')
		//:scope 属于 CSS 伪类，它表示作为选择器要匹配的参考点的元素。
		//当需要获取已检索到的的直接后代元素时，:scope 伪类很有用。
		expect(menuElement.querySelectorAll(':scope > li').length).toEqual(4)
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
	it('横向-子菜单正常展开', async () => {
		const drapDownElemnt = wrapper.getByText('dropdown')
		const drop1Elemnet = wrapper.queryByText('drop1') as HTMLElement
		expect(drop1Elemnet).not.toBeVisible() //元素不在视野中

		fireEvent.mouseEnter(drapDownElemnt)
		await waitFor(() => {
			//waitFor 解决异步问题
			expect(drop1Elemnet).toBeVisible()
		})
		fireEvent.click(drop1Elemnet)
		expect(testProps.onSelect).toHaveBeenCalledWith('3-0')
		fireEvent.mouseLeave(drapDownElemnt)
		await waitFor(() => {
			//waitFor 解决异步问题
			expect(drop1Elemnet).not.toBeVisible() //元素不在视野中
		})
	})
	it('纵向-子菜单正常展开', async () => {
		cleanup() //清干净
		wrapper = render(TestMenu(testVerticalProps))
		const drapDownElemnt = wrapper.getByText('dropdown')
		const drop1Elemnet = wrapper.queryByText('drop1') as HTMLElement
		fireEvent.click(drapDownElemnt)
		expect(drop1Elemnet).toBeVisible()
		await waitFor(() => {
			fireEvent.click(drapDownElemnt)
			expect(drop1Elemnet).not.toBeVisible()
		})
	})
	it('纵向-子菜单默认展开', async () => {
		cleanup() //清干净
		wrapper = render(TestMenu(testVerticalProps))
		const drop2Elemnet = wrapper.queryByText('drop2')
		expect(drop2Elemnet).toBeVisible()
	})
})
