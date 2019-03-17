import React, {Component} from 'react';
import {Table, Icon, Popconfirm} from 'antd';

export default class AFormTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {checkChange, onDelete, editClick, dataSource, loading} = this.props;
        const rowSelection = {
            onChange: checkChange,
        };

        const columns = [
            {
                title: '编号',
                dataIndex: 'deviceId',
                // minWidth: 120,
            }, {
                title: '名称',
                dataIndex: 'deviceName',
                // minWidth: 80,
            }, {
                title: '型号',
                dataIndex: 'deviceModel',
                // minWidth: 80,
            }, {
                title: '类型',
                dataIndex: 'deviceType',
                // minWidth: 120,
            }, {
                title: '协议',
                dataIndex: 'deviceProtocol',
                // minWidth: 80,
            }, {
                title: '公司',
                dataIndex: 'deviceCompany',
                // minWidth: 80,
            }, {
                title: '运行状态',
                dataIndex: 'deviceRunState',
                // minWidth: 120,
            }, {
                title: '设备所属用户编号',
                dataIndex: 'deviceUserId',
                // minWidth: 120,
            }, {
                title: '维度',
                dataIndex: 'deviceLatitude',
                // minWidth: 120,
            }, {
                title: '经度',
                dataIndex: 'deviceLongitude',
                // minWidth: 120,
            }, {
                title: '地区',
                dataIndex: 'deviceLocal',
                // sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
                // minWidth: 120,
            }, {
                title: '状态',
                dataIndex: 'deviceState',
                // sorter: (a, b) => moment(a.accountUpdatedTime) - moment(b.accountUpdatedTime),
                // minWidth: 80,
            }, {
                title: '备注',
                dataIndex: 'deviceRemark',
                // minWidth: 150,
            }, {
                title: '操作',
                dataIndex: 'opera',
                // minWidth: 100,
                // fixed: 'right',
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
                scroll={{x: 1300}}
                className='formTable'
                loading={loading}
            />
        )
    }
}
