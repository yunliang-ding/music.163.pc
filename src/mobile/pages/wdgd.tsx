import * as React from "react"
import { WdgdTable } from '../component/wdgd/table'
import { WdgdIndex } from '../component/wdgd/index'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class Wdgd extends React.Component<any, any> {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      const {
        userInfo: {
          playlist
        }
      } = this.props.Music
      if(this.props.params.id){
        this.props.Music.queryPlaylistSong(this.props.params.id)
      } else {
        if(playlist.length == 0){
          this.props.Music.queryUserPlayList()
        }
      }
    }, 1000)
  }
  componentWillReceiveProps (props) {
    if(props.params.id){
      this.props.Music.queryPlaylistSong(props.params.id)
    } 
  }
  componentDidMount() {
    this.init()
    this.props.UI.setNavTitle('我的歌单')
  }
  render() {
    return this.props.params.id === undefined ? <WdgdIndex /> : <WdgdTable id={this.props.params.id} />
  }
}
export { Wdgd }