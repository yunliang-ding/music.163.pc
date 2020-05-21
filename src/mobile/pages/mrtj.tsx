import * as React from "react"
import { MrtjTable } from '../component/mrtj/index'
import { observer, inject } from 'mobx-react'
@inject('Music', 'UI')
@observer
class Mrtj extends React.Component<any, any> {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      if(this.props.Music.recommendArray.init){
        this.props.Music.queryRecommend()
      }
    }, 1000)
  }
  componentDidMount() {
    this.props.UI.login && this.init()
    this.props.UI.setNavTitle('每日推荐')
  }
  render() {
    return <MrtjTable />
  }
}
export { Mrtj }