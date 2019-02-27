import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';
import moment from 'moment';

export default class AFormTable extends Component {
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

        const columns = [{
            title: '编号',
            dataIndex: 'deviceId',
            width: 80,
        }, {
            title: '名称',
            dataIndex: 'deviceName',
            width: 80,
        }, {
            title: '模式',
            dataIndex: 'deviceModel',
            width: 80,
        },{
            title: '类型',
            dataIndex: 'deviceType',
            width: 120,
        }, {
            title: ' ',
            dataIndex: 'deviceProtocol',
            width: 80,
        }, {
            title: '公司',
            dataIndex: 'deviceCompany',
            width: 80,
        },{
            title: '运行状态',
            dataIndex: 'deviceRunState',
            width: 120,
        }, {
            title: ' ',
            dataIndex: 'deviceLatitude',
            width: 150,
        }, {
            title: ' ',
            dataIndex: 'deviceLongitude',
            width: 120,
        }, {
            title: '地区',
            dataIndex: 'deviceLocal',
            sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
            width: 120,
        }, {
            title: '状态',
            dataIndex: 'deviceState',
            sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
            width: 80,
        }, {
            title: '备注',
            dataIndex: 'deviceRemark',
            width: 150,
        }, {
            title: '操作',
            dataIndex: 'opera',
            width: 100,
            render: (text, record) =>
                <div className='opera'>
                        <span onClick={() => editClick(record.accountId)}>
                            <Icon type="edit"/> 修改
                        </span><br/>
                    <span><Popconfirm title="确定要删除吗？" onConfirm={() => onDelete(record.accountId)}><Icon
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