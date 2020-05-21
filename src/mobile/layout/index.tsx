import * as React from "react"
import { observer, inject } from 'mobx-react'
import { TabBar, NavBar, Icon, Toast, ActionSheet, Drawer } from 'antd-mobile'
import { Video } from './video/index'
import Badge from 'antd/es/badge'
import { Sidebar } from './sidebar'
const themeMapping = ['red.css', 'skyblue.css', 'green.css', 'cadetblue.css']
import './index.less'
@inject('Music', 'UI')
@observer
class LayoutMobile extends React.Component<any, any> {
  [x: string]: any
  setTheme = (theme) => {
    let href: any = document.querySelector('#app-theme').getAttribute('href').split('/');
    href[href.length - 1] = theme
    document.querySelector('#app-theme').setAttribute('href', href.join('/'))
    localStorage.setItem('app-theme', theme)
  }
  componentWillMount() {
    localStorage.getItem('app-theme') && this.setTheme(localStorage.getItem('app-theme'))
    const { userId } = this.props.Music.userInfo
    if (userId === '') { // 直接跳转登录页面
      location.hash = '/app-mobile/music.163.login'
    } else {
      this.props.UI.setLogin(true)
      // 查询喜欢列表
      this.props.Music.getLikeList()
    }
  }
  logOutActionSheet = () => {
    const BUTTONS = ['退出', '取消'];
    ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      message: null,
      maskClosable: true,
    }, (e) => {
      if (e === 0) {
        this.props.Music.logOut()
      }
    })
  }
  themeActionSheet = () => {
    const BUTTONS = ['经典红', '天空蓝', '原谅色', '灰度色', '取消'];
    ActionSheet.showActionSheetWithOptions({
      title: '主题设置',
      options: BUTTONS,
      message: null,
      maskClosable: true,
    }, (e) => {
      if (e < 4 && e > -1) {
        this.setTheme(themeMapping[e])
      }
    })
  }
  render() {
    const {
      appMenus,
      setAppMenu,
      loading,
      login,
      drawer,
      setDrawer
    } = this.props.UI
    const {
      userInfo: {
        avatarUrl
      }
    } = this.props.Music
    const {
      music: {
        name,
        artists,
        image,
        playing,
        progress,
        duration,
      },
      musicsCache,
      playerBefore,
      playerNext
    } = this.props.Music
    if (loading) {
      Toast.loading('加载中...')
    }
    return <Drawer
      className="my-drawer"
      style={{ minHeight: document.documentElement.clientHeight }}
      enableDragHandle
      contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
      sidebar={<Sidebar />}
      open={drawer}
      position={'right'}
      onOpenChange={() => { }}
    >

      <div className='app-mobile-layout'>
        <NavBar
          mode="dark"
          icon={
            login && avatarUrl !== '' ? <img src={`${avatarUrl}?param=100y100`} onClick={this.logOutActionSheet} />
              : <i className='iconfont icon-yonghu'></i>
          }
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
            <i className='iconfont icon-palette' onClick={this.themeActionSheet}></i>,
          ]}
        >{this.props.UI.navTitle}</NavBar>
        <div className='app-mobile-layout-content'>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="#33A3F4"
            barTintColor="white"
            hidden={false}
          >
            {
              appMenus.map((_tab, _index) => {
                return <TabBar.Item
                  key={_tab.key}
                  selected={_tab.selected}
                  badge={_tab.badge}
                  icon={<i className={'iconfont ' + _tab.icon} style={{ color: '#777676', fontSize: _tab.fontSize }}></i>}
                  selectedIcon={<i className={'iconfont ' + _tab.icon} style={{ color: 'var(--theme-color)', fontSize: _tab.fontSize }}></i>}
                  onPress={
                    () => {
                      setAppMenu(_index)
                    }
                  }
                >
                  {
                    _tab.selected && this.props.children
                  }
                </TabBar.Item>
              })
            }
          </TabBar>
        </div>

        <div className='app-mobile-layout-footer'>
          <Video />
          <div className='app-footer'>
            <div className='music-tools' style={{ width: '50%', display: 'flex', boxSizing: 'border-box' }}>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 10px' }}>
                {
                  image && <img style={{ width: 45 }} className='song-img' src={image + '?param=400y400'} />
                }
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', width: 'calc(100% - 40px)' }}>
                <div className='music-tools-name'>
                  <span style={{ fontSize: 14, color: '#545454' }} onClick={
                    () => {
                      // name && (window.location.hash = `/app/music.163.song/${id}`)
                    }
                  }>{name || '...'}</span> &nbsp;
              <span style={{ fontSize: 12 }}>{artists || '...'}</span>
                </div>
                <div>
                  <span style={{ width: 100, fontSize: 12 }}>
                    <span>
                      {Math.floor(progress / 1000 / 60).toString().padStart(2, '0')}
                      :
                  {Math.floor(progress / 1000 % 60).toString().padStart(2, '0')}
                    </span>
                    /
                <span>
                      {Math.floor(duration / 1000 / 60).toString().padStart(2, '0')}
                      :
                  {Math.floor(duration / 1000 % 60).toString().padStart(2, '0')}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className='music-tools' style={{
              width: '50%',
              justifyContent: 'space-around',
              paddingRight: 10
            }}>
              <i style={{ fontSize: 16 }} className='iconfont icon-shangyishou1' onClick={
                () => {
                  playerBefore()
                }
              }></i>
              <i style={{ fontSize: 42 }} className={playing ? 'iconfont icon-zanting2' : 'iconfont icon-video-control'} onClick={
                () => {
                  this.props.Music.setPlaying(!playing)
                }
              }></i>
              <i style={{ fontSize: 16 }} className='iconfont icon-xiayishou1' onClick={
                () => {
                  playerNext()
                }
              }></i>
              <Badge count={musicsCache.length}>
                <i className='iconfont icon-icon-' onClick={
                  () => {
                    setDrawer(true)
                  }
                }></i>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  }
}
export {
  LayoutMobile
}