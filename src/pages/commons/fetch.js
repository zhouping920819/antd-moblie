import 'whatwg-fetch'
import * as Immutable from 'immutable'
import { Toast } from 'antd-mobile'
import MockData from '../../../mock'
import Config from '../../../config/config'

export default class request {
  static option = Immutable.fromJS({
    headers: {
      'Content-Type': 'application/json',
      Accept: '*/*'
    },
    mode: 'cors',
    credentials: 'include'
  })

  static buildUrl(url, params) {
    if (!params) return url
    let result = request.getParamsArray(params)
    let prefix = '?'
    if (url.indexOf('?') > -1) {
      prefix = '&'
    }

    return url + prefix + result.join('&')
  }

  static getParamsArray(params) {
    let result = new Array()
    if (!params) return result
    Object.keys(params).forEach(key => {
      if (params.hasOwnProperty(key)) {
        result.push(key + '=' + params[key])
      }
    })
    return result
  }

  static optResponse(res) {
    if (res.ok && res.status === 200) {
      return res.json()
    } else {
      ModalTip.warningTip('错误的请求！')
    }
  }

  /**
   * 拦截请求，如果是mock
   */
  static getMockData(url, params) {
    // 生产环境不走mock
    if (!__DEV__) {
      return false
    }
    // 如果有强制要求是否走mock，优先强制要求
    if (params.hasOwnProperty('getMockData')) {
      if (!params.getMockData) return false
    }
    // 默认配置是否走mock
    if (!Config.get_mock_data) {
      return false
    }
    return (
      MockData.has(url) && new Promise(resolve => resolve(MockData.get(url)))
    )
  }

  static get(url, params) {
    const goMock = request.getMockData(url, params)
    if (goMock) {
      return goMock
    }

    let _opt = request.option.toJS()
    _opt.headers.Authorization = ''
    _opt.method = 'GET'

    url = request.buildUrl(url, params)

    return fetch(Config.api_host + url, _opt)
      .then(res => {
        return request.optResponse(res)
      })
      .then(data => {
        if (data.result == 'ok') {
          return Promise.resolve(data.data)
        } else {
          ModalTip.warningTip(data.msg)
        }
      })
      .catch(e => {
        if (e instanceof Error) {
          console.error(e.message)
        }

        if (e.message === 'Failed to fetch') {
          Toast.fail('网络异常，请稍候再试')
        }
      })
  }

  static post(url, params) {
    let _opt = request.option.toJS()
    _opt.headers.Authorization = ''
    _opt.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    _opt.method = 'POST'

    let arr = request.getParamsArray(params)
    if (arr.length > 0) {
      _opt.body = arr.join('&')
    }

    return fetch(Config.api_host + url, _opt)
      .then(res => {
        return request.optResponse(res)
      })
      .then(data => {
        if (data.result == 'ok') {
          return Promise.resolve(data.data)
        } else {
          Toast.fail(data.msg)
        }
      })
      .catch(e => {
        if (e instanceof Error) {
          console.error(e.message)
        }

        if (e.message === 'Failed to fetch') {
          Toast.fail('网络异常，请稍候再试')
        }
      })
  }
}
