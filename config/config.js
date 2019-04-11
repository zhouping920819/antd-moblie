/**
 * 全局的配置信息
 *
 * landenli
 */

export default {
  // 控制开发环境是否默认走mock数据，生产环境强制不走mock
  get_mock_data: true,

  // 服务器请求地址
  api_host: 'https://127.0.0.1',

  // 语言 zh / en ，注：只会在开发环境生效，生产环境自动读系统语言
  i18n_locale: 'zh'
}
