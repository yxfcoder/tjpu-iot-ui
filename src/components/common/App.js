import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import Dashboard from '../dashboard/Dashboard';
import DeviceForm from '../form/DeviceManage/DeviceForm';
import UserForm from '../form/UserManage/UserForm';
import DeviceDown from '../analysis/DeviceDown/DeviceDown';
import DeviceTime from '../analysis/DeviceTime/DeviceTime';
import DevicePerformance from '../analysis/DevicePerformance/DevicePerformance';
import DeviceYield from '../analysis/DeviceYield/DeviceYield';
import DeviceAnalysis from '../analysis/DeviceAnalysis/DeviceAnalysis'
import noMatch from './404';

const {Content, Footer} = Layout;

export default class App extends Component {
  state = {
    collapsed: localStorage.getItem("mms_SiderCollapsed") === "true",
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    }, function () {
      localStorage.setItem("mms_SiderCollapsed", this.state.collapsed);
    });
  };

  componentDidMount() {
    //save Sider
    if (localStorage.getItem("mms_SiderCollapsed") === null) {
      localStorage.setItem("mms_SiderCollapsed", false);
    }

    // var data = JSON.stringify(localStorage.getItem("employee"));
    // console.log(JSON.parse(data).menuTree[0]);
  }

  render() {
    const {collapsed} = this.state;
    const {location} = this.props;
    let userName;
    if (localStorage.getItem("userInfo") === null) {
      return <Redirect to="/login"/>
    } else {
      var userInfo = localStorage.getItem("userInfo");
      var JSONUserInfo = JSON.parse(userInfo);
      // employeeNickName = location.state === undefined ? JSONEmployee.employeeNickName : location.state.employeeNickName;
      userName = JSONUserInfo.userName;
      console.log(userName);
    }


    return (
      <Layout className="ant-layout-has-sider" style={{minHeight: '100vh'}}>
        <SiderCustom collapsed={collapsed} path={location.pathname}/>
        <Layout>
          <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={userName}/>
          <Content style={{margin: '0 16px'}}>
            <Switch>
              <Route exact path={'/app'} component={Dashboard}/>
              <Route exact path={'/app/deviceInfo'} component={DeviceForm}/>
              <Route exact path={'/app/deviceManage'} component={DeviceForm}/>
              <Route exact path={'/app/userManage'} component={UserForm}/>
               <Route exact path={'/app/deviceDown'} component={DeviceDown} />
               <Route exact path={'/app/deviceTime'} component={DeviceTime} />
               <Route exact path={'/app/devicePerformance'} component={DevicePerformance} />
               <Route exact path={'/app/deviceYield'} component={DeviceYield} />
               <Route exact path={'/app/deviceAnalysis'} component={DeviceAnalysis} />
              {/* <Route exact path={'/app/personalInformation'} component={PersonMsg} /> */}
              {/* <Route exact path={'/app/meetingSchedule'} component={MeeManagement} /> */}
              {/* <Route exact path={'/app/calendar'} component={my} /> */}

              <Route component={noMatch}/>
            </Switch>
          </Content>
          <Footer style={{textAlign: 'center'}}>
            工翼物联平台 ©2019 Created by 杨孝峰
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
