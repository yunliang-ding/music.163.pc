import * as React from "react"
import { RecommendTable } from '../component/recommend/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class Recommend extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      this.props.Music.queryRecommend()
    }, 1000)
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return <RecommendTable />
  }
}
export { Recommend }