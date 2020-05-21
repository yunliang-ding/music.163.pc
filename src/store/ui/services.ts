import { injectable } from 'inversify'
import 'reflect-metadata'
import { UiInterface } from './type';
import { observable, action } from 'mobx'
@injectable()
class UiServices implements UiInterface {
  @observable navTitle = '网易云音乐'
  @observable isDark = true
  @action setNavTitle = (navTitle: string) => {
    this.navTitle = navTitle
  }
  @observable loading = false
  @action setLoading = (loading: boolean) => {
    this.loading = loading
  }
  @observable drawer = false
  @action setDrawer = (drawer: boolean) => {
    this.drawer = drawer
  }
  @observable login = false
  @action setLogin = (login: boolean) => {
    this.login = login
  }
  @observable loginModel = false
  @action setLoginModel = (loginModel: boolean) => {
    this.loginModel = loginModel
  }
  @observable loginWay = 1 // 1邮箱 2 手机
  @action setLoginWay = (loginWay: number) => {
    this.loginWay = loginWay
  }
  @observable userInfo = {
    username: '',
    password: ''
  }
  @action setUserInfo = (_key, _value) => {
    this.userInfo[_key] = _value
  }
  @observable isFullScreen = false
  @action setIsFullScreen = (isFullScreen: any) => {
    this.isFullScreen = isFullScreen
  }
  @observable collapsed = false
  @observable plyerRecord = false
  @observable hiddenBar = false
  @observable collectionModel = {
    visable: false,
    musicId: ''
  }
  @action setCollapsed = (collapsed: any) => {
    this.collapsed = collapsed
  }
  @action setHiddenBar = (hiddenBar: boolean) => {
    this.hiddenBar = hiddenBar
  }
  @action setCollectionModel = (_key: any, _value: any) => {
    this.collectionModel[_key] = _value
  }
  @action setPlyerRecord = (plyerRecord: boolean) => {
    this.plyerRecord = plyerRecord
  }
  @observable menus = [{
    label: '发现音乐',
    key: '/app/music.163.discovery',
    icon: 'iconfont icon-wangyiyunyinle',
    selected: true
  }, {
    label: '私人FM',
    key: '/app/music.163.fm',
    icon: 'iconfont icon-FM',
    selected: false
  }, {
    label: '视频',
    key: '/app/music.163.video',
    icon: 'iconfont icon-shipin1',
    selected: false
  }, {
    label: '朋友',
    key: '/app/music.163.friends',
    icon: 'iconfont icon-pengyou',
    selected: false
  }, {
    label: '我的音乐',
    key: '1',
    subMenu: []
  }, {
    label: '创建的歌单',
    key: '2',
    subMenu: []
  }, {
    label: '收藏的歌单',
    key: '3',
    subMenu: []
  }]
  @action setSelected = (_index, __index) => {
    this.menus.forEach(_item => {
      _item.subMenu.forEach(__item => {
        __item.selected = false
      })
    })
    this.menus[_index].subMenu[__index].selected = true
  }
  @action addUserMenus = () => {
    this.menus[4].subMenu = [{
      label: '每日推荐',
      key: '/app/music.163.recommend',
      icon: 'iconfont icon-tuijian',
      selected: false
    }, {
      label: '播放记录',
      key: '/app/music.163.record',
      icon: 'iconfont icon-history',
      selected: false
    }, {
      label: '喜欢的歌',
      key: '/app/music.163.liked',
      icon: 'iconfont icon-xihuan',
      selected: false
    }]
  }
  @action removeUserMenus = () => {
    this.menus[1].subMenu = []
    this.menus[2].subMenu = []
    this.menus[3].subMenu = []
  }
  @action updateMenus = (playlist, userId) => {
    playlist.forEach(_item => {
      if (_item.userId === userId) {
        this.menus[5].subMenu.push({
          label: _item.name,
          key: `/app/music.163.playlist/${_item.id}`,
          icon: 'iconfont icon-gedan',
          selected: false
        })
      } else {
        this.menus[6].subMenu.push({
          label: _item.name,
          key: `/app/music.163.playlist/${_item.id}`,
          icon: 'iconfont icon-gedan',
          selected: false
        })
      }
    })
  }
  /**
    主题
  */
  @observable theme = 'dark'
  @observable themes = [{
    value: 'cadetblue',
    label: '浅蓝色'
  }, {
    value: 'green',
    label: '浅绿色'
  }, {
    value: 'red',
    label: '经典红'
  }, {
    value: 'skyblue',
    label: '天空蓝'
  }, {
    value: 'dark',
    label: '黑色'
  }]
  @action setTheme = (theme: string) => {
    let href: any = document.querySelector('#app-theme').getAttribute('href').split('/');
    href[href.length - 1] = theme + '.css'
    document.querySelector('#app-theme').setAttribute('href', href.join('/'))
    this.theme = theme
  }
}
export {
  UiServices
}