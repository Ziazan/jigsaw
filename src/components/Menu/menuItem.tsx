import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './index'

export interface MenuItemProps {
	index?: string
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}

const MenuItem: FC<MenuItemProps> = (props) => {
	const { index, disabled, className, children, style } = props
	const context = useContext(MenuContext)
	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-active': context.index === index,
	})

	const handleClick = () => {
		if (context.onSelect && !disabled && index) {
			context.onSelect(index)
		}
	}
	return (
		<li className={classes} style={style} onClick={handleClick} key={index}>
			{children}
		</li>
	)
}
MenuItem.displayName = 'MenuItem'
export default MenuItem
