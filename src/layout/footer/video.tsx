import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Slider } from 'react-ryui'
import message from 'antd/es/message'
const $ = document.querySelector.bind(document)
@inject('Music', 'UI')
@observer
class Video extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
    this.state = {
      siderWidth: 0
    }
  }
  componentDidUpdate() {
    $('#title').innerHTML = this.props.Music.music.name
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
    this.setState({
      siderWidth: this.sliderNode.getBoundingClientRect().width
    })
    // window.parent.addEventListener('resize', () => {
    //   this.sliderNode && this.setState({
    //     siderWidth: this.sliderNode.getBoundingClientRect().width
    //   })
    // })
    // window.parent.document.querySelector('iframe') && window.parent.document.querySelector('iframe').contentWindow.addEventListener('resize', () => {
    //   this.sliderNode && this.setState({
    //     siderWidth: this.sliderNode.getBoundingClientRect().width
    //   })
    // })
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
    return <div className='app-footer-sider' ref={slider => {this.sliderNode = slider}}>
      <div style={{ width: '100%' }}>
        <Slider
          dark={this.props.UI.theme === 'dark'}
          siderWidth={this.state.siderWidth}
          siderHeight={4}
          progress={Math.ceil(progress / duration * 100)}
          onChange={
            (e) => {
              $('#vidio').currentTime = duration * e / 100
              playing ? $('#vidio').play() : $('#vidio').pause()
              setProgress(duration * e / 100)
            }
          }
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