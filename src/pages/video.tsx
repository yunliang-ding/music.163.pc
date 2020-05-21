import * as React from "react"
import { VideoTable } from '../component/video/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class Video extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <VideoTable />
  }
}
export { Video }