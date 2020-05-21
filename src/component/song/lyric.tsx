import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
const $ = document.querySelectorAll.bind(document)
@inject('Music')
@observer
class Lyric extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  componentDidUpdate() {
    let lyrics = $('.app-lyric-item')
    lyrics = Array.from(lyrics)
    lyrics.map((_item, _index, _arr) => {
      let progress = this.props.Music.music.progress
      let time = _item.getAttribute('data-time') && _item.getAttribute('data-time').split(':') || [0,0]
      let second = (Number.parseInt(time[0]) * 60 + Number.parseInt(time[1])) * 1000
      let timeNext = _arr[_index + 1] && _arr[_index + 1].getAttribute('data-time') && _arr[_index + 1].getAttribute('data-time').split(':') || [0,0]
      let secondNext = (Number.parseInt(timeNext[0]) * 60 + Number.parseInt(timeNext[1])) * 1000
      let color = ( second <  progress && progress < secondNext ) ? '#000' : '#666'
      let fontSize = ( second <  progress && progress < secondNext ) ? 14 : 13
      if(color === 'var(--theme-color)'){ // 页面自动滚动
        this.props.Music.setLyricScrollTop(Number.parseInt(_item.offsetTop) - 200)
      }
      _item.style.color = color
      _item.style.fontSize = fontSize
    })
  }
  render() {
    const {
      music: {
        lyric,
        tlyric,
        name,
        artists,
        progress // 持续render 不能删除
      }
    } = this.props.Music
    const lyricArray = lyric && lyric.toString().split('#*#')
    const tlyricArray = tlyric && tlyric.toString().split('#*#')
    return <div className='app-lyric'>
      <div className='app-lyric-run'>
        {
          lyricArray && lyricArray.map((_item, _index) => {
            let currentTime = _item.substr(_item.indexOf('[') + 1, _item.indexOf('.') - 1)
            let EN_en = ''
            tlyricArray && tlyricArray.some(_item => { // 可以 breake 减少循环次数
              let _currentTime = _item.substr(_item.indexOf('[') + 1, _item.indexOf('.') - 1)
              if (_currentTime === currentTime) {
                EN_en = _item.substr(_item.indexOf(']') + 1)
                return true
              }
              return false
            })
            return <div data-time={currentTime} key={`lyric${_index}`} className={'app-lyric-item'}>
              <div>
                {_item.substr(_item.indexOf(']') + 1)}
              </div>
              <div>
                {EN_en}
              </div>
            </div>
          })
        }
      </div>
      {
        !lyricArray && <div className='app-lyric-none'>
          <div className={'app-lyric-item'}>
            作曲 <span>{name}</span>
          </div>
          <div className={'app-lyric-item'}>
            歌手 <span>{artists}</span>
          </div>
          <div className={'app-lyric-item'}>
            轻音乐请聆听～
          </div>
        </div>
      }
    </div>
  }
}
export { Lyric }