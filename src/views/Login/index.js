import React, { PropTypes } from 'react'
import { connect } from 'react-redux'


import {
    Form, Icon, Input, Button, Checkbox,
    Layout,
    Row, Col
} from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;

import './index.less'

class NormalLoginForm  extends React.Component {

  constructor (props) {
    super(props)
  }

  handleSubmit(e){
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          if (!err) {
              console.log('Received values of form: ', values);
          }
      });
  }

  render () {
      const { getFieldDecorator } = this.props.form;
      return (
          <Layout>
              <div id="login">
                  <Header></Header>
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
                                      <Button type="primary" htmlType="submit" className="login-form-button">
                                          Log in
                                      </Button>
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
      state
  }
}

export default connect(
    mapStateToProps
)(Login)
