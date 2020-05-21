import * as React from "react"
import { XhdgTable } from '../component/xhdg/index'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class Xhdg extends React.Component<any, any> {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => { 
    setTimeout(()=>{
      if(this.props.Music.likelistArray.init){
        this.props.Music.queryLiked()
      }
    }, 1000)
  }
  componentDidMount() {
    this.init()
    this.props.UI.setNavTitle('喜欢的歌')
  }
  render() {
    return <XhdgTable />
  }
}
export { Xhdg }