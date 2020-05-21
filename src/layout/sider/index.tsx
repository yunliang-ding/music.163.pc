import * as React from "react"
import { observer, inject } from 'mobx-react'
import Menu from 'antd/es/menu'
import Dropdown from 'antd/es/dropdown'
import { Nav } from 'react-ryui'
import './index.less'
@inject('UI', 'Music')
@observer
class Sider extends React.Component<any, any> {
  [x: string]: any
  render() {
    const {
      menus,
      login,
      setLoginModel
    } = this.props.UI
    const {
      userInfo: {
        nickname,
        avatarUrl,
      },
      logOut
    } = this.props.Music
    const menu = <Menu>
      <Menu.Item onClick={logOut}>
        <span>退出登录</span>
      </Menu.Item>
    </Menu>
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-sider${theme}`}>
      <div className='sider-header'>
        { avatarUrl ? <img src={avatarUrl} /> : <i className='iconfont icon-yonghu'></i> }
        <span>{nickname === '' ? '未登录' : nickname}</span>
        {
          login ? <Dropdown overlay={menu}>
            <i className='iconfont icon-arrow-left-copy'></i>
          </Dropdown> : <i className='iconfont icon-arrow-left-copy' onClick={
            () => {
              setLoginModel(true)
            }
          }></i>
        }
      </div>
      <div className='sider-menu'>
        <Nav
          dark={this.props.UI.theme === 'dark'}
          style={{ width: 200, height: '100%' }}
          model="menu"
          navList={menus}
          menuClick={
            (openkey, selectKey) => {
              window.location.hash = selectKey[0]
            }
          }
          openKey={['1', '2', '3']}
        />
      </div>
    </div>
  }
}
export {
  Sider
}
