import React, { FC } from 'react'
import classNames from 'classnames'

//字符串字面量
type MenuMode = 'horizontal' | 'vertical'

export interface MenuProps {
	defaultIndex?: string
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: (selectedIndex: number) => void
}

const Menu: FC<MenuProps> = (props) => {
	const { defaultIndex, className, style, mode, onSelect, children } = props
	const _class = classNames('jigsaw-menu', {
		'menu-vertical': mode === 'vertical',
	})
	return (
		<ul className={_class} style={style}>
			{children}
		</ul>
	)
}

Menu.defaultProps = {
	defaultIndex: '0',
	mode: 'horizontal',
}
export default Menu
