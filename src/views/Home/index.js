import React from 'react';
import {connect} from 'react-redux';
import Moment from 'moment'
import {port} from '../../utils'

import {
    Table, Icon, Alert, Button, Tag, Pagination,
    Tabs, Upload, DatePicker, InputNumber,
    Form, Input, Tooltip, message,
    Modal, Dropdown, Menu, Row, Col
} from 'antd';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const confirm = Modal.confirm;
message.config({
    top: 100,
    duration: 5,
});

const formatTime = (nS)=> {
    return new Date(parseInt(nS) * 1000).toLocaleString().replace(/:\d{1,2}$/,' ');
}

import {
    disPatchFetchFn,
    cleanFormData, changeStartTime, changePic, changeTab,
    setFolderId, changeEditState, changeLogoPic, lockBtn
} from '../../actions/productAction'

import './index.less'

// status： 1正常 2未开发 3已结束

class CreateProductForm extends React.Component {

    constructor(props){
        super(props)
        const {
            disPatchFetchFn, changePic, changeEditState, changeLogoPic
        } = this.props ;
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
                            changePic(info.fileList[info.fileList.length-1].response.url);
                        }
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                }
            },
            logoPicPropssss: {
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
                            changeLogoPic('');
                        }else {
                            changeLogoPic(info.fileList[info.fileList.length-1].response.url);
                        }
                    }
                    if (info.file.status === 'done') {
                        message.success(`${info.file.name} file uploaded successfully`);
                    } else if (info.file.status === 'error') {
                        message.error(`${info.file.name} file upload failed.`);
                    }
                }
            },
            collectionListColumns : [{
                    title: '商品集合名称',
                    dataIndex: 'title',
                    key: 'title',
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
                            {status===1?"正常":(status===2?(<Tooltip title="未开放">未开放</Tooltip>):"已结束")}
                        </Tag> ,
                },{
                    title: '开放时间',
                    dataIndex: 'startTime',
                    key: 'startTime',
                    render: timeStamp =><span>{formatTime(timeStamp)}</span>,
                }, {
                    title: '操作',
                    width: 2,
                    key: 'look',
                    render: (text, record) => (
                        <span>
                            <Tooltip title="查看该商品集合下的列表详情">
                                <Tag color="cyan"><Icon type="eye-o" /> 查看</Tag>
                            </Tooltip>
                            <span className="ant-divider" />
                        </span>
                    ),
                    onCellClick: (record, event)=>{
                        this.handleClickTab(3,record.id);
                        disPatchFetchFn({
                            type: 7,
                            page: 1,
                            id: record.id
                        })
                    }
                },{
                    key: 'create',
                    width: 2,
                    render: (text, record) => (
                        <span>
                            <Tooltip title="创建一个该商品集合下的一个众筹">
                                <Tag color="green-inverse"><Icon type="tag" />创建众筹</Tag>
                            </Tooltip>
                             <span className="ant-divider" />
                        </span>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event)
                        this.handleClickTab(4,record.id);
                        disPatchFetchFn({
                            type: 7,
                            page: 1,
                            id: record.id
                        })
                    }
                },{
                    key: 'edit',
                    width: 2,
                    render: (text, record) => (
                        <span>
                            <Tooltip title="编辑此商品集合">
                                <Tag color="blue-inverse"><Icon type="edit" />编辑</Tag>
                            </Tooltip>
                             <span className="ant-divider" />
                        </span>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event)
                        changeEditState(record, 1);
                        this.handleClickTab(2, -1);
                    }
                },{
                    key: 'delete',
                    width: '',
                    render: (text, record) => (
                        <span>
                            <Tooltip title="删除此商品集合">
                                  <Tag color="red-inverse"><Icon type="minus-circle" />删除</Tag>
                            </Tooltip>
                        </span>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event)
                        this.handleDelete(true, record.id)
                    }
                }
            ],
            goodListColumns: [
                {
                    title: '众筹商品名称',
                    dataIndex: 'title',
                    key: 'title'
                },
                {
                    title: '众筹商品创建时间',
                    dataIndex: 'createTime',
                    key: 'createTime',
                    render: timeStamp => <span>{formatTime(timeStamp)}</span>,
                },{
                    title: '众筹商品单价(单位: 元)',
                    dataIndex: 'price',
                    key: 'price'
                },{
                    title: '已众筹(单位: 元)',
                    dataIndex: 'fundPrice',
                    key: 'fundPrice'
                },{
                    title: '操作',
                    width: 2,
                    key: 'look',
                    render: (text, record) => (
                        <div>
                            <Tooltip title="查看该商品的众筹情况">
                                <Tag color="cyan"><Icon type="eye-o" /> 查看</Tag>
                            </Tooltip>
                            <span className="ant-divider" />
                        </div>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event)
                        disPatchFetchFn({
                            type: 9,
                            id: record.id,
                            isShowFunder: true
                        })
                    }
                },{
                    key: 'edit',
                    width: 2,
                    render: (text, record) => (
                        <span>
                                <Tooltip title="编辑此众筹商品">
                                    <Tag color="blue-inverse"><Icon type="edit" />编辑</Tag>
                                </Tooltip>
                                 <span className="ant-divider" />
                            </span>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event);
                        changeEditState(record, 2);
                        this.handleClickTab(4, '编辑')
                    }
                },{
                    key: 'delete',
                    width: '',
                    render: (text, record) => (
                        <span>
                            <Tooltip title="删除此众筹商品">
                                  <Tag color="red-inverse"
                                  >
                                      <Icon type="minus-circle" />删除
                                  </Tag>
                            </Tooltip>
                        </span>
                    ),
                    onCellClick: (record, event)=>{
                        console.log(record, event)
                        this.handleDelete(false, record.id)
                    }
                }
            ]
        };
    }

    componentWillMount(){
        const {disPatchFetchFn, lockBtn} = this.props;
        disPatchFetchFn({
            type: 2,
            page: 1
        });
        lockBtn(false)
    }

    handleClickTab(key, _id){
        const {changeTab, cleanFormData, setFolderId, changeEditState, editId} = this.props;
        console.log(key, _id)
        console.log('editId: ', editId)
        changeTab(key);

        // if(!editId){
        //     //切换tab 清空Form表单数据 和修改store中的数据
        //     this.props.form.setFieldsValue({
        //         'text': ''
        //     });
        //     cleanFormData();
        // }

        if(key===1||key===3){
            changeEditState('')
        }

        if(_id>0){     // 查看众筹列表
            setFolderId(_id)
        }else {
            if(_id !== '编辑')
                setFolderId('')
        }
    }

    handleDelete(isCollection, id){
        const {disPatchFetchFn, currentPage, goodCurrentPage} = this.props;
        confirm({
            title: '确认要删除吗？',
            content: '三思而行',
            onOk() {
                if(isCollection){
                    disPatchFetchFn({
                        type: 5,
                        id: id,
                        page: currentPage
                    })
                }else {
                    disPatchFetchFn({
                        type: 8,
                        id: id,
                        page: goodCurrentPage
                    })
                }
            },
            onCancel() {},
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            disPatchFetchFn,
            pic, startTime, editId
        } = this.props;

        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                if(!pic && !editId){
                    message.error('Please add picture !!!');
                    return
                }
                let data  = {
                    pic: pic,
                    title: values.text,
                    startTime: startTime
                }
                if(editId){
                    data.id = editId
                }
                disPatchFetchFn({
                    type: editId ? 10 : 1,
                    data: data
                })
            }
        });
    }

    handleGoodInfoSubmit = (e) => {
        e.preventDefault();
        const {
            disPatchFetchFn,
            pic, logoPic, folderId,
            editId,
        } = this.props;

        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(err, values)
            if (!err) {
                console.log('Received values of form: ', values);
                if(!pic && !editId){
                    message.error('Please add picture !!!');
                    return
                }
                let data = {
                    folderId: folderId,
                    title: values.goodTitle,
                    subtitle: values.goodSubtitle,
                    pic: pic,
                    detail: values.goodDetail,
                    price: values.price,
                    sum: values.goodNum,
                    place: values.goodPlace,
                    logoPic: logoPic
                }
                if(editId){
                    data.id = editId ;
                }

                disPatchFetchFn({
                    type: editId ? 11 : 6 ,
                    data: data
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

    handleChangePage(page, pageSize){
        console.log(page, pageSize)
        const {disPatchFetchFn} = this.props;
        disPatchFetchFn({
            type: 2,
            page: page
        })
    }

    handleChangePageGood(page, pageSize){
        console.log(page, pageSize)
        const {disPatchFetchFn, folderId} = this.props;
        disPatchFetchFn({
            type: 7,
            page: page,
            id: folderId
        })
    }

    render () {
        const {
            goodCollectionList, currentKey, isLoading, totalPage, folderId,
            goodList,goodTotalPage,
            disPatchFetchFn, isShowFunder, goodFunderList, isButtonLock,
            editId, collectionTitle, startTime,
            goodTitle, subtitle, detail, price, sum, goodPlace
        } = this.props;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 7 },
            wrapperCol: { span: 7 }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 9,
            },
        };
        const config = {
            initialValue: editId ? Moment(startTime*1000) :  Moment(0),
            rules: [{ type: 'object', required: folderId ? false : true, message: '请选择时间' }],
        };

        return (
            <div id="home">
                <Tabs
                    defaultActiveKey="1"
                    activeKey={currentKey}
                >
                    {/*商品集合 列表*/}
                    <TabPane tab="商品集合列表" key="1">
                        <Button type="primary" icon="plus-square" onClick={this.handleClickTab.bind(this, 2, -1)}>创建新商品集合</Button>
                        <Table
                            key="商品集合列表"
                            columns={this.state.collectionListColumns}
                            dataSource={goodCollectionList}
                            pagination={false}
                            loading={isLoading}
                        />
                        { totalPage>0 &&
                            <Pagination defaultCurrent={1} total={totalPage*10} onChange={this.handleChangePage.bind(this)}/>
                        }
                    </TabPane>

                    {/*创建新商品集合*/}
                    <TabPane tab={<span>创建新商品集合{ editId ? <Tag color="red">商品集合编辑中...</Tag>:''}</span>} key="2">
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
                                    initialValue: editId ? collectionTitle : "",
                                    rules: [{
                                        required: folderId ? false : true,
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
                                <Button type="primary" htmlType="submit" size="large"  loading={isButtonLock}>{editId ? '更新合集' : '创建合集'}</Button>
                            </FormItem>
                        </Form>
                    </TabPane>

                    {/*某商品集合下的产品 列表*/}
                    <TabPane tab="众筹列表" key="3">
                        <Button type="primary" icon="arrow-left" style={{margin: '0 30px 20px 0'}}
                                onClick={this.handleClickTab.bind(this, 1)}
                        >返回</Button>
                        <Table
                            key="某商品集合下的众筹列表"
                            columns={this.state.goodListColumns}
                            dataSource={goodList}
                            pagination={false}
                            loading={isLoading}
                        />
                        { goodTotalPage &&
                            <Pagination defaultCurrent={1} total={goodTotalPage*10} onChange={this.handleChangePageGood.bind(this)}/>
                        }

                        <Modal title={<span>参与该商品众筹的用户<Tag color="red">点击用户头像查看详细信息</Tag></span>} visible={isShowFunder}
                               onOk={()=>{disPatchFetchFn({type:9,isShowFunder:false})}}
                               onCancel={()=>{disPatchFetchFn({type:9,isShowFunder:false})}}
                        >
                            { goodFunderList.length>0 &&
                                goodFunderList.map((funder,index)=>{
                                    return(
                                        <div className="funder">
                                            <Dropdown
                                                overlay={
                                                    <Menu key={index}>
                                                        {
                                                            funder.userFundModels.map((user, index)=> {
                                                                return (
                                                                    <Menu.Item key={index}>
                                                                        <Row gutter={20}>
                                                                            <Col className="gutter-row" span={4}>
                                                                                <span>
                                                                                    <img className="headPic" role="presentation" src={user.userModel.headPic}/>
                                                                                </span>
                                                                            </Col>
                                                                            <Col className="gutter-row" span={10}>
                                                                               <Tag color="cyan">姓名: {user.userModel.userName}</Tag>
                                                                            </Col>
                                                                            <Col className="gutter-row" span={8}>
                                                                                <Tag color="orange">价格: ￥ { user.price}</Tag>
                                                                            </Col>
                                                                            <Col className="gutter-row" span={4}>
                                                                                <Tag color="#2db7f5">退款: { user.status===0?'未退款':
                                                                                (user.status===1?'退款中':'已退款')}</Tag>
                                                                            </Col>
                                                                        </Row>
                                                                    </Menu.Item>
                                                                )
                                                            })
                                                        }
                                                    </Menu>
                                                }
                                                trigger={['click']}
                                            >
                                                    <span className="ant-dropdown-link">
                                                        <img className="headPic" role="presentation" src={funder.headPic}/>
                                                    </span>
                                            </Dropdown>
                                            <Tag color="orange">￥ { funder.fundPrice}</Tag>
                                            { funder.status === 1 &&
                                                 <Tag color="green-inverse">成功</Tag>
                                            }
                                            { funder.status === 1 &&
                                                <div>
                                                   <p>姓名:  { funder.userModel.userName}</p>
                                                    <p>地址: { funder.userModel.address}</p>
                                                    <p> 电话:  { funder.userModel.phone}</p>
                                                </div>
                                            }
                                        </div>
                                    )
                                })
                            }
                            { goodFunderList.length===0 &&
                            <span><Icon type="frown-o" /> 暂无众筹人数</span>
                            }
                        </Modal>

                    </TabPane>

                    {/*创建某商品集合下的新产品*/}
                    <TabPane tab={<span>创建新众筹{ editId ? <Tag color="red">众筹编辑中...</Tag>:''}</span>} key="4">
                        <Button type="primary" icon="arrow-left" onClick={this.handleClickTab.bind(this, 3)}>返回</Button>
                        <Form onSubmit={this.handleGoodInfoSubmit}>
                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      众筹标题&nbsp;
                                      <Tooltip title="请填写众筹标题">
                                        <Icon type="info-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('goodTitle', {
                                    initialValue: editId ? goodTitle : "",
                                    rules: [{
                                        required: folderId,
                                        message: '请填写众筹标题',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      众筹副标题&nbsp;
                                      <Tooltip title="请填写众筹副标题">
                                        <Icon type="info-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('goodSubtitle', {
                                    initialValue: editId ? subtitle : "",
                                    rules: [{
                                        required: folderId,
                                        message: '请填写众筹副标题',
                                    }],
                                })(
                                    <Input />
                                )}
                            </FormItem>


                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      每个众筹商品的价格&nbsp;
                                      <Tooltip title="最小值1元">
                                       <Icon type="pay-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('price', {
                                    initialValue: editId ? price : 1,
                                    rules: [{
                                        required: folderId,
                                        message: '请填写每个众筹商品的价格',
                                    }],
                                })(
                                    <InputNumber min={1} max={10000000} />
                                )}
                                <span className="ant-form-text">单位: 元</span>
                            </FormItem>


                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      众筹商品的数目&nbsp;
                                      <Tooltip title="最小数目1个">
                                       <Icon type="shopping-cart" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('goodNum', {
                                    initialValue: editId ? sum : 1,
                                    rules: [{
                                        required: folderId,
                                        message: '请填写众筹商品的数目',
                                    }],
                                })(
                                    <InputNumber min={1} max={100} />
                                )}
                                <span className="ant-form-text"> 单位: 个、件</span>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      众筹描述详情&nbsp;
                                      <Tooltip title="请填写众筹描述详情">
                                        <Icon type="info-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('goodDetail', {
                                    initialValue: editId ? detail : '',
                                    rules: [{
                                        required: folderId,
                                        message: '请填写众筹描述详情',
                                    }],
                                })(
                                    <Input  type="textarea" rows={4} />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      请填写场景&nbsp;
                                      <Tooltip title="请填写场景">
                                        <Icon type="info-circle-o" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                { getFieldDecorator('goodPlace', {
                                    initialValue: editId ? goodPlace : '',
                                    rules: [{
                                        required: folderId,
                                        message: '请填写场景',
                                    }],
                                })(
                                    <Input  type="textarea" rows={2} />
                                )}
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      上传logo图片&nbsp;
                                      <Tooltip title="请上传众筹商品logo图片">
                                       <Icon type="file-jpg" />
                                      </Tooltip>
                                    </span>
                                )}
                                hasFeedback
                            >
                                <Upload {...this.state.logoPicPropssss} className="upload-list-inline">
                                    <Button>
                                        <Icon type="upload" /> 请上传商品logo
                                    </Button>
                                </Upload>
                            </FormItem>

                            <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                      上传详情大图片&nbsp;
                                      <Tooltip title="请上传商品的详情大图片">
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
                                <Button
                                    loading={isButtonLock}
                                    type="primary"
                                    htmlType="submit"
                                    size="large"
                                >
                                    {editId ? '更新众筹' : '创建众筹'}
                                </Button>
                            </FormItem>
                        </Form>
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
        totalPage: state.productReducer.totalPage,
        currentPage: state.productReducer.currentPage,

        collectionTitle: state.productReducer.createData.collectionTitle, //*
        startTime: state.productReducer.createData.startTime,  //*
        pic: state.productReducer.createData.pic,  //*

        isLoading: state.productReducer.isLoading,
        isShowError: state.productReducer.isShowError,
        isButtonLock: state.productReducer.isButtonLock,

        folderId: state.productReducer.good.folderId,
        goodList: state.productReducer.good.goodList,
        goodTotalPage: state.productReducer.good.totalPage,
        goodCurrentPage: state.productReducer.good.currentPage,
        isShowFunder: state.productReducer.good.isShowFunder,
        goodFunderList: state.productReducer.good.goodFunderList,

        editId: state.productReducer.editId, //*
        goodTitle: state.productReducer.good.info.title, //*
        subtitle: state.productReducer.good.info.subtitle, //*
        detail: state.productReducer.good.info.detail, //*
        price: state.productReducer.good.info.price, //*
        sum: state.productReducer.good.info.sum, //*
        logoPic: state.productReducer.good.logoPic,
        goodPlace:  state.productReducer.good.info.goodPlace
    }
}

export default connect(
    mapStateToProps,
    {
        disPatchFetchFn,
        cleanFormData, changeStartTime, changePic ,changeTab,
        setFolderId, changeEditState, changeLogoPic, lockBtn
    }
)(Home);
