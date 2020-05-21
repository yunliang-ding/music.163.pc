import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Message from 'antd/es/message'
@inject('UI', 'Music')
@observer
class PlaySongList extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.Music.queryUserPlayList()
  }
  render() {
    const {
      setCollectionModel,
      collectionModel: {
        musicId
      }
    } = this.props.UI
    const {
      userInfo: {
        userId,
        playlist
      }
    } = this.props.Music
    return <div className='app-player-list'>
      <div className='app-player-list-tools'>
        <span>
          添加到歌单
          <span className='app-player-list-tools-new' onClick={
            () => {

            }
          }>(新建歌单)</span>
        </span>
        <i className='iconfont icon-close' onClick={
          () => {
            setCollectionModel('visable', false)
          }
        }></i>
      </div>
      <div className='app-player-list-body'>
        {
          playlist && playlist.filter(_item => _item.userId === userId).map(_item => {
            return <div className='app-player-list-item' key={_item.id} onClick={
              async () => {
                const { code, message } = await this.props.Music.tracksPlayList('add', _item.id, musicId)
                if (code === 200) {
                  Message.success('收藏成功.')
                  setCollectionModel('visable', false)
                } else {
                  Message.error(message)
                }
              }
            }>
              <div>
                <img src={_item.coverImgUrl + '?param=50y50'} />
              </div>
              <div style={{ paddingLeft: 20 }}>
                <span style={{ fontSize: 12 }}>{_item.name}</span> <br />
                <span style={{ fontSize: 12 }}>{_item.trackCount}</span>
              </div>
            </div>
          })
        }
      </div>
    </div>
  }
}
export { PlaySongList }