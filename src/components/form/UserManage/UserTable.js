import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';

export default class UserTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {onDelete, editClick, dataSource, loading} = this.props;
    const columns = [{
      title: 'ID',
      dataIndex: 'userId'
    }, {
      title: '用户姓名',
      dataIndex: 'userName'
    }, {
      title: '用户电话',
      dataIndex: 'userMobile'
    }, {
      title: '用户公司',
      dataIndex: 'userCompany'
    }, {
      title: '用户地址',
      dataIndex: 'userLocal'
    }, {
      title: '用户状态',
      dataIndex: 'userState'
    }, {
      title: '用户权限',
      dataIndex: 'userPermission'
    }, {
      title: '操作',
      dataIndex: 'opera',
      render: (text, record) =>
        <div className='opera'>
                        <span onClick={() => editClick(record.userId)}>
                            <Icon type="edit"/> 修改
                        </span><br/>
          <span><Popconfirm title="你确定要删除吗？" onConfirm={() => onDelete(record.userId)}><Icon
            type="minus-square-o"/> 删除</Popconfirm></span>
        </div>
    }];

    return (
      <Table
        columns={columns}
        pagination={{pageSize: 10}}
        dataSource={dataSource}
        bordered={true}
        scroll={{x: '1300px'}}
        className='formTable'
        loading={loading}
      />
    )
  }
}
