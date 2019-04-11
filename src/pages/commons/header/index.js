/**
 * 公共的头部
 *
 * landenli
 */
import React from 'react'
import { NavBar, Icon } from 'antd-mobile'
import PropTypes from 'prop-types'
import './index.less'

class Header extends React.Component {
  // 注入context，获得router
  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  render() {
    return (
      <NavBar
        mode="light"
        icon={this.getLeftIcon()}
        onLeftClick={this.handleLeftClick}
        rightContent={this.getRightIcon()}
      >
        {this.props.header}
      </NavBar>
    )
  }

  /**
   * 定义左侧按钮
   */
  getLeftIcon = () => {
    if (this.props.showBack) {
      return <Icon type="left" />
    }
    return null
  }

  /**
   * 定义右侧按钮
   */
  getRightIcon = () => {
    if (this.props.showMore) {
      return <Icon type="ellipsis" />
    }
    return null
  }

  /**
   * 左侧按钮点击事件
   */
  handleLeftClick = () => {
    this.context.router.history.goBack()
  }
}
export default Header
