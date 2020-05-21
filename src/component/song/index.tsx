import * as React from "react"
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Lyric } from './lyric'
import { Progress } from 'antd';
import './index.less'
@inject('Music', 'UI')
@observer
class MusicSong extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    const {
      music: {
        id,
        playing,
        image,
        name,
        artists,
        album,
        progress,
        duration
      },
      userInfo: {
        likelist
      }
    } = this.props.Music
    return <div className='app-song-body'>
      <div className='app-song-image'>
        <Progress type="circle" percent={(progress/duration) * 100} width={320} strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}/>
        <img src={image + '?param=600y600'} style={{animation: playing ? 'spin 20s linear infinite' : 'none'}}/>
        <div className='app-song-image-tools'>
          <div className='app-song-image-tools-item'>
            <i style={{
              color: toJS(likelist).includes(id) ? 'var(--theme-color)' : '#333'
            }} className={toJS(likelist).includes(id) ? 'iconfont icon-xihuan' : 'iconfont icon-xihuan1'}></i>
          </div>
          <div className='app-song-image-tools-item' onClick={
            () => {
              this.props.UI.setCollectionModel('visable', true)
              this.props.UI.setCollectionModel('musicId', id)
            }
          }>
            <i className='iconfont icon-shoucang'></i>
          </div>
          <div className='app-song-image-tools-item'>
            <i className='iconfont icon-xiazai'></i>
          </div>
          <div className='app-song-image-tools-item'>
            <i className='iconfont icon-pinglun'></i>
          </div>
        </div>
      </div>
      <div className='app-song-lyric'>
        <div className='app-lyric-title'>
          <div className='app-lyric-title-dq'>
            <h1>{name}</h1>
          </div>
          <div className='app-lyric-title-singer'>
            专辑：<span>{album ? album.name : '未知'}</span>
            歌手：<span>{artists}</span>
          </div>
        </div>
        <Lyric />
      </div>
    </div>
  }
}
export { MusicSong }