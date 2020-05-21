import { injectable } from 'inversify'
import 'reflect-metadata'
import { UiInterface } from './type';
import { observable, action } from 'mobx'
@injectable()
class UiServices implements UiInterface {
  @observable navTitle = '网易云音乐'
  @action setNavTitle = (navTitle:string) => {
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
    label: '',
    key: Math.random(),
    subMenu: [{
      label: '发现音乐',
      router: '/app/music.163.discovery',
      icon: 'icon-wangyiyunyinle',
      selected: true
    }, {
      label: '私人FM',
      router: '/app/music.163.fm',
      icon: 'icon-FM',
      selected: false
    }, {
      label: '视频',
      router: '/app/music.163.video',
      icon: 'icon-shipin1',
      selected: false
    }, {
      label: '朋友',
      router: '/app/music.163.friends',
      icon: 'icon-pengyou',
      selected: false
    }]
  }, {
    label: '我的音乐',
    key: Math.random(),
    subMenu: []
  }, {
    label: '创建的歌单',
    key: Math.random(),
    subMenu: []
  }, {
    label: '收藏的歌单',
    key: Math.random(),
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
    this.menus[1].subMenu = [{
      label: '每日推荐',
      router: '/app/music.163.recommend',
      icon: 'icon-tuijian',
      selected: false
    }, {
      label: '播放记录',
      router: '/app/music.163.record',
      icon: 'icon-history',
      selected: false
    }, {
      label: '喜欢的歌',
      router: '/app/music.163.liked',
      icon: 'icon-xihuan',
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
        this.menus[2].subMenu.push({
          label: _item.name,
          router: `/app/music.163.playlist/${_item.id}`,
          icon: 'icon-gedan',
          selected: false
        })
      } else {
        this.menus[3].subMenu.push({
          label: _item.name,
          router: `/app/music.163.playlist/${_item.id}`,
          icon: 'icon-gedan',
          selected: false
        })
      }
    })
  }
  /**
    app-mobile
  */
  @observable appMenus = [{
    key: Math.random(),
    icon: 'icon-tuijian',
    selected: true,
    badge: null,
    hash: '/app-mobile/music.163.mrtj',
    fontSize: 24
  }, {
    key: Math.random(),
    icon: 'icon-history',
    selected: false,
    badge: null,
    hash: '/app-mobile/music.163.bfjl',
    fontSize: 24
  }, {
    key: Math.random(),
    icon: 'icon-xihuan',
    selected: false,
    badge: null,
    hash: '/app-mobile/music.163.xhdg',
    fontSize: 20
  }, {
    key: Math.random(),
    icon: 'icon-gedan',
    selected: false,
    badge: null,
    hash: '/app-mobile/music.163.wdgd',
    fontSize: 20
  }]
  @action setAppMenu = (index:number) => {
    this.appMenus.forEach((_item, _index) => {
      _item.selected = _index === index
      if(_item.selected){
        location.hash = _item.hash
      }
    })
    this.appMenus = [...this.appMenus] // render
  }
}
export {
  UiServices
}