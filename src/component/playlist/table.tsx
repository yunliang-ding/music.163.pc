import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { CommonTable } from "../common/index"
import { Button } from 'react-ryui'
@inject('Music', 'UI')
@observer
class PlayListTable extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      pushMusicCache,
      playlistArray: {
        data,
        playlist,
        init
      }
    } = this.props.Music
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return playlist && <div className={`app-playlist-table${theme}`}>
      <div className='app-playlist-header'>
        <div className='dates'>
          <img src={playlist.coverImgUrl + '?param=600y600'} style={{ width: 200 }} />
        </div>
        <div className='infos'>
          <h3>
            <span>歌单</span>
            {playlist.name}
          </h3>
          <h5>
            <img src={playlist.creator.avatarUrl + '?param=30y30'}></img>
            <span style={{ fontSize: 12, marginLeft: 10, color : '#a0d0ec' }}>{playlist.creator.nickname}</span>
            <span style={{ fontSize: 12, marginLeft: 10 }}>{new Date(playlist.createTime).toLocaleDateString()} 创建</span>
          </h5>
          <Button
            dark={this.props.UI.theme === 'dark'}
            style={{width: 80, margin:'20px 0'}}
            label='播放全部'
            onClick={
              () => {
                pushMusicCache(data)
              }
            } 
          />
          <div className='app-playlist-header-number'>
            <span>歌曲数</span>
            {data.length}
          </div>
        </div>
      </div>
      <div className='app-playlist-list'>
        <CommonTable data={data} init={init} />
      </div>
    </div>
  }
}
export { PlayListTable }