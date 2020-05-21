import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Lyric } from '../../component/song/lyric'
import Empty from 'antd/es/empty'
@inject('Music', 'UI')
@observer
class PlayRecord extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      musicsCache,
      music:{
        id,
        name,
        artists
      },
      player,
      removeMusicCache,
      removeMusicCacheById
    } = this.props.Music
    const {
      setPlyerRecord
    } = this.props.UI
    return <div className='app-player-record'>
      <div className='app-player-record-body'>
        <div className='app-player-record-list'>
            <div className='app-player-record-list-title'>
              <span>播放列表 ( {musicsCache.length} )</span>
              <span className='title-tools' onClick={
                () => {
                  removeMusicCache()
                }
              }>(清除所有)&nbsp;&nbsp;<i className='iconfont icon-shanchu'></i></span>
            </div>
            <div className='app-player-record-list-body'>
              {
                musicsCache.length > 0 ? musicsCache.map((_item, _index)=>{
                  return <div className='app-player-record-list-item' key={_item.id}>
                    <div className='app-player-record-list-item-left'>
                      <span className='app-player-record-list-idx'>{_index + 1}</span>
                      <span className={_item.id === id ? 'app-player-record-list-song-active' : 'app-player-record-list-song'}>{_item.name}</span>
                      <span className='app-player-record-list-artists'>{_item.artists}</span>
                      <i className={_item.id === id ? 'iconfont icon-bofang app-player-record-iconfont-active' : 'iconfont icon-bofang'} onClick={
                        () => {
                          player(_item)
                        }
                      }></i>
                    </div>
                    <i className='iconfont icon-shanchu' onClick={
                      () => {
                        removeMusicCacheById(_item.id)
                      }
                    }></i>
                  </div>
                })
                : <div className='app-player-record-list-body-none'>
                  <Empty />
                </div>
              }
            </div>
        </div>
        <div className='app-player-record-lyric'>
          <div className='app-player-record-lyric-title'>
            <div>
              <span className='app-player-record-lyric-title-name'>{name}</span>
              <span className='app-player-record-lyric-title-artists'>{artists}</span>
            </div>
            <i className='iconfont icon-close' onClick={
              () => {
                setPlyerRecord(false)
              }
            }></i>
          </div>
          <div className='app-player-record-lyric-body'>
            <Lyric />
          </div>
        </div>
      </div>
    </div>
  }
}
export { PlayRecord }