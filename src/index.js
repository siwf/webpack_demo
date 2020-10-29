import React from 'react';
import ReactDom from 'react-dom';
import './index.css'
import './test.less'
import logo from './assets/image/404.png'


class Search extends React.Component {
  render() {
    return <div> 不知道aaa <img src={ logo } /></div>
  }
}
ReactDom.render(
  <Search />,
  document.getElementById('root')
)