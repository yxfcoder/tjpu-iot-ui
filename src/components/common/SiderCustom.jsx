import React, {Component} from 'react';
import {Layout, Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';

const {Sider} = Layout;
const SubMenu = Menu.SubMenu;

export default class SiderCustom extends Component {
  constructor(props) {
    super(props);
    const {collapsed} = props;
    this.state = {
      collapsed: collapsed,
      firstHide: true,
      selectedKey: '',
      openKey: '',
    }
  }

  //递归函数生成左侧菜单树
  //这里通过函数的形式，通过递归自身function的方式来生成菜单树的子菜单
  /*
  formSubmenusChild(obj){
      let cHtml=<div></div>;
      let childArray=obj.childrens;
      if("undefined"!=typeof(childArray)&&childArray.length>0) {
          cHtml = childArray.map((item, i) => {
              console.log(item);
              return this.formSubmenusChild(item);
          });
          return <SubMenu key={obj.id} title={<span><Icon type="home" />{obj.name}</span>}>
              {cHtml}
          </SubMenu>
      }else{
          console.log(obj.name);
          if (obj.url === "/app/account") {
              var iconType = "contacts";
          } else if (obj.url === "/app/department") {
              var iconType = "bank";
          } else if (obj.url === "/app/employee") {
              var iconType = "team";
          } else if (obj.url === "/app/position") {
              var iconType = "pushpin";
          } else if (obj.url === "/app/role") {
              var iconType = "profile";
          }
          return(
              <Menu.Item key={obj.id}>
                  <Link to={obj.url}><Icon type={iconType} /><span>{obj.name}</span></Link>
              </Menu.Item>
          )
      }
  }
  */


  //装载完成后
  componentDidMount() {
    this.setMenuOpen(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.onCollapse(nextProps.collapsed);
    this.setMenuOpen(nextProps);
  }

  setMenuOpen = props => {
    const {path} = props;
    this.setState({
      openKey: path.substr(0, path.lastIndexOf('/')),
      selectedKey: path
    });
  };
  onCollapse = (collapsed) => {
    this.setState({
      collapsed,
      firstHide: collapsed,
    });
  };
  menuClick = e => {
    this.setState({
      selectedKey: e.key
    });
  };
  openMenu = v => {
    this.setState({
      openKey: v[v.length - 1],
      firstHide: false,
    })
  };

  render() {
    const {collapsed, firstHide, openKey, selectedKey} = this.state;
    // var data = JSON.parse(localStorage.getItem("employee"));
    // let responsecolumn = JSON.stringify(data.menuTree);
    // let columnMenus = JSON.parse(responsecolumn);
    // let html=columnMenus.map((obj,i)=> {
    //     return this.formSubmenusChild(obj);
    // });


    return (
      <Sider
        trigger={null}
        collapsed={collapsed}
      >
        <div className="logo" style={collapsed ? {backgroundSize: '70%'} : {backgroundSize: '30%'}}/>
        <Menu
          theme="dark"
          mode="inline"
          defaultOpenKeys={['40000000000000000000000000000001']}
          defaultSelectedKeys={['/app']}
          selectedKeys={[selectedKey]}
          onClick={this.menuClick}
          onOpenChange={this.openMenu}
        >

          <Menu.Item key={"/app"}>
            <Link to={"/app"}><Icon type="home"/><span>首页</span></Link>
          </Menu.Item>

          <Menu.Item key={"/deviceInfo"}>
            <Link to={"/app/deviceInfo"}><Icon type="wallet"/><span>设备分析</span></Link>
          </Menu.Item>
          <Menu.Item key={"/deviceManage"}>
            <Link to={"/app/deviceManage"}><Icon type="edit"/><span>设备管理</span></Link>
          </Menu.Item>
          <Menu.Item key={"/userManage"}>
            <Link to={"/app/userManage"}><Icon type="contacts"/><span>用户管理</span></Link>
          </Menu.Item>
          <SubMenu key="DeviceAnalyze" title={<span><Icon type="edit"/><span>设备分析</span></span>}>
            <Menu.Item key={"/deviceDown"}>
              <Link to={"/app/deviceDown"}><Icon type="wallet"/><span>故障分析</span></Link>
            </Menu.Item>
            <Menu.Item key={"/deviceTime"}>
              <Link to={"/app/deviceTime"}><Icon type="wallet"/><span>时间稼动率</span></Link>
            </Menu.Item>
            <Menu.Item key={"/devicePerformance"}>
              <Link to={"/app/devicePerformance"}><Icon type="wallet"/><span>性能稼动率</span></Link>
            </Menu.Item>
            <Menu.Item key={"/deviceYield"}>
              <Link to={"/app/deviceYield"}><Icon type="wallet"/><span>良品率分析</span></Link>
            </Menu.Item>
            <Menu.Item key={"/deviceAnalysis"}>
              <Link to={"/app/deviceAnalysis"}><Icon type="wallet"/><span>综合分析</span></Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }
}
