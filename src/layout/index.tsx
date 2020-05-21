import * as React from "react"
import { observer, inject } from 'mobx-react'
import { Sider } from './sider/index'
import { Content } from './content/index'
import { Footer } from './footer/index'
import { Header } from './header/index1'
import { Login } from './login/index'
import { MusicInfo } from './music-info/index'
import { Loading } from 'react-ryui'
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
      <Loading loading={loading}>
        { !isFullScreen && <Header /> }
        {
          isFullScreen && <div className='app-layout-detail' style={{
            filter: loading ? 'blur(2px)' : 'blur(0px)'
          }}>
            <MusicInfo />
          </div>
        }
        <div className='app-layout' style={{
          display: isFullScreen ? 'none' : 'flex'
        }}>
          <Sider />
          <Content children={this.props.children} />
        </div>
        <Footer />
      </Loading>
      <Login />
    </div>
  }
}
export {
  Layout
}
