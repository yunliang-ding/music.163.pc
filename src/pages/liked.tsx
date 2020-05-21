import * as React from 'react'
import { Liked } from '../component/liked/index'
import { observer, inject } from 'mobx-react'
@inject('Music')
@observer
class LikePage extends React.Component {
  props: any;
  constructor(props) {
    super(props)
  }
  init = () => { 
    setTimeout(()=>{
      this.props.Music.queryLiked()
    }, 1000)
  }
  componentDidMount() {
    this.init()
  }
  render() {
    return <Liked />
  }
}
export { LikePage }