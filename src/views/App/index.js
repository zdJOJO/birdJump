import React, {PropTypes} from 'react';

import NavPath from '../../components/NavPath'
import Header from '../../components/Header/index'
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

export default App
