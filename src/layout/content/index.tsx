import * as React from "react"
import { observer, inject } from 'mobx-react'
import './index.less'
@inject('UI')
@observer
class Content extends React.Component<any, any> {
  [x: string]: any
  render() {
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-content${theme}`}>
      {this.props.children}
    </div>
  }
}
export {
  Content
}
