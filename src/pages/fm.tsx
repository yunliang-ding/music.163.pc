import * as React from "react"
import { FMTable } from '../component/fm/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class FM extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <FMTable />
  }
}
export { FM }