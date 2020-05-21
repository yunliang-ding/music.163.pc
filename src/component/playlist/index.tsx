import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Music', 'UI')
@observer
class PlayListIndex extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      userInfo: {
        playlist,
        userId
      },
      queryPlaylistSong
    } = this.props.Music
    const createPlaylist = playlist && playlist.filter(_item => {
      return _item.userId === userId
    }) || []
    const collPlaylist = playlist && playlist.filter(_item => {
      return _item.userId !== userId
    }) || []
    return playlist.length > 0 ? <div className='app-playlist'>
      <div>
        <div className='app-playlist-title'>
          我创建的歌单（{createPlaylist.length}）
        </div>
        <div className='app-playlist-body'>
          {
            createPlaylist.map(_playlist => {
              return <div className='app-playlist-body-item' key={_playlist.id} onClick={
                async () => {
                  await queryPlaylistSong(_playlist.id)
                  location.hash = `app/music.163.playlist/${_playlist.id}`
                }
              }>
                <img src={_playlist.coverImgUrl + '?param=160y160'} />
                <span>{_playlist.name}({_playlist.trackCount})</span>
              </div>
            })
          }
        </div>
      </div>
      <div>
        <div className='app-playlist-title'>
          我收藏的歌单（{collPlaylist.length}）
        </div>
        <div className='app-playlist-body'>
          {
            collPlaylist.map(_playlist => {
              return <div className='app-playlist-body-item' key={_playlist.id} onClick={
                async () => {
                  await queryPlaylistSong(_playlist.id)
                  location.hash = `app/music.163.playlist/${_playlist.id}`
                }
              }>
                <img src={_playlist.coverImgUrl + '?param=160y160'} />
                <span>{_playlist.name}({_playlist.trackCount})</span>
              </div>
            })
          }
        </div>
      </div>
    </div> : <div className='app-playlist'>暂无歌单!</div>
  }
}
export { PlayListIndex }