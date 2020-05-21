import { injectable } from "inversify"
import "reflect-metadata"
import { MusicInterface } from "./type";
import { observable, action, runInAction, toJS } from 'mobx'
import { get, isPc } from '../../api'
import message from 'antd/es/message'
import { UI } from '../ui/index'
const $ = document.querySelector.bind(document)
@injectable()
class MusicServices implements MusicInterface {
  @observable musicsCache = JSON.parse(localStorage.getItem('music')) || [] // 播放磁盘
  @observable musicMv = ''
  @observable music = (JSON.parse(localStorage.getItem('music')) && JSON.parse(localStorage.getItem('music'))[this.musicsCache.length - 1]) || {
    id: '',
    url: 'http://',
    name: '',
    artists: '',
    duration: '',
    image: '',
    lyric: '',
    tlyric: '',
    progress: 0,
    playing: false,
    comment: []
  }
  @observable searchArray = {
    data: [],
    init: true,
    count: 0
  }
  @observable recordArray = {
    data: [],
    init: true,
    count: 0
  }
  @observable recommendArray = {
    data: [],
    init: true,
    count: 0
  }
  @observable likelistArray = {
    data: [],
    init: true,
    count: 0
  }
  @observable simiArray = {
    data: []
  }
  @observable playlistArray = {
    playlist: null,
    init: true,
    data: []
  }
  @observable userInfo = JSON.parse(localStorage.getItem('userInfo')) || {
    loginWay: 1,
    username: '',
    password: '',
    userId: '',
    createTime: 0,
    nickname: '',
    avatarUrl: '',
    playlist: [], //歌单
    likelist: [] //喜欢
  }
  @observable commentForm = {
    count: 0,
    offset: 0,
    limit: 30
  }
  @observable searchRecordForm = {
    type: 1
  }
  @observable searchForm = {
    keywords: '',
    offset: 0,
    limit: 30
  }
  @action logOut = async () => {
    const { code } = await get('/api/logout', {})
    if (code === 200) {
      localStorage.removeItem('userInfo')
      UI.removeUserMenus()
      UI.setSelected(0, 0)
      runInAction(() => {
        this.userInfo = {
          loginWay: 1,
          username: '',
          password: '',
          userId: '',
          createTime: 0,
          nickname: '',
          avatarUrl: '',
          playlist: [], //歌单
          likelist: [] //喜欢
        }
      })
      setTimeout(() => {
        UI.setLogin(false)
        window.location.hash = isPc() ? '/app/music.163.discovery' : '/app-mobile/music.163.login'
      }, 2000)
    }
  }
  @action login = async (username, password, loginWay) => {
    const param = loginWay === 1 ? {
      email: username,
      password
    } : {
        phone: username,
        password
      }
    const url = loginWay === 1 ? '/api/login' : '/api/login/cellphone'
    const {
      code,
      msg,
      profile,
      account
    } = await get(url, param)
    if (code === 200) {
      runInAction(() => {
        UI.setLoginModel(false)
        UI.setLogin(true)
        this.userInfo = {
          loginWay,
          username,
          password,
          userId: profile.userId,
          createTime: account.createTime,
          nickname: profile.nickname,
          avatarUrl: profile.avatarUrl,
          playlist: [],
          likelist: []
        }
        localStorage.setItem('userInfo', JSON.stringify(toJS(this.userInfo)))
      })
      const { playlist, userId } = await this.queryUserPlayList()
      UI.updateMenus(playlist, userId)
      UI.addUserMenus()
      this.getLikeList()
      return true
    } else {
      isPc() && message.error(msg || '账号或密码错误')
    }
    return false
  }
  @action signin = async () => {
    await get('/api/daily_signin', {})
  }
  @action queryRecord = async (): Promise<void> => {
    const { code, weekData, allData } = await get('/api/user/record', {
      uid: this.userInfo.userId,
      type: this.searchRecordForm.type
    })
    code === 200 && runInAction(() => {
      let data = weekData || allData
      this.recordArray = {
        data: data.map((_item, _index) => {
          _item.sort = _index + 1
          _item.id = _item.song.id
          _item.name = _item.song.name
          _item.artists = _item.song.ar[0].name
          _item.image = _item.song.al.picUrl
          return _item
        }) || [],
        count: data.length,
        init: false
      }
    })
    runInAction(() => {
      this.recordArray.init = false
    })
  }
  @action queryRecommend = async (): Promise<void> => {
    const { code, recommend } = await get(`/api/recommend/songs?&timestamp=${new Date().getTime()}`, {})
    code === 200 && runInAction(() => {
      this.recommendArray = {
        data: recommend.map((_item, _index) => {
          _item.sort = _index + 1
          _item.artists = _item.artists[0].name
          _item.image = _item.album.picUrl
          return _item
        }) || [],
        count: recommend.length,
        init: false
      }
    })
    runInAction(() => {
      this.recommendArray.init = false
    })
  }
  @action getLikeList = async (): Promise<void> => {
    const { ids, code } = await get(`/api/likelist?&timestamp=${new Date().getTime()}`, {
      uid: this.userInfo.userId
    })
    code === 200 && (
      runInAction(() => {
        this.userInfo.likelist = ids
      })
    )
  }
  @action queryLiked = async (): Promise<void> => {
    const res = await get(`/api/likelist?&timestamp=${new Date().getTime()}`, {
      uid: this.userInfo.userId
    })
    if (res.code === 200) {
      const { songs, code } = await get('/api/song/detail', {
        ids: res.ids.join(',')
      })
      code === 200 && runInAction(() => {
        this.likelistArray = {
          data: songs.map((_item, _index) => {
            _item.sort = _index + 1
            _item.artists = _item.ar[0].name
            _item.album = _item.al
            _item.image = _item.al.picUrl
            _item.duration = _item.dt
            _item.mvid = _item.mv
            return _item
          }) || [],
          count: songs.length,
          init: false
        }
      })
    }
    runInAction(() => {
      this.likelistArray.init = false
    })
  }
  @action querySearch = async (): Promise<void> => {
    const { code, result } = await get('/api/search', this.searchForm)
    code === 200 && runInAction(() => {
      this.searchArray = {
        data: result && result.songs.map((_item, _index) => {
          _item.sort = _index + 1 + (this.searchForm.limit * this.searchForm.offset)
          _item.artists = _item.artists[0].name
          _item.image = _item.album.artist.img1v1Url
          return _item
        }) || [],
        count: result.songCount,
        init: false
      }
    })
    runInAction(() => {
      this.searchArray.init = false
    })
  }
  @action queryLyricById = async (id: string): Promise<void> => {
    const lyric = await get('/api/lyric', {
      id
    })
    lyric.code === 200 && runInAction(() => {
      this.music.lyric = lyric.lrc && lyric.lrc.lyric && lyric.lrc.lyric.replace(/↵/g, "").replace(/\n/g, "#*#")
      this.music.tlyric = lyric.tlyric && lyric.tlyric.lyric && lyric.tlyric.lyric.replace(/↵/g, "").replace(/\n/g, "#*#")
    })
  }
  @action queryCommentById = async (id: string): Promise<void> => {
    const { hotComments, comments, code, total } = await get('/api/comment/music', Object.assign({}, { id }, this.commentForm))
    code === 200 && runInAction(() => {
      this.music.comment = hotComments || comments
      this.commentForm.count = total
    })
  }
  @action queryMusicById = async (id: string, name: string, duration: string, artists: string): Promise<boolean> => {
    // 1:先去磁盘查找
    let song = this.musicsCache.find(_item => {
      return _item.id === id
    })
    if (song) {
      this.music.playing = true
      this.setLyricScrollTop(0)
      if (song.lyric === '') { //没有歌词需要查一下
        const { code, lrc, tlyric } = await get('/api/lyric', {
          id
        })
        song.lyric = lrc && lrc.lyric && lrc.lyric.replace(/↵/g, "").replace(/\n/g, "#*#")
        song.tlyric = tlyric && tlyric.lyric && tlyric.lyric.replace(/↵/g, "").replace(/\n/g, "#*#")
      }
      runInAction(() => {
        this.music = song
      })
      // this.refreshMusicCache(id)
    } else {
      const { data } = await get('/api/song/url', {
        id
      })
      if (data[0].url === null) {
        return false
      }
      // 不在缓存中就发请求
      const detail = await get('/api/song/detail', {
        ids: id
      })
      const lyric = await get('/api/lyric', {
        id
      })
      detail.code === 200 && lyric.code === 200 && runInAction(() => {
        this.music = {
          id,
          url: `https://music.163.com/song/media/outer/url?id=${id}`,
          name,
          duration,
          artists,
          image: detail.songs && detail.songs[0].al.picUrl || '',
          lyric: lyric.lrc && lyric.lrc.lyric && lyric.lrc.lyric.replace(/↵/g, "").replace(/\n/g, "#*#"),
          tlyric: lyric.tlyric && lyric.tlyric.lyric && lyric.tlyric.lyric.replace(/↵/g, "").replace(/\n/g, "#*#"),
          progress: 0,
          playing: true,
          comment: [],
          album: detail.songs[0].al
        }
        this.musicsCache.push(this.music)
        this.setLyricScrollTop(0)
        localStorage.setItem('music', JSON.stringify(toJS(this.musicsCache)))
      })
    }
    return true
  }
  @action querySimiSong = async (id: string) => {
    const { code, songs } = await get('/api/simi/song', {
      id
    })
    code === 200 && runInAction(() => {
      this.simiArray = {
        data: songs
      }
    })
  }
  @action queryPlaylistSong = async (id: string) => {
    const { code, privileges, playlist } = await get('/api/playlist/detail', {
      id
    })
    if (code === 200) {
      const res = await get('/api/song/detail', {
        ids: privileges.map(_item => _item.id).join(',')
      })
      res.code === 200 && runInAction(() => {
        this.playlistArray = {
          data: res.songs.map((_item, _index) => {
            _item.sort = _index + 1
            _item.artists = _item.ar[0].name
            _item.album = _item.al
            _item.image = _item.al.picUrl
            _item.duration = _item.dt
            _item.mvid = _item.mv
            return _item
          }) || [],
          playlist,
          init: false
        }
      })
      runInAction(() => {
        this.playlistArray.init = false
      })
    }
  }
  @action queryMusicMv = async (id: string) => {
    const { code, data } = await get('/api/mv/url', {
      id
    })
    code === 200 && runInAction(() => {
      this.musicMv = data.url
    })
  }
  @action queryUserPlayList = async () => {
    const { code, playlist } = await get(`/api/user/playlist?&timestamp=${new Date().getTime()}`, {
      uid: this.userInfo.userId
    })
    code === 200 && runInAction(() => {
      this.userInfo.playlist = playlist
    })
    return {
      userId: this.userInfo.userId,
      playlist
    }
  }
  @action tracksPlayList = async (op: string, pid: string, tracks: string) => {
    const res = await get(`/api/playlist/tracks`, {
      op,
      pid,
      tracks
    })
    return res
  }
  @action setLike = async (id: string) => {
    const res = await get(`/api/like`, {
      id
    })
    if (res.code === 200) {
      runInAction(() => {
        this.userInfo.likelist.push(id)
        this.userInfo.likelist = [...this.userInfo.likelist] // render
      })
    }
    return res
  }
  @action refreshMusicCache = (id: string) => {
    let newCache = this.musicsCache.filter(_item => {
      return _item.id !== id
    })
    newCache.push(this.music)
    this.musicsCache = newCache
    localStorage.setItem('music', JSON.stringify(toJS(this.musicsCache)))
  }
  @action removeMusicCacheById = (id: string) => {
    let newCache = this.musicsCache.filter(_item => {
      return _item.id !== id
    })
    this.musicsCache = newCache
    localStorage.setItem('music', JSON.stringify(toJS(this.musicsCache)))
  }
  @action removeMusicCache = () => {
    this.musicsCache = []
    localStorage.setItem('music', JSON.stringify(toJS(this.musicsCache)))
  }
  @action setLyricScrollTop = (scrollTop) => {
    $('.app-player-record-lyric-body') && ($('.app-player-record-lyric-body').scrollTop = scrollTop)
  }
  @action player = async (_item: {
    id: string,
    name: string,
    duration: string,
    artists: string
  }) => {
    const result = await this.queryMusicById(
      _item.id,
      _item.name,
      _item.duration,
      _item.artists
    )
    if (result) {
      // await this.queryLyricById(_item.id)
      await this.queryCommentById(_item.id)
    } else {
      message.warning('亲爱的,暂无版权')
    }
  }
  @action playerBefore = () => {
    if (this.musicsCache.length === 0) {
      return
    }
    let _idx = 0
    this.musicsCache.map((_item, _index) => {
      if (_item.id === this.music.id) {
        _idx = _index > 0 ? _index - 1 : _index
      }
    })
    this.music = this.musicsCache[_idx]
    this.queryLyricById(this.music.id)
    this.queryCommentById(this.music.id)
    this.querySimiSong(this.music.id)
  }
  @action playerNext = () => {
    if (this.musicsCache.length === 0) {
      return
    }
    let _idx = 0
    this.musicsCache.map((_item, _index) => {
      if (_item.id === this.music.id) {
        _idx = _index === this.musicsCache.length - 1 ? 0 : _index + 1
      }
    })
    this.music = this.musicsCache[_idx]
    this.queryLyricById(this.music.id)
    this.queryCommentById(this.music.id)
    this.querySimiSong(this.music.id)
  }
  @action setSearchForm = (_key: string, _value: any): void => {
    this.searchForm[_key] = _value
    this.querySearch()
  }
  @action setSearchRecordForm = (_key: string, _value: any): void => {
    this.searchRecordForm[_key] = _value
    this.queryRecord()
  }
  @action setCommentForm = (_key: string, _value: any): void => {
    this.commentForm[_key] = _value
    this.queryCommentById(this.music.id)
  }
  @action setProgress = (progress) => {
    this.music.progress = progress
  }
  @action setPlaying = (playing) => {
    this.music.playing = playing
    !playing ? $('#vidio').pause() : $('#vidio').play()
  }
  @action setMusicMv = () => {
    this.musicMv = ''
  }
  @action clearStore = () => {
    this.simiArray = {
      data: []
    }
  }
  @action pushMusicCache = (data) => {
    data.map(_music => {
      this.musicsCache.push({
        id: _music.id,
        url: `https://music.163.com/song/media/outer/url?id=${_music.id}`,
        name: _music.name,
        duration: _music.duration,
        artists: _music.artists,
        image: _music.image,
        lyric: '',
        tlyric: '',
        progress: 0,
        playing: true,
        comment: []
      })
    })
    localStorage.setItem('music', JSON.stringify(toJS(this.musicsCache)))
  }
}
export {
  MusicServices
}