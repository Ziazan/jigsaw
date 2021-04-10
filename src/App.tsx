import React, { useState } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
library.add(fas);

import Button from './components/Button';
import Menu from './components/Menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/SubMenu';
import Icon from './components/Icon';
import Transition from './components/Transition';
import { Input } from './components/Input/input';

import './App.css';

function App() {
  const [show, setShow] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
        <h1>表单</h1>
        <Input placeholder="默认表单" />
        <Input size="lg" placeholder="超大表单" />
        <Input size="sm" placeholder="小表单" />
        <Input disabled={true} placeholder="禁用表单" />
        <h1>图标</h1>
        <Icon icon="coffee" theme="danger" size="5x" />
        <Icon icon="arrow-down" theme="danger" size="5x" />
        <h1>menu</h1>
        <p>水平</p>
        <Menu defaultIndex="2">
          <MenuItem>link</MenuItem>
          <SubMenu title="submenu">
            <MenuItem>link</MenuItem>
            <MenuItem>link</MenuItem>
            <MenuItem>link</MenuItem>
          </SubMenu>
          <MenuItem index={`5`} disabled>
            link-5
          </MenuItem>
        </Menu>
        <p>垂直</p>
        <Menu defaultIndex="0" mode="vertical" defaultOpenSubMenus={['1']}>
          <SubMenu title="submenu">
            <MenuItem>link</MenuItem>
            <MenuItem>link</MenuItem>
            <MenuItem>link</MenuItem>
          </SubMenu>
          <SubMenu title="submenu">
            <MenuItem>link2</MenuItem>
            <MenuItem>link2</MenuItem>
            <MenuItem>link2</MenuItem>
          </SubMenu>
        </Menu>
        <h1>Button</h1>
        <Button
          size="lg"
          onClick={() => {
            setShow(!show);
          }}
        >
          Toggle
        </Button>
        <Transition in={show} timeout={300} animation="zoom-in-top">
          <div>
            <h1>hahaha show</h1>
          </div>
        </Transition>
        <Transition in={show} timeout={300} animation="zoom-in-top" wrapper>
          <Button
            size="lg"
            btnType="primary"
            onClick={() => {
              setShow(!show);
            }}
          >
            A Large Button
          </Button>
        </Transition>
      </header>
    </div>
  );
}

export default App;
