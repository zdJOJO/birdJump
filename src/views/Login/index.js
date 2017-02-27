import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
    Form, Icon, Input, Button, Checkbox,
    Layout,
    Row, Col,
    Alert
} from 'antd';
const { Header, Footer, Content } = Layout;
const FormItem = Form.Item;

import {getCookie} from '../../utils/index';
import {disPatchFetchData} from '../../actions/loginAction'
import './index.less'

class NormalLoginForm  extends React.Component {
    constructor (props) {
        super(props)
    }

    componentWillMount(){
        if(getCookie('adminToken')){
            location.hash = '#/home';
        }
    }

    handleSubmit(e){
        e.preventDefault();
        const { disPatchFetchData } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                disPatchFetchData(values)
            }
        });
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const {loginFail} = this.props;
        return (
            <Layout>
                { loginFail &&
                <Alert
                    message="Error"
                    description="登陆失败"
                    type="error"
                    showIcon
                    closable
                />
                }
                <div id="login">
                    <Header/>
                    <Content>
                        <Row>
                            <Col lg={{ span: 8, offset: 2 }} md={{ span: 8, offset: 3 }} />
                            <Col className="loginBox" lg={{ span: 5, offset: 5 }} md={{ span: 9, offset: 2 }}>
                                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                                    <FormItem>
                                        {getFieldDecorator('userName', {
                                            rules: [{ required: true, message: 'Please input your username!' }],
                                        })(
                                            <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('password', {
                                            rules: [{ required: true, message: 'Please input your Password!' }],
                                        })(
                                            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                                        )}
                                    </FormItem>
                                    <FormItem>
                                        {getFieldDecorator('remember', {
                                            valuePropName: 'checked',
                                            initialValue: true,
                                        })(
                                            <Checkbox>Remember me</Checkbox>
                                        )}
                                        <Button type="primary" htmlType="submit" className="login-form-button">Log in</Button>
                                    </FormItem>
                                </Form>
                            </Col>
                        </Row>
                    </Content>
                    <Footer>Copyright © 2009 - 2017 MAHAYANA MEDIA. All Rights Reserved.千乘影视股份有限公司 版权所有</Footer>
                </div>
            </Layout>
        )
    }
}

const Login = Form.create()(NormalLoginForm);


function mapStateToProps(state) {
  return {
      loginFail: state.user.loginFail
  }
}

export default connect(
    mapStateToProps, { disPatchFetchData }
)(Login)
