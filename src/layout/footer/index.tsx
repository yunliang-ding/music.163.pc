import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Video } from './video'
import { Badge } from 'react-ryui'
import { PlayRecord } from './playrecord'
import { PlayMv } from './playmv'
import { PlaySongList } from './playsonglist'
import './index.less'
@inject('Music', 'UI')
@observer
class Footer extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  render() {
    const {
      music: {
        id,
        name,
        artists,
        image,
        playing,
        progress,
        duration,
      },
      musicMv,
      musicsCache,
      playerBefore,
      playerNext
    } = this.props.Music
    const {
      plyerRecord,
      setPlyerRecord,
      collectionModel,
      isFullScreen
    } = this.props.UI
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div style={{ width: '100%', height: 50, display: isFullScreen ? 'none' : 'block' }}>
      <Video />
      <div className={`app-footer${theme}`}>
        <div className='music-tools' style={{ width: '33.3%', display: 'flex', boxSizing: 'border-box' }}>
          <div style={{ width: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
            {
              image && <img style={{ width: 45 }} className='song-img' src={image + '?param=400y400'} />
            }
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start', justifyContent: 'center', width: 'calc(100% - 40px)' }}>
            <div className='music-tools-name'>
              <span style={{ fontSize: 14, color: '#545454' }} onClick={
                () => {
                  name && (window.location.hash = `/app/music.163.song/${id}`)
                }
              }>{name || '...'}</span> &nbsp;
              <span style={{ fontSize: 12 }}>{artists || '...'}</span>
            </div>
            <div>
              <span style={{ width: 100, fontSize: 12}}>
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
        <div className='music-tools' style={{ width: '33.3%', justifyContent: 'center', minWidth: 200 }}>
          <i style={{ fontSize: 16 }} className='iconfont icon-shangyishou1' onClick={
            () => {
              playerBefore()
            }
          }></i>
          <i style={{ fontSize: 32 }} className={playing ? 'iconfont icon-zanting2' : 'iconfont icon-video-control'} onClick={
            () => {
              this.props.Music.setPlaying(!playing)
            }
          }></i>
          <i style={{ fontSize: 16 }} className='iconfont icon-xiayishou1' onClick={
            () => {
              playerNext()
            }
          }></i>
        </div>
        <div className='music-tools' style={{ width: '33.3%', justifyContent: 'flex-end', minWidth: 200 }}>
          <i className='iconfont icon-shengyin'></i>
          <i className='iconfont icon-xunhuanbofang'></i>
          <i className='iconfont icon-icon-' onClick={
            () => {
              setPlyerRecord(!plyerRecord)
            }
          }>
            <Badge count={musicsCache.length} />
          </i>
        </div>
        {
          plyerRecord && <PlayRecord />
        }
        {
          collectionModel.visable && <PlaySongList />
        }
        {
          musicMv && <PlayMv />
        }
      </div>
    </div>
  }
}
export { Footer }