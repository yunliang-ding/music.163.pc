import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { toJS } from 'mobx'
import { Progress } from 'antd';
import Message from 'antd/es/message'
import './index.less'
@inject('Music', 'UI')
@observer
class MusicInfo extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  renderLyric = (lyricArray, progress) => {
    console.log(lyricArray)
    return lyricArray.map((_item, _index, _arr) => {
      let currentTime = _item.substr(_item.indexOf('[') + 1, _item.indexOf('.') - 1).split(':') || [0,0]
      let second = (Number.parseInt(currentTime[0]) * 60 + Number.parseInt(currentTime[1])) * 1000
      let nextTime = _arr[_index + 1] && _arr[_index + 1].substr(_arr[_index + 1].indexOf('[') + 1, _arr[_index + 1].indexOf('.') - 1).split(':') || [0,0]
      let secondNext = (Number.parseInt(nextTime[0]) * 60 + Number.parseInt(nextTime[1])) * 1000
      if( second <  progress && progress < secondNext ){
        return <h2>{_item.substr(_item.indexOf(']') + 1)}</h2>
      }
    })
  }
  render() {
    const {
      music: {
        id,
        name,
        artists,
        image,
        playing,
        lyric,
        progress,
        duration
      },
      playerBefore,
      playerNext,
      userInfo: {
        likelist
      }
    } = this.props.Music
    const lyricArray = lyric && lyric.toString().split('#*#')
    return <div className='app-music-info'>
      <div className='app-music-info-progress'>
        <Progress type="circle" percent={(progress/duration) * 100} width={350} strokeColor={{
          '0%': '#108ee9',
          '100%': '#87d068',
        }}/>
      </div>
      <div className='app-music-info-image'>
        <img src={`${image}?param=600y600`} />
      </div>
      <div className='app-music-info-title'>
        <h2>{name}-{artists}</h2>
      </div>
      <div className='app-music-info-lyric'>
        {
          lyricArray ? this.renderLyric(lyricArray, progress) : <h2>轻音乐～</h2>
        }
      </div>
      <div className='app-music-info-before' onClick={
        () => {
          playerBefore()
        }
      }>
        <i style={{ fontSize: 20 }} className='iconfont icon-shangyishou1'></i>
      </div>
      <div className='app-music-info-next' onClick={
        () => {
          playerNext()
        }
      }>
        <i style={{ fontSize: 20 }} className='iconfont icon-xiayishou1'></i>
      </div>
      <div className='app-music-info-menu'>
        <div className='app-music-info-menu-item' onClick={
          async () => {
            const { code, message } = await this.props.Music.setLike(id)
            if (code === 200) {
              Message.success('已添加至喜欢列表！')
            } else {
              Message.error(message)
            }
          }
        }>
          <i 
            style={{
              color: toJS(likelist).includes(id) ? 'var(--theme-color)' : '#fff',
              fontSize: 25,
            }} 
            className={toJS(likelist).includes(id) ? 'iconfont icon-xihuan' : 'iconfont icon-xihuan1'}
          >
          </i> 
        </div>
        <div className='app-music-info-menu-item' onClick={
          () => {
            this.props.Music.setPlaying(!playing)
          }
        }>
          <i style={{ fontSize: 40 }} className={playing ? 'iconfont icon-stop' : 'iconfont icon-arrow-left-copy'}></i>
        </div>
        <div className='app-music-info-menu-item'>
          <i className='iconfont icon-xunhuanbofang' style={{fontSize: 25}}></i>
        </div>
      </div>
    </div>
  }
}
export { MusicInfo }