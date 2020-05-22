import * as React from "react"
import { MusicSong } from '../component/song'
import { MusicComment } from '../component/song/comment'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class Song extends React.Component {
  props:any;
  constructor(props) {
    super(props)
  }
  init = async () => {
    // 接口数据查询调用
    await this.props.Music.queryLyricById(this.props.params.songId)
    await this.props.Music.queryCommentById(this.props.params.songId)
    await this.props.Music.querySimiSong(this.props.params.songId)
  }
  componentWillUnmount(){
    this.props.Music.clearStore()
  }
  componentDidMount(){
    this.init()
  }
  render() {
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-song${theme}`}>
      <MusicSong />
      <MusicComment />
    </div>
  }
}
export { Song }