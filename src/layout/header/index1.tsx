import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Nav, Select, Input } from 'react-ryui'
import './index1.less'
@inject('Music', 'UI')
@observer
class Header extends React.Component<any, any> {
  [x: string]: any
  constructor(props) {
    super(props)
    this.navList = []
  }
  render() {
    const {
      searchForm: {
        keywords
      },
      setSearchForm
    } = this.props.Music
    return <div className='app-header'>
      <div className='app-header-theme'>
        <Select
          dark={this.props.UI.theme === 'dark'}
          style={{ width: 80, border: 0 }}
          dataList={this.props.UI.themes}
          value={this.props.UI.theme}
          onChange={
            (e) => {
              this.props.UI.setTheme(e)
            }
          }
        />
      </div>
      <div className='app-header-search'>
        <Input
          dark={this.props.UI.theme === 'dark'}
          placeholder='关键字查找-回车'
          style={{ width: 200 }}
          defaultValue={keywords}
          // onPressEnter={
          //   (e: any) => {
          //     setSearchForm('keywords', e.target.value)
          //     window.location.hash = '/app/music.163.search'
          //   }
          // }
        />
      </div>
      <Nav
        type='right'
        dark={this.props.UI.theme === 'dark'}
        logo={
          <div>
            <i className='iconfont icon-wangyiyunyinle'></i>
            <b>网易云音乐</b>
          </div>
        }
        navList={this.navList} menuClick={
          (nav) => {
            console.log(nav)
          }
        }
      />
    </div>
  }
}
export { Header }