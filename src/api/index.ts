import axios from 'axios'
import { UI } from '../store/ui/index'
import { Music } from '../store/music/index'
import { message }  from 'antd'
const qs = require('qs')
const get = async (url, params) => {
  let response = null
  UI.setLoading(true)
  let options = {
    params,
    timeout: 30000,
    validateStatus: (status) => { // 控制允许接受的状态码范围
      return status >= 200 && status < 505
    }
  }
  try {
    response = await axios.get(url, options)
    if( response.data.code === 301 ){
     // 自动刷新登录
     try{
      if(localStorage.getItem('userInfo') === null){
        message.error('需要登录!')
      } else {
        const { username, password, loginWay } = JSON.parse(localStorage.getItem('userInfo'))
        await Music.login(username, password, loginWay)
        return await this.get(url, params) // 继续发送
      }
     } catch (e) {
      console.log(e)
     }
    } else if( response.data.code !== 200 ) {
      message.error(response.data.msg)
    }
    UI.setLoading(false)
    return response.data
  } catch (err) {
    UI.setLoading(false)
    return {
      isError: true,
      statusCode: -10001,
      message: '接口异常',
      data: null
    }
  }
}
const post = async (url, data, headers) => {
  UI.setLoading(true)
  data = data || {}
  let response = null
  try {
    response = await axios.post(url, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      withCredentials: true
    })
    UI.setLoading(false)
    return response.data
  } catch (err) {
    UI.setLoading(false)
    return {
      isError: true,
      statusCode: -10001,
      message: '接口异常',
      data: null
    }
  }
}
export {
  get,
  post
}