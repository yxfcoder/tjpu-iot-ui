import React, { Component } from 'react';
import { Modal, Form, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class ACustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
        data: [],
        fetching: false,
        value: []
    };
    constructor(props){
        super(props);

        // this.fetchAccountEmployeeNickname = this.fetchAccountEmployeeNickname.bind(this);
    }

    //get accountEmployeeNickname
    // fetchAccountEmployeeNickname = (value) => {

    //     this.setState({ data: [], fetching: true });
    //     //成功发送请求
    //     fetch(`/sm/employee/employeeNickname`).then((response) => {
    //         //请求没有正确响应
    //         if (response.status !== 200) {
    //             throw new Error('Fail to get response with status ' + response.status);
    //         }
    //         //请求体为JSON
    //         response.json().then((responseJson) => {

    //             const data = [];
    //             // console.log(responseJson.data);
    //             for (let k of Object.keys(responseJson.data)) {

    //                 data.push({
    //                     value: responseJson.data[k],
    //                     text: k
    //                 })
    //             }
    //             this.setState({ data, fetching: false });
    //         });
    //     });

    // };

    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { fetching, data, value } = this.state;
        const FormItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 11 },
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
                        {getFieldDecorator('deviceId', {
                            rules: [{ required: true, len:6, message: '设备编号有误' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="名称" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceName', {
                            rules: [{ required: true, message: '请填写设备名称' }],
                        })(
                            <input/>
                        )}
                    </FormItem>
                    <FormItem label="型号" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceModel', {
                            rules: [{ required: true, message: '请输入设备型号' }],
                        })(
                            // <Select>
                            //     <options value="D001">D001</options>
                            //     <options value="D002">D002</options>
                            // </Select>
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="类型" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceType', {
                            rules: [{ required: true, message: '请填写设备类型' }],
                        })(
                            <input/>
                        )}
                    </FormItem>
                    <FormItem label="设备协议" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceProtocol', {
                            rules: [{ required: true, message: '请选择设备协议' }],
                        })(
                            <Select>
                                <options value="TCP">TCP</options>
                                <options value="UDP">UDP</options>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="公司" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceCompany', {
                            rules: [{ required: true, message: '请填写设备所属公司' }],
                        })(
                            <Select
                            placeholder={"请选择设备所属公司"}    
                                >
                                <Option value="天津工业大学">天津工业大学</Option>
                                <Option value="天津大学">天津大学</Option>
                                <Option value="天津市大学软件学院">天津市大学软件学院</Option>
                            </Select>
                        )}
                    </FormItem>

                    <FormItem label="设备纬度" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceLatitude', {
                            rules: [{ required: true, message: '请输入设备纬度' }],
                        })(
                            <input/>
                        )}
                    </FormItem>
                    <FormItem label="设备经度" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceLongitude', {
                            rules: [{ required: true, message: '请输入设备经度' }],
                        })(
                            <Input />
                        )}
                    </FormItem>

                    <FormItem label="地区" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceLocal', {
                            rules: [{ required: true, message: '请填写地区名称' }],
                        })(
                            <input/>
                        )}
                    </FormItem>
                    <FormItem label="备注" {...FormItemLayout} hasFeedback>
                        {getFieldDecorator('deviceRemark', {
                            rules: [{ required: true, message: '请填写备注信息' }],
                        })(
                            <input/>
                        )}
                    </FormItem>

                </Form>
            </Modal>
        );
    }
}

const ACollectionCreateForm = Form.create()(ACustomizedForm);
export default ACollectionCreateForm;
