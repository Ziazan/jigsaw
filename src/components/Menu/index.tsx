import React, { FC, useState, createContext, Children, FunctionComponentElement } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'

type SelectCallBack = (selectedIndex: string) => void

//字符串字面量
type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
	defaultIndex?: string
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: SelectCallBack
}
interface IMenuContext {
	index: string
	onSelect?: SelectCallBack
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: FC<MenuProps> = (props) => {
	const { defaultIndex, className, style, mode, onSelect, children } = props
	const [currentActive, setActive] = useState(defaultIndex)
	const classes = classNames('jigsaw-menu', className, {
		'menu-vertical': mode === 'vertical',
	})
	const handleClick = (index: string) => {
		setActive(index)

		if (onSelect) {
			onSelect(index)
		}
	}
	const passedContext: IMenuContext = {
		index: currentActive ? currentActive : '0',
		onSelect: handleClick,
	}

	const renderChildren = () => {
		return Children.map(children, (child, index) => {
			const childElement = child as FunctionComponentElement<MenuItemProps>
			const { displayName } = childElement.type
			if (displayName === 'MenuItem') {
				return child
			} else {
				console.error('Warning：Menu 下只能用 MenuItem 标签')
			}
		})
	}
	//children 是一个不透明的数据 不能直接map
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>{renderChildren()}</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
}
export default Menu
