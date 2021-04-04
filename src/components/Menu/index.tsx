import React, { FC, useState, createContext } from 'react'
import classNames from 'classnames'

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
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>{children}</MenuContext.Provider>
		</ul>
	)
}

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
}
export default Menu
