import * as MiniReact from './react';
import * as MiniReactDOM from './react-dom';
import './style.less';

const App = () => {
  return (
    <div className="app">
      <h1>Hello, MiniReact!</h1>
      <span>ccc</span>
    </div>
  );
};

const container = document.getElementById('root');
MiniReactDOM.render(<App />, container);
