import React from 'react';
import logo from './logo.svg';
import Button, { ButtonType, ButtonSize } from './components/Button';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>类型</p>
        <Button
          size={ButtonSize.Large}
        > Hello
        </Button>
        <Button disabled>Hello</Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        > Hello
        </Button>
        <Button
          btnType={ButtonType.Danger}
          size={ButtonSize.Large}
        > Hello
        </Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">baidu</Button>
        <p>大小</p>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Small}
        > Hello
        </Button>
        <Button
          btnType={ButtonType.Primary}
          size={ButtonSize.Large}
        > Hello
        </Button>
        <p>Link</p>
        <Button btnType={ButtonType.Link} href="www.baidu.com">baidu</Button>
        <Button btnType={ButtonType.Link} disabled={true} href="www.baidu.com">baidu</Button>
      </header>
    </div>
  );
}

export default App;
