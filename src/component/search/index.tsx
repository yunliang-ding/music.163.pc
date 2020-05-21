import * as React from "react"
import { observer, inject } from 'mobx-react'
import Input from 'antd/es/input'
import Pagination from 'antd/es/pagination'
import './index.less'
import { CommonTable } from "../common/index";
@inject('Music')
@observer
class SearchTable extends React.Component<any, any> {
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
      setSearchForm
    } = this.props.Music
    return <div className='app-search-table'>
      <div className='app-search-header'>
        <Input placeholder='关键字查找' value={keywords} onChange={
          (e) => {
            this.props.Music.setSearchForm('keywords', e.target.value)
          }
        } />
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
          current={offset + 1}
          total={count}
          pageSize={limit}
          pageSizeOptions={['30', '50', '100']}
          showSizeChanger
          onChange={
            (page) => {
              setSearchForm('offset', page - 1)
            }
          }
          onShowSizeChange={
            (current, size) => {
              setSearchForm('limit', size)
            }
          }
        />
      </div>
    </div>
  }
}
export { SearchTable }