import * as React from 'react'
import { observer, inject } from 'mobx-react'
import Slider from 'antd/es/slider'
import message from 'antd/es/message'
const $ = document.querySelector.bind(document)
@inject('Music', 'UI')
@observer
class Video extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    $('#title').innerHTML = this.props.Music.music.name || 'music.163.web'
  }
  componentDidMount() {
    $('#vidio').ontimeupdate = (e) => {
      this.props.Music.setProgress(e.target.currentTime * 1000)
    }
    $('#vidio').onended = (e) => {
      this.props.Music.playerNext()
    }
    $('#vidio').onerror = (e) => {
      this.props.Music.url !== undefined && message.warn('暂无版权!')
    }
  }
  render() {
    const {
      music: {
        url,
        progress,
        duration,
        playing
      },
      setProgress
    } = this.props.Music
    return <div className='app-footer-sider'>
      <div style={{ width: '100%' }}>
        <Slider
          min={0}
          max={1}
          step={0.001}
          value={progress / duration}
          onChange={
            (e: any) => {
              $('#vidio').currentTime = e * duration / 1000
              playing ? $('#vidio').play() : $('#vidio').pause()
              setProgress(e * duration)
            }
          }
          tipFormatter={null}
        />
      </div>
      <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'none' }}>
          <video src={url} autoPlay={true} id='vidio' />
        </div>
      </div>
    </div>
  }
}
export { Video }