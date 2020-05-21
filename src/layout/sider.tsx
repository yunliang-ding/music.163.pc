import * as React from "react"
import { observer, inject } from 'mobx-react'
import Menu from 'antd/es/menu'
import Dropdown from 'antd/es/dropdown'
import './index.less'
@inject('UI', 'Music')
@observer
class Sider extends React.Component<any, any> {
  [x: string]: any
  render() {
    const {
      menus,
      setSelected,
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
    return <div className='app-sider'>
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
        {
          menus.map((_menu, _index) => {
            return <div className='sider-menu-item' key={_menu.key}>
              <span>{_menu.label}</span>
              {
                _menu.subMenu.map((_subMenu, __index) => {
                  return <div 
                    className={_subMenu.selected ? 'sider-menu-sub-item-active' : 'sider-menu-sub-item'} 
                    key={_subMenu.router}
                    onClick={
                      () => {
                        window.location.hash = _subMenu.router
                        setSelected(_index, __index)
                      }
                    }
                  >
                  <i className={`iconfont ${_subMenu.icon}`}></i>
                  <div>{_subMenu.label}</div>
                  {
                    _subMenu.selected && <i className='iconfont icon-shengyin' style={{color: 'var(--theme-color)' }}></i>
                  }
                </div>
                })
              }
            </div>
          })
        }
      </div>
    </div>
  }
}
export {
  Sider
}
