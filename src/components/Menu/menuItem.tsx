import React, { FC } from 'react'
import classNames from 'classnames'

export interface MenuItemProps {
	index?: number
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}

const MenuItem: FC<MenuItemProps> = (props) => {
	const { disabled, className, children, style } = props
	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
	})
	return (
		<li className={classes} style={style}>
			{children}
		</li>
	)
}

export default MenuItem
