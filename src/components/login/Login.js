import React, {Component} from 'react';
import {Form, Icon, Input, Button, message, Spin} from 'antd';
import '../../style/login.less';

const FormItem = Form.Item;

class NormalLoginForm extends Component {
  state = {
    isLoading: false,
  };
  handleSubmit = (e) => {
    //阻止默认跳转
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.state.msg = values;
        const apiUrl = `tjpu/iot/user/login`;
        let opts = {
          method: "POST",
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
            if (responseBody.code === 200) {
              this.setState({
                isLoading: true,
              });
              let responseData = responseBody.data;
              localStorage.setItem('userInfo', JSON.stringify(responseData));
              message.success('登录成功！');
              this.props.history.push({pathname: '/app', state: values});
            } else {
              message.error(responseBody.message);
            }
          }).catch((error) => {
            message.error("登录失败！");
          });
        }).catch((error) => {
          message.error("登录失败！");
        });
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      this.state.isLoding ? <Spin size="large" className="loading"/> :
        <div className="login">
          <div className="login-form">
            <div className="login-logo">
              <div className="login-name">工翼物联</div>
            </div>
            <Form onSubmit={this.handleSubmit} style={{maxWidth: '300px'}}>
              <FormItem>
                {getFieldDecorator('username', {
                  rules: [{required: true, message: '请输入用户名！'}],
                })(
                  <Input prefix={<Icon type="user" style={{fontSize: 13}}/>}
                         placeholder="用户名"/>
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{required: true, message: '请输入密码！'}],
                })(
                  <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password"
                         placeholder="密码"/>
                )}
              </FormItem>
              <FormItem style={{marginBottom: '0'}}>
                <Button type="primary" htmlType="submit" className="login-form-button"
                        style={{width: '100%'}}>
                  登录
                </Button>
              </FormItem>
            </Form>
          </div>
        </div>
    );
  }
}

const Login = Form.create()(NormalLoginForm);
export default Login;
