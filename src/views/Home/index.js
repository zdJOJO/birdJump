import React from 'react';
import {connect} from 'react-redux';
import {port} from '../../utils'

import {
    Table, Icon, Alert, Button, Tag,
    Tabs, Upload, DatePicker,
    Form, Input, Tooltip, message,
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
message.config({
    top: 100,
    duration: 5,
});

const formatTime = (nS)=> {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}

import {
    disPatchFetchFn,
    changeStartTime, changePic, changeTab,
    showError
} from '../../actions/productAction'

import './index.less'

// status： 1正常 2未开发 3已结束


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

class CreateProductForm extends React.Component {

    constructor(props){
        super(props)
        const { changePic, changeTab } = this.props ;
        this.state = {
            passwordDirty: false,
            propssss: {
                name: 'upload',
                action: port + '/fund/file/uploadimage',
                listType: 'picture',
                beforeUpload(file){
                    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                    if (!isJPG) {
                        message.error('You can only upload JPG file!');
                    }
                    const isLt2M = file.size / 1024 / 1024 < 2;
                    if (!isLt2M) {
                        message.error('Image must smaller than 2MB!');
                    }
                    return isJPG && isLt2M;
                },
                onChange(info) {
                    console.log(info)
                    if (info.file.status !== 'uploading') {
                        console.log(info.file, info.fileList);
                        if(info.fileList.length === 0){
                            changePic('');
                        }else {
                            changePic(info.fileList[0].response.url);
                        }
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                }
            },
            collectionList: [{
                    title: '商品集合名称',
                    dataIndex: 'title',
                    key: 'title'
                }, {
                    title: '创建时间',
                    dataIndex: 'creatTime',
                    key: 'creatTime',
                    render: timeStamp => <span>{formatTime(timeStamp)}</span>,
                }, {
                    title: '是否开放',
                    dataIndex: 'status',
                    rowKey: 'status',
                    render: status =>
                        <Tag color={status===1?"#87d068":(status===2?"#blue":"#f50")}>
                            {status===1?"正常":(status===2?"未开放":"已结束")}
                        </Tag> ,
                },{
                    title: '开放时间',
                    dataIndex: 'startTime',
                    key: 'startTime',
                    render: timeStamp =><span>{formatTime(timeStamp)}</span>,
                }, {
                    title: '操作',
                    key: 'action',
                    render: (text, record) => (
                        <span>
                            <a href="#">
                                <Tooltip title="查看该商品集合下的列表详情">
                                    <Tag color="cyan"
                                         onClick={()=>{this.handleClickTab.bind(this ,3)}}
                                    ><Icon type="eye-o" /> 查看</Tag>
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
            }]
        };
    }

    componentWillMount(){
        const {disPatchFetchFn} = this.props;
        disPatchFetchFn({
            type: 2,
            page: 1
        })
    }

    handleClickTab(key){
        const {changeTab} = this.props;
        changeTab(String(key))
        console.log(key)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            disPatchFetchFn, pic, startTime
        } = this.props;
        if(!pic){
            // showError(true);
            message.error('Please add picture !!!');
            return
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                disPatchFetchFn({
                    type: 1,
                    data:{
                        pic: pic,
                        title: values.text,
                        startTime: startTime
                    }
                })
            }
        });
    }

    handleChange(date) {
        const {changeStartTime} = this.props;
        if(date){
            changeStartTime( parseInt(Date.parse(date._d)/1000, 10) )
        }
    }

    render () {
        const {goodCollectionList, currentKey} = this.props;

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
                <Tabs
                    defaultActiveKey="1"
                    activeKey={currentKey}
                >
                    <TabPane tab="商品集合列表" key="1">
                        <Button type="primary" icon="plus-square" onClick={this.handleClickTab.bind(this, 2)}>创建新商品集合</Button>
                        <Table
                            key="商品集合列表"
                            columns={this.state.collectionList}
                            dataSource={goodCollectionList}
                        />
                    </TabPane>

                    <TabPane tab="创建新商品集合" key="2">
                        <Button type="primary" icon="arrow-left" onClick={this.handleClickTab.bind(this, 1)}>返回</Button>
                        <Form onSubmit={this.handleSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      商品集合标题&nbsp;
                                      <Tooltip title="请填写商品的标题">
                                        <Icon type="info-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('text', {
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
                                    <DatePicker
                                        showTime
                                        format="YYYY-MM-DD HH:mm:ss"
                                        onChange={this.handleChange.bind(this)}
                                    />
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
                                <Upload {...this.state.propssss} className="upload-list-inline">
                                    <Button>
                                        <Icon type="upload" /> 请上传图片
                                    </Button>
                                </Upload>
                            </FormItem>


                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit" size="large">创建</Button>
                            </FormItem>
                        </Form>
                    </TabPane>

                    <TabPane tab="商品集合列表" key="3">
                        <Button type="primary" icon="plus-square" onClick={this.handleClickTab.bind(this,2)}>创建新商品</Button>
                        <Table columns={columnsTwo} dataSource={data} />
                    </TabPane>
                </Tabs>
            </div>
        )
    }
}
const  Home = Form.create()(CreateProductForm);

function mapStateToProps (state) {
    return{
        currentKey: state.productReducer.currentKey,
        goodCollectionList: state.productReducer.goodCollectionList,
        startTime: state.productReducer.createData.startTime,
        pic: state.productReducer.createData.pic,
        isShowError: state.productReducer.isShowError
    }
}

export default connect(
    mapStateToProps,
    {
        disPatchFetchFn,
        changeStartTime, changePic ,changeTab
    }
)(Home);
