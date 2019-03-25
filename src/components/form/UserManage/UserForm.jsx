import React, {Component} from 'react';
import {Row, Col, Input, Icon, message, Button, Select} from 'antd';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import UserOperationForm from './UserAddAndEditForm';
import UserTable from './UserTable';
import '../table.less';

const Search = Input.Search;

//找到对应元素的索引
function catchIndex(arr, key) {
  let index1 = 0;
  arr.map(function (ar, index) {
    if (ar.userId === key) {
      index1 = index;
    }
  });
  return index1;
}

//替换数组的对应项
function replace(arr, item, place) { //arr 数组,item 数组其中一项, place 替换项
  arr.map(function (ar) {
    if (ar.key === item) {
      arr.splice(arr.indexOf(ar), 1, place)
    }
  });
  return arr;
}

export default class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      userName: '',
      visible: false,
      dataSource: [],
      tableRowKey: 0,
      loading: true,
      isUpdate: null
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    const apiURL = "/tjpu/iot/user/user";
    const opts = {
      credentials: "include",
      method: "GET",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    fetch(apiURL, opts).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }
      response.json().then((responseBody) => {
        if (responseBody.code === 200) {
          let responseData = JSON.stringify(responseBody.data);
          this.setState({
            dataSource: JSON.parse(responseData),
            loading: false
          });
        } else {
          message.error(responseBody.message);
        }
      });
    }).catch((error) => {
      message.error('获取所有用户失败！');
    });
  };

  deleteUser = (userId) => {
    const dataSource = [...this.state.dataSource];
    this.setState({dataSource: dataSource.filter(item => item.userId !== userId)});
    const apiUrl = '/tjpu/iot/user/' + userId;
    const opts = {
      method: "DELETE",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    };
    fetch(apiUrl, opts).then((response) => {
      if (response.status !== 200) {
        throw new Error('Fail to get response with status ' + response.status);
      }
      response.json().then((responseBody) => {
        if (responseBody.code === 204) {
          message.success(responseBody.message);
        } else {
          message.error(responseBody.message);
        }
      }).catch((error) => {
        message.error('删除失败！');
      });
    });
  };

  addUser = () => {
    const {dataSource, count} = this.state;
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        console.log("数据有误");
        return;
      }
      console.log('Received values of form: ', values);
      const apiURL = "/tjpu/iot/user/user";
      const data = {
        "userId": values.userId,
        "userName": values.userName,
        "userPassword": values.userPassword,
        "userMobile": values.userMobile,
        "userCompany": values.userCompany,
        "userLocal": values.userLocal,
        "userState": values.userState,
        "userPermission": values.userPermission
      };
      const opts = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };
      fetch(apiURL, opts).then((response) => {
        if (response.status !== 200) {
          throw new Error('Fail to get response with status ' + response.status);
        }
        response.json().then((responseBody) => {
          if (responseBody.code === 201) {
            message.success(responseBody.message);
          } else {
            message.error(responseBody.message);
          }
        });
      }).catch((error) => {
        console.log(error);
      });
      form.resetFields();
      this.setState({
        isUpdate: true,
        visible: false,
        dataSource: [...dataSource, values],
        count: count + 1,
      });
    });
  };

  handleUpdate = () => {
    const form = this.form;
    const {dataSource, tableRowKey} = this.state;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('Received values of form: ', values);
      values.userId = tableRowKey;
      let apiUrl = '/tjpu/iot/user/user';
      let opts = {
        method: "PUT",
        body: JSON.stringify(values),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      };
      fetch(apiUrl, opts).then((response) => {
        if (response.status !== 200) {
          throw new Error('Fail to get response with status ' + response.status);
        }
        response.json().then((responseBody) => {
          if (responseBody.code === 201) {
            message.success(responseBody.message);
            this.getAllUsers();
          } else {
            message.error(responseBody.message);
          }
        }).catch((error) => {
          alert("更新用户信息失败！");
        });
      });
      form.resetFields();
      this.setState({
        isUpdate: false,
        visible: false,
        dataSource: replace(dataSource, tableRowKey, values)
      });
    });
  };

  addUserButton = () => {
    this.setState({
      visible: true,
      isUpdate: false
    });
    const form = this.form;
    console.log(form);
    form.resetFields();
  };

  onChangeUserName = (e) => {
    const value = e.target.value;
    this.setState({
      userName: value,
    })
  };

  onSearchUserName = (value) => {
    if (value) {
      const {dataSource} = this.state;
      this.setState({
        dataSource: dataSource.filter(item => item.userName.indexOf(value) !== -1),
        loading: false,
      })
    } else {
      this.getAllUsers();
    }
  };

  // 重置按钮
  btnClear_Click = () => {
    this.setState({
      userName: '',
      dataSource: [],
    });
    this.getAllUsers();
  };

  // 接受新建表单数据
  saveFormRef = (form) => {
    this.form = form;
  };

  //取消
  handleCancel = () => {
    this.setState({visible: false});
  };

  //点击修改
  editClick = (userId) => {
    const form = this.form;
    const {dataSource} = this.state;
    const index = catchIndex(dataSource, userId);
    form.setFieldsValue({
      userId: dataSource[index].userId,
      userName: dataSource[index].userName,
      userMobile: dataSource[index].userMobile,
      userCompany: dataSource[index].userCompany,
      userLocal: dataSource[index].userLocal,
      userState: dataSource[index].userState,
      userPermission: dataSource[index].userPermission,
    });
    this.setState({
      visible: true,
      isUpdate: true,
      tableRowKey: userId,
    });
  };

  render() {
    const {userName, dataSource, visible, loading, isUpdate} = this.state;
    return (
      <div>
        <BreadcrumbCustom paths={['index', 'form']}/>
        <div className='formBody'>
          <Row gutter={16}>
            <Col className="gutter-row" sm={8}>
              <Search
                placeholder="请输入用户名"
                prefix={<Icon type="user"/>}
                value={userName}
                onChange={this.onChangeUserName}
                onSearch={this.onSearchUserName}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <div className='plus' onClick={this.addUserButton}>
              <Button type="primary">添加用户</Button>
            </div>
            <div className='btnOpera'>
              <Button type="primary" onClick={this.btnClear_Click}
                      style={{background: '#f8f8f8', color: '#108ee9'}}>重置</Button>
            </div>
          </Row>
          <UserTable
            dataSource={dataSource}
            checkChange={this.checkChange}
            onDelete={this.deleteUser}
            editClick={this.editClick}
            loading={loading}
          />
          {isUpdate ?
            <UserOperationForm
              ref={this.saveFormRef}
              visible={visible}
              onCancel={this.handleCancel}
              onCreate={this.handleUpdate}
              title="更新用户信息"
              okText="更新"
              disabled={true}
              statuAble={false}
              password={false}
            /> :
            <UserOperationForm
              ref={this.saveFormRef}
              visible={visible}
              onCancel={this.handleCancel}
              onCreate={this.addUser}
              title="添加新用户"
              okText="创建"
              disabled={false}
              statuAble={true}
              password={true}
            />}
        </div>
      </div>
    )
  }
}
