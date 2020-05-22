import * as React from 'react'
import { observer, inject } from 'mobx-react'
import { Nav, Select, Input, Button } from 'react-ryui'
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
      querySearch,
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
          placeholder='关键字查找'
          style={{ width: 200 }}
          value={keywords}
          onChange={
            (e: any) => {
              setSearchForm('keywords', e.target.value)
            }
          }
        />
        <Button
          style={{ width: 40, marginLeft: 10 }}
          label={<i className='iconfont icon-search'></i>}
          dark={this.props.UI.theme === 'dark'}
          onClick={
            () => {
              querySearch()
              setSearchForm('offset', 0)
              window.location.hash = '/app/music.163.search'
            }
          }
        />
      </div>
      <div className='app-header-history'>
        <i className='iconfont icon-qianjin-copy-copy' onClick={
          () => {
            window.history.go(-1)
          }
        }></i>
        <i style={{ marginLeft: 20 }} className='iconfont icon-qianjin-Outline' onClick={
          () => {
            window.history.go(1)
          }
        }></i>
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