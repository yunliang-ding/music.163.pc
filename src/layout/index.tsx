import * as React from "react"
import { observer, inject } from 'mobx-react'
import { Sider } from './sider'
import { Content } from './content'
import { Footer } from './footer/index'
import { Header } from './header'
import { Login } from './login'
import { MusicInfo } from './musicinfo'
import Spin from 'antd/es/spin'
import Icon from 'antd/es/icon'
import './index.less'
@inject('UI', 'Music')
@observer
class Layout extends React.Component<any, any> {
  [x: string]: any
  init = async () => {
    const { userId } = this.props.Music.userInfo
    if(userId !== ''){
      const { playlist, userId } = await this.props.Music.queryUserPlayList()
      this.props.UI.updateMenus(playlist, userId)
      this.props.UI.addUserMenus()
      this.props.UI.setLogin(true)
      this.props.Music.getLikeList()
    }
  }
  componentWillMount() {
    this.init()
  }
  render() {
    const {
      loading,
      isFullScreen,
      setIsFullScreen
    } = this.props.UI
    const {
      musicsCache,
      music:{
        image
      }
    } = this.props.Music
    return <div className='app'>
      {
        musicsCache.length > 0 && <span className='app-screen-btn' onClick={() => setIsFullScreen(!isFullScreen)}>
          <i className={`iconfont icon-youjiantoushixinxiao ${isFullScreen ? ' btn-top-inner' : ' btn-top-out'}`}></i>
          <i className={`iconfont icon-youjiantoushixinxiao ${isFullScreen ? ' btn-bottom-inner' : ' btn-bottom-out'}`}></i>
        </span>
      }
      {
        isFullScreen && <img className='app-image' src={`${image}?param=600y600`} />
      }
      <Spin spinning={loading} indicator={<Icon type="loading" style={{ fontSize: 24 }} />}>
        { !isFullScreen && <Header /> }
        {
          isFullScreen && <div className='app-layout-detail' style={{
            filter: loading ? 'blur(2px)' : 'blur(0px)'
          }}>
            <MusicInfo />
          </div>
        }
        <div className='app-layout' style={{
          filter: loading ? 'blur(2px)' : 'blur(0px)',
          display: isFullScreen ? 'none' : 'flex'
        }}>
          <Sider />
          <Content children={this.props.children} />
        </div>
        <Footer />
      </Spin>
      <Login />
    </div>
  }
}
export {
  Layout
}
