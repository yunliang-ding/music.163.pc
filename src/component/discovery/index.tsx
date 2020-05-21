import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Music')
@observer
class DiscoveryTable extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <div className='app-discovery'>
      开发中...app-discovery
    </div>
  }
}
export { DiscoveryTable }