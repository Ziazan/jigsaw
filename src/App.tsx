import React from 'react'
import logo from './logo.svg'
import Button, { ButtonType, ButtonSize } from './components/Button'
import Menu from './components/Menu'
import MenuItem from './components/Menu/menuItem'

import './App.css'

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<h1>menu</h1>
				<p>水平</p>
				<Menu defaultIndex="0">
					<MenuItem>link 1</MenuItem>
					<MenuItem>link 2</MenuItem>
					<MenuItem>link 3</MenuItem>
					<MenuItem>link 4</MenuItem>
				</Menu>
				<p>垂直</p>
				<Menu defaultIndex="0" mode="vertical">
					<MenuItem>link 1</MenuItem>
					<MenuItem>link 2</MenuItem>
					<MenuItem>link 3</MenuItem>
					<MenuItem>link 4</MenuItem>
				</Menu>
				<p>类型</p>
				<Button
					className="my-btn"
					onClick={(e) => {
						e.preventDefault
						alert(123)
					}}
					size={ButtonSize.Large}
				>
					Hello
				</Button>
				<Button disabled>Hello</Button>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
					Hello
				</Button>
				<Button btnType={ButtonType.Danger} size={ButtonSize.Small}>
					Hello
				</Button>
				<Button btnType={ButtonType.Link} href="www.baidu.com">
					baidu
				</Button>
				<p>大小</p>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Small}>
					Hello
				</Button>
				<Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
					Hello
				</Button>
				<p>Link</p>
				<Button btnType={ButtonType.Link} href="www.baidu.com">
					baidu
				</Button>
				<Button btnType={ButtonType.Link} disabled={true} href="www.baidu.com">
					baidu
				</Button>
			</header>
		</div>
	)
}

export default App
