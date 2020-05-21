import * as React from "react"
import { DiscoveryTable } from '../component/discovery/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class Discovery extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <DiscoveryTable />
  }
}
export { Discovery }