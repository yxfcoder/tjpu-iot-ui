import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../components/common/history';

import Login from '../components/login/Login';
import App from '../components/common/App';
import Home from '../components/common/Home';
import NoMatch from '../components/common/404';

import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn'

moment.locale('zh-cn');

class MRoute extends Component {
  render() {
    return (
        //路由切换由URL的hash变化决定
      <LocaleProvider locale={zh_CN}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/app" component={App}/>
          <Route path="/login" component={Login}/>
          <Route component={NoMatch}/>
        </Switch>
      </Router>
      </LocaleProvider>
    );
  }
}

export default MRoute;
