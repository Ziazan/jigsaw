import React, { FC, useContext, useState } from 'react'
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

const SubMenu: React.FC<SubMenuProps> = (props) => {
	const { title, index, children, style, className } = props
	const context = useContext(MenuContext)
	const openedSunMenus = context.defaultOpenSubMenus as Array<string>

	const isOpened = index && context.mode === 'vertical' ? openedSunMenus.includes(index) : false
	const [menuOpen, setOpen] = useState(isOpened)

	const classes = classNames('menu-item submenu-item', className, {
		'is-active': context.index === index,
	})

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setOpen(!menuOpen)
	}

	let timer: any
	const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
		clearTimeout(timer)
		e.preventDefault()
		timer = setTimeout(() => {
			setOpen(toggle)
		}, 300)
	}

	const clickEvents =
		context.mode === 'vertical'
			? {
					onClick: handleClick,
			  }
			: {}
	const hoverEvents =
		context.mode !== 'vertical'
			? {
					onMouseEnter: (e: React.MouseEvent) => {
						handleMouse(e, true)
					},
					onMouseLeave: (e: React.MouseEvent) => {
						handleMouse(e, false)
					},
			  }
			: {}

	//props 中的 children 是一个不透明的数据 直接map不可靠，使用React.Children
	const renderChildren = () => {
		const subMenuClasses = classNames('jigsaw-submenu', {
			'menu-opened': menuOpen,
		})

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
		<li className={classes} style={style} key={index} {...hoverEvents}>
			<div className="submenu-title" {...clickEvents}>
				{title}
			</div>
			{renderChildren()}
		</li>
	)
}

SubMenu.displayName = 'SubMenu'

export default SubMenu
