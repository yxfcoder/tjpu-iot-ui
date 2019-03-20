import React, {Component} from 'react';
import {Row, Col, Input, Icon, message, Button, Tooltip, Popconfirm, Select} from 'antd';
import BreadcrumbCustom from '../../common/BreadcrumbCustom';
import DCollectionCreateForm from './UserAddForm';
import DEditCreateForm from './UserEditForm';
import UserTable from './UserTable';
import '../table.less';

const Search = Input.Search;
const Option = Select.Option;

//数组中是否包含某项
function isContains(arr, item) {
  arr.map(function (ar) {
    if (ar === item) {
      return true;
    }
  });
  return false;
}

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
      visibleAdd: false,
      visibleEdit: false,
      dataSource: [],
      tableRowKey: 0,
      loading: true
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
        let responseData = JSON.stringify(responseBody.data);
        this.setState({
          dataSource: JSON.parse(responseData),
          loading: false
        });
      });
    }).catch((error) => {
      console.log(error);
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
        alert("删除失败！");
      });
    });
  };

  addUser = () => {
    const {dataSource, count} = this.state;
    const form = this.form;
    form.validateFields((err, values) => {
      // if (err) {
      //   console.log("数据有误");
      //   return;
      // }
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
        visibleAdd: false,
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
          } else {
            message.error(responseBody.message);
          }
        }).catch((error) => {
          alert("更新用户信息失败！");
        });
      });
      form.resetFields();
      this.setState({
        visibleEdit: false,
        dataSource: replace(dataSource, tableRowKey, values)
      });
    });
  };

  addUserButton = () => {
    this.setState({
      visibleAdd: true
    });
    const form = this.form;
    console.log(form);
    form.resetFields();
  };

  //用户名输入
  onChangeUserName = (e) => {
    const value = e.target.value;
    this.setState({
      userName: value,
    })
  };
  //用户名搜索
  onSearchUserName = (value) => {
    console.log(value);
    const {dataSource} = this.state;
    this.setState({
      dataSource: dataSource.filter(item => item.userName.indexOf(value) !== -1),
      loading: false,
    })
  };
  //提交搜索框的value
  handleChange(value) {
    console.log(value);
  }

  //搜索按钮,查询相关职位信息的employee
  btnSearch_Click = () => {
    // const { dataSource } = this.state;
    // this.setState({
    //     dataSource: dataSource.filter(item.employeePositionName.indexOf(value) !== -1),
    //     loading: false,
    // });
  };
  //重置按钮
  btnClear_Click = () => {
    this.setState({
      userName: '',
      dataSource: [],
    });
    this.getAllUsers();
  };
  //接受新建表单数据
  saveFormRefC = (form) => {
    console.log(form);
    this.form = form;
  };
  //接受修改表单数据
  saveFormRefE = (form) => {
    this.form = form;
  };

  //取消
  handleCancelC = () => {
    this.setState({visibleAdd: false});
  };
  //取消
  handleCancelE = () => {
    this.setState({visibleEdit: false});
  };

  //点击修改
  editClick = (userId) => {
    const form = this.form;
    const {dataSource} = this.state;
    const index = catchIndex(dataSource, userId);
    console.log(userId);
    console.log(index);
    form.setFieldsValue({
      userId: dataSource[index].userId,
      userName: dataSource[index].userName,
      // userPassword: dataSource[index].userPassword,
      // address: dataSource[index].address.split(' / '),
      userMobile: dataSource[index].userMobile,
      userCompany: dataSource[index].userCompany,
      userLocal: dataSource[index].userLocal,
      userState: dataSource[index].userState,
      userPermission: dataSource[index].userPermission,
    });
    this.setState({
      visibleEdit: true,
      tableRowKey: userId,
      isUpdate: true,
    });

  };

  //单选框改变选择
  checkChange = (selectedRowKeys) => {
    this.setState({selectedRowKeys: selectedRowKeys});
  };

  render() {
    const {userName, dataSource, visibleAdd, visibleEdit, loading} = this.state;
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
            <Col className="gutter-row" sm={8}>
              <Select
                showSearch
                style={{width: '100%'}}
                placeholder="请选择公司"
                optionFilterProp="children"
                onChange={this.handleChange}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="天津工业大学">天津工业大学</Option>
                <Option value="软件园">软件园</Option>
              </Select>
            </Col>
          </Row>
          <Row gutter={16}>
            <div className='plus' onClick={this.addUserButton}>
              <Button type="primary">添加用户</Button>
            </div>
            <div className='btnOpera'>
              <Button type="primary" onClick={this.btnSearch_Click} style={{marginRight: '10px'}}>查询</Button>
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
          <DCollectionCreateForm
            ref={this.saveFormRefC}
            visible={visibleAdd}
            onCancel={this.handleCancelC}
            onCreate={this.addUser}
            title="添加新用户"
            okText="创建"
            disabled={false}
            statuAble={true}
          />
          <DEditCreateForm
            ref={this.saveFormRefE}
            visible={visibleEdit}
            onCancel={this.handleCancelE}
            onCreate={this.handleUpdate}
            title="更新用户信息"
            okText="更新"
            disabled={true}
            statuAble={false}
          />
        </div>
      </div>
    )
  }
}
