import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
// import axios from 'axios';
// import address from './request/address';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class DEditForm extends Component{
    state = {
        autoCompleteResult: [],
        confirmDirty: false,
    };
    constructor(props){
        super(props);
    }

    render(){
        const { visible, onCancel, onCreate, form, okText, title, disabled, statuAble } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };

        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
            >
                <Form layout="horizontal">
                    <FormItem label="编号" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userId', {
                            rules: [{ required: true, len: 6, message: '用户编号有误' }],
                        })(
                            <Input disabled={disabled}/>
                        )}
                    </FormItem>
                    <FormItem label="姓名" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户姓名' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="手机号" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userMobile', {
                            rules: [{ required: true,len:11, message: '输入的手机号有误' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="公司" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userCompany', {
                            rules: [{ required: true, message: '请输入公司名称' }],
                        })(
                            // <Select placeholder="Please select a position"
                            //         onMouseEnter={this.fetchPosition}
                            // >

                            //     {positionData.map(d => <Option key={d.value}>{d.text}</Option>)}
                            // </Select>
                            <Select
                                placeholder={"请选择用户公司"}    
                            >
                            <Option value="天津工业大学">天津工业大学</Option>
                            <Option value="天津市大学软件学院">天津市大学软件学院</Option>
                            <Option value="天津大学">天津大学</Option>
                        </Select>
                        )}
                    </FormItem>
                    <FormItem label="地址" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userLocal', {
                            rules: [{ required: true, message: '请输入用户地址' }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem label="状态" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userState', {
                            initialValue: "离线",
                            rules: [{ required: true, message: '请输入用户状态' }],
                        })(
                        <Select
                                placeholder={"请输入用户状态"} disabled={statuAble}
                            >
                            <Option value="离线">离线</Option>
                            <Option value="在线">在线</Option>
                        </Select>
                        )}
                    </FormItem>

                    <FormItem label="权限" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('userPermission', {
                            initialValue: "普通用户",
                            rules: [{ required: true, message: '请输入用户权限' }],
                        })(
                        <Select
                                placeholder="请选择用户权限"    
                            >
                            <Option value="管理员">管理员</Option>
                            <Option value="普通用户">普通用户</Option>
                        </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

const DEditCreateForm = Form.create()(DEditForm);
export default DEditCreateForm;
