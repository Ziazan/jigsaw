import React, { FC, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './index'
import { MenuItemProps } from './menuItem'
import MenuItem from './menuItem'

export interface SubMenuProps {
	title: string
	index?: string
	style?: React.CSSProperties
	className?: string
}

const SubMenuItem: React.FC<SubMenuProps> = (props) => {
	const { title, index, children, style, className } = props
	const context = useContext(MenuContext)
	const classes = classNames('menu-item submenu-item', className, {
		'is-active': context.index === index,
	})

	//props 中的 children 是一个不透明的数据 直接map不可靠，使用React.Children
	const renderChildren = () => {
		const subMenuClasses = classNames('jigsaw-submenu')

		const childrenComponent = React.Children.map(children, (child, i) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			const { displayName } = childElement.type
			if (displayName === 'MenuItem') {
				return React.cloneElement(childElement, {
					index: `${index}-${i}`,
				})
			} else {
				console.error('Warning：Menu has a child which is not MenuItm')
			}
		})
		return <ul className={subMenuClasses}>{childrenComponent}</ul>
	}
	return (
		<li className={classes} style={style} key={index}>
			<div className="submenu-title">{title}</div>
			{renderChildren()}
		</li>
	)
}

SubMenuItem.displayName = 'SubMenuItem'

export default SubMenuItem
