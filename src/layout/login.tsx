import * as React from "react"
import { observer, inject } from 'mobx-react'
import Modal from 'antd/es/modal'
import Input from 'antd/es/input'
import './index.less'
@inject('UI', 'Music')
@observer
class Login extends React.Component<any, any> {
  [x: string]: any
  render() {
    const {
      loginModel,
      loginWay,
      setLoginModel,
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
    return <Modal
      title={loginWay === 1 ? '邮箱登录' : '手机号登录'}
      wrapClassName='app-login'
      mask={false}
      visible={loginModel}
      okText='登录'
      cancelText='取消'
      getContainer={() => document.querySelector('#root') }
      onOk={
        () => {
         login(username, password, loginWay)
        }
      }
      onCancel={
        () => {
          setLoginModel(false)
        }
      }
    >
      <div className='app-login-form'>
        <Input 
          addonBefore={<i className={`iconfont ${loginWay === 1 ? 'icon-youxiang' : 'icon-shouji'}`}></i>}
          placeholder={loginWay === 1 ? '输入邮箱' : '输入手机号'}
          value={username}
          onChange={
            (e:any) => {
              setUserInfo('username', e.target.value)
            }
          }
        />
        <Input 
          type='password'
          addonBefore={<i className='iconfont icon-mima'></i>}
          placeholder='输入密码'
          value={password}
          onChange={
            (e:any) => {
              setUserInfo('password', e.target.value)
            }
          }
        />
      </div>
      <div className='app-login-footer'>
        <span style={{opacity: loginWay === 1 ? 1 : 0.6}} onClick={
          () => {
            setLoginWay(1)
          }
        }><i className='iconfont icon-youxiang'></i></span>
        <span style={{opacity: loginWay === 2 ? 1 : 0.6}} onClick={
          () => {
            setLoginWay(2)
          }
        }><i className='iconfont icon-shouji'></i></span>
      </div>
    </Modal>
  }
}
export {
  Login
}
