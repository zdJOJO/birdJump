import React from 'react'
import { Icon, Menu } from 'antd'
import './index.less'

const SubMenu = Menu.SubMenu;

import {delCookie} from '../../utils'

export default class Header extends React.Component {

  handleClick () {
      delCookie('adminToken');
      location.hash = '#/login';
  }

  render (){
      return (
          <div className='ant-layout-header'>
              <Menu className="header-menu" onClick={this.handleClick}
                    mode="horizontal">
                  <SubMenu
                      title={<span><Icon type="user" />admin</span>}
                  >
                    <Menu.Divider />
                    <Menu.Item key="setting:3" onClick={this.handleClick.bind(this)}>退出</Menu.Item>
                  </SubMenu>
                  <Menu.Item key="mail">
                    <Icon type="question" />帮助
                  </Menu.Item>
                </Menu>
          </div>
      )
  }

}
