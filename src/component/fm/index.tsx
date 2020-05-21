import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Music')
@observer
class FMTable extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <div className='app-fm'>
      开发中...app-fm
    </div>
  }
}
export { FMTable }