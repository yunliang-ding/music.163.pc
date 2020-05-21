import * as React from "react"
import { observer, inject } from 'mobx-react'
import { InputItem, List, NavBar, Icon, Button, Toast, ActionSheet } from 'antd-mobile'
import './pages.less'
const themeMapping = ['red.css', 'skyblue.css', 'green.css', 'cadetblue.css']
@inject('UI', 'Music')
@observer
class Login extends React.Component<any, any> {
  [x: string]: any
  setTheme = (theme) => {
    let href: any = document.querySelector('#app-theme').getAttribute('href').split('/');
    href[href.length - 1] = theme
    document.querySelector('#app-theme').setAttribute('href', href.join('/'))
    localStorage.setItem('app-theme', theme)
  }
  themeActionSheet = () => {
    const BUTTONS = ['经典红', '天空蓝', '原谅色', '灰度色', '取消'];
    ActionSheet.showActionSheetWithOptions({
      title: '主题设置',
      options: BUTTONS,
      message: null,
      maskClosable: true,
    }, (e) => {
      if (e < 4) {
        this.setTheme(themeMapping[e])
      }
    })
  }
  render() {
    const {
      loginWay,
      setLoginWay,
      userInfo: {
        username,
        password
      },
      setUserInfo
    } = this.props.UI
    const {
      login
    } = this.props.Music
    return <div>
      <NavBar
        mode="dark"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[
          <i className='iconfont icon-palette' onClick={this.themeActionSheet}></i>
        ]}
      >网易云音乐账号</NavBar>
      <div className='app-mobile-login'>
        <div className='app-monile-login-logo'> 
          <i className='iconfont icon-wangyiyunyinle'></i>
        </div>
        <div className='app-login-form'>
          <List>
            <InputItem
              type={loginWay === 1 ? 'text' : 'phone'}
              value={username}
              placeholder={loginWay === 1 ? '输入邮箱' : '输入手机号'}
              clear
              onChange={
                (username) => {
                  setUserInfo('username', username)
                }
              }
            >
              {loginWay === 1 ? '邮箱' : '手机号'}
            </InputItem>
            <InputItem
              type='password'
              value={password}
              placeholder='输入密码'
              clear
              onChange={
                (password) => {
                  setUserInfo('password', password)
                }
              }
            >
              密码
            </InputItem>
          </List>
        </div>
        <div className='app-login-type'>
          <div className='app-login-type-item'>
            <span style={{ opacity: loginWay === 1 ? 1 : 0.4 }} onClick={
              () => {
                setLoginWay(1)
              }
            }><i className='iconfont icon-youxiang'></i></span>
          </div>
          <div className='app-login-type-item'>
            <span style={{ opacity: loginWay === 2 ? 1 : 0.4 }} onClick={
              () => {
                setLoginWay(2)
              }
            }><i className='iconfont icon-shouji'></i></span>
          </div>
        </div>
        <div className='app-login-footer'>
          <Button type="primary" onClick={
            async () => {
              Toast.loading('登录中...')
              const res = await login(username, password, loginWay)
              if (res === true) {
                Toast.success('登录成功')
                setTimeout(() => {
                  location.hash = '/app-mobile/music.163.mrtj'
                }, 1000)
              }
            }
          }>登录</Button>
        </div>
      </div>
    </div>
  }
}
export {
  Login
}