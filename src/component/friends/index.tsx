import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('Music')
@observer
class FriendsTable extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <div className='app-friends'>
      开发中...app-friends
    </div>
  }
}
export { FriendsTable }