import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Music')
@observer
class VideoTable extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <div className='app-video'>
      开发中...app-video
    </div>
  }
}
export { VideoTable }