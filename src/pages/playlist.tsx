import * as React from "react"
import { PlayListIndex } from '../component/playlist/index'
import { PlayListTable } from "../component/playlist/table";
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class PlayList extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      if(this.props.params.id){
        this.props.Music.queryPlaylistSong(this.props.params.id)
      } else {
        this.props.Music.queryUserPlayList()
      }
    }, 1000)
  }
  componentWillReceiveProps (props, nextProps) {
    if(props.params.id){
      this.props.Music.queryPlaylistSong(props.params.id)
    } 
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return this.props.params.id === undefined ? <PlayListIndex /> : <PlayListTable id={this.props.params.id} />
  }
}
export { PlayList }