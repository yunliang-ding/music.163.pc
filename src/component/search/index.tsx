import * as React from "react"
import { observer, inject } from 'mobx-react'
import { Pagination } from 'react-ryui'
import './index.less'
import { CommonTable } from "../common/index";
@inject('Music', 'UI')
@observer
class SearchTable extends React.Component<any, any> {
  [x: string]: any;
  constructor(props) {
    super(props)
  }
  render() {
    const {
      searchArray: {
        data,
        count
      },
      searchForm: {
        limit,
        offset,
        keywords
      },
      setSearchForm,
      querySearch
    } = this.props.Music
    let theme = this.props.UI.theme === 'dark' ? '-dark' : ''
    return <div className={`app-search-table${theme}`}>
      <div className='app-search-header'>
        <div className='app-search-info'>
          搜索"<span> {keywords} </span>"
          找到<span> {count} </span>首单曲
        </div>
      </div>
      <div className='app-search-list'>
        <CommonTable data={data} />
      </div>
      <div className='app-search-pagination'>
        <Pagination
          dark={this.props.UI.theme === 'dark'}
          current={offset + 1}
          total={count}
          pageSize={limit}
          onChange={
            (page) => {
              setSearchForm('offset', page - 1)
              querySearch()
            }
          }
        />
      </div>
    </div>
  }
}
export { SearchTable }