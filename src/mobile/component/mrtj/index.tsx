import * as React from "react"
import { observer, inject } from 'mobx-react'
import { Table } from '../table/index'
import './index.less'
@inject('Music')
@observer
class MrtjTable extends React.Component<any, any> {
  render() {
    const {
      recommendArray: {
        data,
        init
      }
    } = this.props.Music
    return <div className='app-mobile-mrtj'>
      <Table 
        data={data} 
        init={init} 
        height='calc(100%)' 
        query={() => {}} 
      />
    </div>
  }
}
export { MrtjTable }