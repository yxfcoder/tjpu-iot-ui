import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class DFormTable extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        const {checkChange, onDelete, editClick, dataSource, loading} = this.props;
        const rowSelection = {
            onChange: checkChange,
            // getCheckboxProps: record => ({
            //     disabled: record.employeeName === 'Disabled User', // Column configuration not to be checked
            // }),
        };
        // const columns = EColumns.employeeColumns;
        // console.log(columns);

        const columns = [{
            title: 'ID',
            dataIndex: 'userId',
            width: 80,
        }, {
            title: '用户姓名',
            dataIndex: 'userName',
            width: 120,
        }, {
            title: '用户电话',
            dataIndex: 'userMobile',
            width: 80,
        }, {
            title: '用户公司',
            dataIndex: 'userCompany',
            width: 150,
        }, {
            title: '用户地址',
            dataIndex: 'userLocal',
            width: 150,
        }, {
            title: '用户状态',
            dataIndex: 'userState',
            width: 120,
        }, {
            title: '用户权限',
            dataIndex: 'userPermission',
            width: 80,
        }, {
            title: '操作',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.userId)}>
                            <Icon type="edit"/> 修改
                        </span><br/>
                    <span><Popconfirm title="你确定要删除吗？" onConfirm={() => onDelete(record.userId)}><Icon
                        type="minus-square-o"/> 删除 </Popconfirm></span>
                </div>
        }];

        return (
            <Table
                rowSelection={rowSelection}
                columns={columns}
                //分页，传入每页的条数
                pagination={{pageSize: 9}}
                dataSource={dataSource}
                bordered={true}
                scroll={{x: '100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}