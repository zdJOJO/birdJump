import React,{PropTypes} from 'react'
import { connect } from 'react-redux'

import { Row, Col, Card, Table} from 'antd';


import {fetchInfo} from '../../actions/list'

import './index.less'


const dataSource = [{
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
}, {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
}];

const columns = [{
    title: '评论id',
    dataIndex: 'id',
    width: '10%',
    key: 'id'
}, {
    title: '评论时间',
    dataIndex: 'createTime',
    width: '40%',
    key: 'createTime',
}, {
    title: '评论内容',
    dataIndex: 'commentContent',
    width: '50%',
    key: 'commentContent',
}];

class Page2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount () {
        const {fetchInfo} = this.props;
        fetchInfo(0)
    }


    handleKeyUp(e, editor) {
        console.log(editor.getContent());
    }

    handleChange(e, editor) {
        console.log(editor.getContent());
    }

  render () {
      let me = this;
      const {commentList} = this.props;
          return (
              <div>
                  <Table columns={columns} dataSource={commentList} rowKey={record => record.id}/>
              </div>
          )
  }
}


function mapStateToProps(state) {
    return{
      commentList: state.list.commentList
    }
}

export default connect(
    mapStateToProps , {fetchInfo}
)(Page2)
