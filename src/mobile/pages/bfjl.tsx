import * as React from "react"
import { BfjlTable } from '../component/bfjl/index'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class Bfjl extends React.Component<any, any> {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      if(this.props.Music.recordArray.init){
        this.props.Music.queryRecord()
      }
    }, 1000)
  }
  componentDidMount() {
    this.init()
    this.props.UI.setNavTitle('播放记录')
  }
  render() {
    return <BfjlTable />
  }
}
export { Bfjl }