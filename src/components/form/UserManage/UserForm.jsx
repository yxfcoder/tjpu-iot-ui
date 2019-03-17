import React, { Component } from 'react';
import '../form.less';

import axios from 'axios';
import moment from 'moment';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm, Select } from 'antd';

import BreadcrumbCustom from '../../common/BreadcrumbCustom';
// import address from './request/address.json';
// import data from './request/data.json';
import DCollectionCreateForm from './DCustomizedForm';
import DEditCreateForm from './DEditForm';
import DFormTable from './DFormTable';

const Search = Input.Search;
const Option = Select.Option;
// const InputGroup = Input.Group;
// const options = [];
const { RangePicker } = DatePicker;
// Mock.mock('/address', address);
// Mock.mock('/data', data);

//数组中是否包含某项
function isContains(arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}
//找到对应元素的索引
function catchIndex(arr, key){
    let index1 = 0;
    arr.map(function (ar, index) {
        if(ar.userId === key){
            index1 = index;
        }
    });
    return index1;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

export default class UserForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            userName: '',
            timeRange: '',
            visibleC: false, //新建窗口隐藏
            visibleE: false, //新建窗口隐藏
            dataSource: [],
            // count: data.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            // isUpdate: true,
            loading: true
        };
    }
    //getData
    getData = () => {
        var apiURL = "/tjpu/iot/user/user";
        var opts = {
            credentials: "include",
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        };
        fetch(apiURL, opts).then((response) => {
            // var responseData = JSON.stringify(response.data);

            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }

            response.json().then((responseJSON) => {
                var responseData = JSON.stringify(responseJSON.data);
                this.setState({
                    dataSource: JSON.parse(responseData),
                    loading: false
                });
            });
        }).catch((error) => {
            console.log(error);
        });
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
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.userName.indexOf(value) !== -1),
            loading: false,
        })
    };
    //时间选择
    RangePicker_Select = (date, dateString) => {
        // console.log(date, dateString);
        const { dataSource } = this.state;
        const startime = moment(dateString[0]);
        const endtime = moment(dateString[1]);
        if(date.length===0){
            this.setState({
                timeRange: date,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                timeRange: date,
                dataSource: dataSource.filter(item => (moment(item.createtime.substring(0,10)) <= endtime  && moment(item.createtime.substring(0,10)) >= startime) === true)
            });
        }
    };
    //渲染
    componentDidMount(){
        //获取数据
        this.getData();
    }

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
            // address: '',
            timeRange: '',
            dataSource: [],
            // count: data.length,
        });
        this.getData();
    };
    //新建信息弹窗
    CreateItem = () => {
        const form = this.form;
        console.log(form);
        form.resetFields();
        this.setState({
            visibleC: true
        });
    };
    //接受新建表单数据
    saveFormRefC = (form) => {
        this.form = form;
    };
    //接受修改表单数据
    saveFormRefE = (form) => {
        this.form = form;
    };
    //填充表格行
    handleCreate = () => {
        console.log("ok");
        const { dataSource, count } = this.state;
        const form = this.form;
        form.validateFields((err, values) => {
            console.log(values);
            if (err) {
                console.log("123")
                return;
            }
            console.log('Received values of form: ', values);

            //POST
            var apiURL = "/tjpu/iot/user/user";
            var data = {
                "userId": values.userId,
                "userName": values.userName,
                "userPassword": values.userPassword,
                "userMobile": values.userMobile,
                "userCompany": values.userCompany,
                "userLocal": values.userLocal,
                "userState": values.userState,
                "userPermission": values.userPermission
            };
            var opts = {
                credentials: "include",
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            };
            fetch(apiURL, opts).then((response) => {

                response.json().then((responseJSON) => {
                    alert("增加成功!")
                    // console.log(this.state.dataSource);
                });
            }).catch((error) => {
                console.log(error);
            });

            form.resetFields();
            this.setState({
                visibleC: false,
                dataSource: [...dataSource, values],
                count: count+1,
            });
        });
    };
    //取消
    handleCancelC = () => {
        this.setState({ visibleC: false });
    };
    //取消
    handleCancelE = () => {
        this.setState({ visibleE: false });
    };
    //批量删除
    MinusClick = () => {
        const { dataSource, selectedRowKeys } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.userId)),
        });
    };
    //单个删除
    onDelete = (userId) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.userId !== userId) });

        //Delete方法
        var apiUrl = '/tjpu/iot/user/' + userId;

        //设置请求方式
        var opts = {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }
        //成功发送请求
        fetch(apiUrl, opts).then((response) => {
            //请求没有正确响应
            if (response.status !== 200) {
                throw new Error('Fail to get response with status ' + response.status);
            }
            //请求体为JSON
            response.json().then((responseJson) => {
                //对JSON的解析
                //     console.log(responseJson);
                if (responseJson.code === 204) {
                    alert("delete success!");
                } else {
                    alert("delete failed!")
                }

            }).catch((error) => {
                alert("operation failed!");
            });
        });
    };
    //点击修改
    editClick = (userId) => {
        const form = this.form;
        const { dataSource } = this.state;
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
            visibleE: true,
            tableRowKey: userId,
            isUpdate: true,
        });

    };

    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.userId = tableRowKey;
            // values.address = values.address.join(" / ");
            // values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            //PUT方法
            var apiUrl = '/tjpu/iot/user/user';
            // var data = values.put(departmentId);

            //设置请求方式
            var opts = {
                method: "PUT",
                body: JSON.stringify(values),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }
            //成功发送请求
            fetch(apiUrl, opts).then((response) => {
                //请求没有正确响应
                if (response.status !== 200) {
                    throw new Error('Fail to get response with status ' + response.status);
                }
                //请求体为JSON
                response.json().then((responseJson) => {
                    //对JSON的解析
                    //     console.log(responseJson);
                    if (responseJson.code === 201) {
                        alert("修改成功!");
                    } else {
                        alert("修改失败!")
                    }

                }).catch((error) => {
                    alert("operation failed!");
                });
            });

            form.resetFields();
            this.setState({
                visibleE: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    render(){
        const { userName, timeRange, dataSource, visibleC, visibleE, loading } = this.state;
        const questiontxt = ()=>{
            return (
                <p>
                    <Icon type="plus-circle-o" /> : Create Info<br/>
                    <Icon type="minus-circle-o" /> : Batch Delete
                </p>
            )
        };
        return(
            <div>
                <BreadcrumbCustom paths={['index','form']}/>
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="Input userName"
                                prefix={<Icon type="user" />}
                                value={userName}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            {/* <InputGroup compact>
                                <Cascader style={{ width: '100%' }} options={options} placeholder="Select Position" onChange={this.Cascader_Select} value={employeePositionName}/>
                            </InputGroup> */}
                            <Select
                                showSearch
                                style={{ width: '100%' }}
                                placeholder="Select a Department"
                                optionFilterProp="children"
                                onChange={this.handleChange}
                                // onFocus={handleFocus}
                                // onBlur={handleBlur}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="总裁">总裁</Option>
                                <Option value="开发">开发</Option>
                                <Option value="项目主管">项目主管</Option>
                            </Select>
                        </Col>
                        {/* <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>
                        </Col> */}
                    </Row>
                    <Row gutter={16}>
                        <div className='plus' onClick={this.CreateItem}>
                            <Icon type="plus-circle" />
                        </div>
                        <div className='minus'>
                            <Popconfirm title="Are you sure you want to batch delete?" onConfirm={this.MinusClick}>
                                <Icon type="minus-circle" />
                            </Popconfirm>
                        </div>
                        <div className='question'>
                            <Tooltip placement="right" title={questiontxt}>
                                <Icon type="question-circle" />
                            </Tooltip>
                        </div>
                        <div className='btnOpera'>
                            <Button type="primary" onClick={this.btnSearch_Click} style={{marginRight:'10px'}}>查询</Button>
                            <Button type="primary" onClick={this.btnClear_Click} style={{background:'#f8f8f8', color: '#108ee9'}}>重置</Button>
                        </div>
                    </Row>
                    <DFormTable
                        dataSource={dataSource}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    <DCollectionCreateForm ref={this.saveFormRefC} visible={visibleC} onCancel={this.handleCancelC} onCreate={this.handleCreate} title="创建用户" okText="创建" disabled={false} statuAble={true}/>
                    <DEditCreateForm ref={this.saveFormRefE} visible={visibleE} onCancel={this.handleCancelE} onCreate={this.handleUpdate} title="用户信息修改" okText="更新" disabled={true} statuAble={false}/>
                </div>
            </div>
        )
    }
}
