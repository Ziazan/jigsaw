import React, { FC, useState, createContext } from 'react'
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
	mode?: MenuMode
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

const Menu: FC<MenuProps> = (props) => {
	const { defaultIndex, className, style, mode, onSelect, children } = props
	const [currentActive, setActive] = useState(defaultIndex)
	const classes = classNames('jigsaw-menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode !== 'vertical',
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
		mode,
	}

	//props 中的 children 是一个不透明的数据 直接map不可靠，使用React.Children
	const renderChildren = () => {
		return React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			const { displayName } = childElement.type
			if (displayName === 'MenuItem' || displayName === 'SubMenuItem') {
				return React.cloneElement(childElement, {
					index: '' + index,
				})
			} else {
				console.error('Warning：Menu has a child which is not MenuItm or SubMenuItem')
			}
		})
	}

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
