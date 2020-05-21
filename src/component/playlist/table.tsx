import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { CommonTable } from "../common/index"
import Button from 'antd/es/button'
import { Skeleton } from 'antd';
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
    return playlist ? <div className='app-playlist-table'>
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
          <Button className='ant-btn-bf-all' onClick={
            () => {
              pushMusicCache(data)
            }
          }>
            <i className='iconfont icon-bofang'></i>
            播放全部
          </Button>
          <div className='app-playlist-header-number'>
            <span>歌曲数</span>
            {data.length}
          </div>
        </div>
      </div>
      <div className='app-playlist-list'>
        <CommonTable data={data} init={init} />
      </div>
    </div> : <Skeleton active />
  }
}
export { PlayListTable }