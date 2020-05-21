import * as React from "react"
import { RecordTable } from '../component/record/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class Record extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => {
    // 接口数据查询调用
    setTimeout(()=>{
      this.props.Music.queryRecord()
    }, 1000)
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return <RecordTable />
  }
}
export { Record }