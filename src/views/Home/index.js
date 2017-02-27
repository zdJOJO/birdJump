import React from 'react'
import {
    Table, Icon, Alert, Button, Tag,
    Tabs, Upload, DatePicker, TimePicker,
    Form, Input, Tooltip, Select,
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const Option = Select.Option;

import './index.less'

//假数据
const columns = [{
    title: '商品集合名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#">
                <Tooltip title="查看该商品集合列表详情">
                    <Tag color="cyan"><Icon type="eye-o" /> 查看</Tag>
                </Tooltip>
            </a>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
                <Tooltip title="创建一个新商品集合">
                     <Tag color="green-inverse"><Icon type="tag" />创建</Tag>
                </Tooltip>
            </a>
            <span className="ant-divider" />
            <a href="#">
                <Tooltip title="编辑此商品集合">
                    <Tag color="blue-inverse"><Icon type="edit" />编辑</Tag>
                </Tooltip>
            </a>
             <span className="ant-divider" />
            <a href="#">
                <Tooltip title="删除此商品集合">
                    <Tag color="red-inverse"><Icon type="minus-circle" />删除</Tag>
                </Tooltip>
            </a>
        </span>
    ),
}];


const columnsTwo = [{
    title: '商品集合名称',
    dataIndex: 'bigName',
    key: 'bigName',
}, {
    title: '商品标题',
    dataIndex: 'name',
    key: 'name',
    render: text => <a href="#">{text}</a>,
}, {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
}, {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
}, {
    title: '操作',
    key: 'action',
    render: (text, record) => (
        <span>
            <a href="#">
                <Tooltip title="查看该商品详情">
                    <Tag color="cyan"><Icon type="eye-o" /> 查看</Tag>
                </Tooltip>
            </a>
            <span className="ant-divider" />
            <a href="#" className="ant-dropdown-link">
                <Tooltip title="创建一个新商品">
                     <Tag color="green-inverse"><Icon type="tag" />创建</Tag>
                </Tooltip>
            </a>
            <span className="ant-divider" />
            <a href="#">
                <Tooltip title="编辑此商品">
                    <Tag color="blue-inverse"><Icon type="edit" />编辑</Tag>
                </Tooltip>
            </a>
             <span className="ant-divider" />
            <a href="#">
                <Tooltip title="删除此商品">
                    <Tag color="red-inverse"><Icon type="minus-circle" />删除</Tag>
                </Tooltip>
            </a>
        </span>
    ),
}];

const data = [{
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
}, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
}, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
}];

const propssss = {
    action: '/upload.do',
    listType: 'picture',
    defaultFileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }, {
        uid: -2,
        name: 'yyy.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
};


class CreateProductForm extends React.Component {
    state = {
        passwordDirty: false,
    };

    handleChangeTab(key){
        console.log(key);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 7 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 9,
            },
        };
        const config = {
            rules: [{ type: 'object', required: true, message: '请选择时间' }],
        };
        return (
            <div id="home">
                <Tabs defaultActiveKey="1" onChange={this.handleChangeTab}>
                    <TabPane tab="商品集合列表" key="1">
                        <Button type="primary" icon="plus-square" onChange={this.handleChangeTab}>创建新商品集合</Button>
                        <Table columns={columns} dataSource={data} />
                    </TabPane>

                    <TabPane tab="创建新商品集合" key="2">
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      商品集合标题&nbsp;
                                      <Tooltip title="请填写商品的标题">
                                        <Icon type="info-circle" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('email', {
                                    rules: [{
                                        required: true,
                                        message: '请填写商品集合的标题',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      开放时间&nbsp;
                                      <Tooltip title="请选择开放时间">
                                        <Icon type="calendar" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                {getFieldDecorator('date-time-picker', config)(
                                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                                )}
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      上传图片&nbsp;
                                      <Tooltip title="请上传商品集合的图片">
                                       <Icon type="file-jpg" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                <Upload {...propssss}>
                                    <Button>
                                        <Icon type="upload" /> upload
                                    </Button>
                                </Upload>
                            </FormItem>
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" size="large">创建</Button>
                            </FormItem>
                        </Form>
                    </TabPane>

                    <TabPane tab="商品集合列表" key="3">
                        <Button type="primary" icon="plus-square" onChange={this.handleChangeTab}>创建新商品</Button>
                        <Table columns={columnsTwo} dataSource={data} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const  Home = Form.create()(CreateProductForm);

export default Home;
