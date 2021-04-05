import React from 'react'
import logo from './logo.svg'
import Button, { ButtonType, ButtonSize } from './components/Button'
import Menu from './components/Menu'
import MenuItem from './components/Menu/menuItem'
import SubMenuItem from './components/Menu/SubMenuItem'

import './App.css'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>menu</h1>
				<p>水平</p>
				<Menu defaultIndex="2">
					<MenuItem>link</MenuItem>
					<SubMenuItem title="submenu">
						<MenuItem>link</MenuItem>
						<MenuItem>link</MenuItem>
						<MenuItem>link</MenuItem>
					</SubMenuItem>
					<MenuItem index={`5`} disabled>
						link-5
					</MenuItem>
				</Menu>
				<p>垂直</p>
				<Menu defaultIndex="0" mode="vertical">
					<SubMenuItem title="submenu">
						<MenuItem>link</MenuItem>
						<MenuItem>link</MenuItem>
						<MenuItem>link</MenuItem>
					</SubMenuItem>
				</Menu>
			</header>
		</div>
	)
}

export default App
