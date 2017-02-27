import React, {PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Affix , Row, Col} from 'antd';

import NavPath from '../../components/NavPath'
import Header from '../../components/Header'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'

import './index.less';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      return(
          <div className="ant-layout-aside">
              <Sidebar />
              <div id="app" className="ant-layout-main">
                  <Header/>
                  <NavPath />
                  <div className="ant-layout-container">
                      <div className="ant-layout-content">
                          {this.props.children}
                      </div>
                  </div>
                  <Footer />
              </div>
          </div>
      )
  }
}

const mapStateToProps = (state) => {
  return {
  }
};


export default connect(
    mapStateToProps, {}
)(App);
