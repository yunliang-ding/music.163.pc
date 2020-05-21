import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
import { Table } from '../table/index'
@inject('Music')
@observer
class WdgdTable extends React.Component<any, any> {
  render() {
    const {
      playlistArray: {
        data,
        count,
        init
      },
      pushMusicCache
    } = this.props.Music
    return <div className='app-mobile-wdgd'>
      <div className='app-wdgd-list'>
        <Table data={data} init={init} height='100%'/>
      </div>
    </div>
  }
}
export { WdgdTable }