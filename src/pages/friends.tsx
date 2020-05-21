import * as React from "react"
import { FriendsTable } from '../component/friends/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class Friends extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  render() {
    return <FriendsTable />
  }
}
export { Friends }