import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import Button from 'antd/es/button'
import { Table } from '../table/index'
@inject('Music')
@observer
class XhdgTable extends React.Component<any, any> {
  [x: string]: any;
  constructor(props) {
    super(props)
  }
  render() {
    const {
      likelistArray: {
        data,
        count,
        init
      },
      pushMusicCache
    } = this.props.Music
    return <div className='app-mobile-xhdg'>
      <Table data={data} init={init} height='calc(100%)'/>
    </div>
  }
}
export { XhdgTable }