import React from 'react';
import logo from './logo.svg';
import Button,{ButtonType,ButtonSize} from './components/Button'
import './App.css';

function App() {
  return (
    <div className="App">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button disabled>Hello</Button>
        <Button btnType={ButtonType.Primary}
        size={ButtonSize.Large}>Hello</Button>
        <Button btnType={ButtonType.Link} href="www.baidu.com">baidu</Button>
      </header>
    </div>
  );
}

export default App;
