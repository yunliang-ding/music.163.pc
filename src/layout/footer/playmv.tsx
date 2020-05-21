import * as React from 'react'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class PlayMv extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }
  render() {
    const {
      musicMv,
      setMusicMv,
    } = this.props.Music
    return <div className='app-player-mv'>
      <div className='app-player-mv-tools'>
        <span>歌曲 Mv</span>
        <i className='iconfont icon-close' onClick={
          () => {
            setMusicMv('')
          }
        }></i>
      </div>
      <div className='app-player-mv-body'>
        <video src={musicMv} controls={true} autoPlay>
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>
  }
}
export { PlayMv }