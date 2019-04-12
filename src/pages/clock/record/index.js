/**
 * 测试记录
 *
 * landenli
 */

import React from 'react'
import ReactDOM from 'react-dom'
import { ListView } from 'antd-mobile'
import { connect } from 'react-redux'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'

import { Header } from 'commons'
import { getClockRecordList } from '../../redux/action'
import './index.less'

@connect(
  state => ({ clockRecord: state.get('clockRecord') }),
  { getClockRecordList }
)
class ClockRecord extends React.Component {
  constructor(props) {
    super(props)
    console.log('props====='+props)
    const dataSource = new ListView.DataSource({
      getRowData: this.getRowData,
      getSectionHeaderData: this.getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    })

    this.state = {
      dataSource: dataSource.cloneWithRows({}),
      isLoading: true,
      height: (document.documentElement.clientHeight * 3) / 4
    }
  }

  componentDidMount() {
    const hei =
      document.documentElement.clientHeight -
      ReactDOM.findDOMNode(this.lv).parentNode.offsetTop
    this.setState({
      isLoading: false,
      height: hei
    })
    this.props.getClockRecordList()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.clockRecord !== this.props.clockRecord) {
      const clockRecordList = nextProps.clockRecord
        .get('clockRecordList')
        .toJS()
      this.setState({
        isLoading: false,
        dataSource: this.state.dataSource.cloneWithRows(clockRecordList.content)
      })
    }
  }

  render() {
    // 手动调用formatMessage
    console.log(
      'this.props',
      this.props.intl.formatMessage({ id: 'app.clockRecord.title' })
    )
    return (
      <div className="clockRecord">
        <Header
          header={<FormattedMessage id="app.clockRecord.title" />}
          showBack
          showMore
        />
        <ListView
          ref={el => (this.lv = el)}
          dataSource={this.state.dataSource}
          renderFooter={() => (
            <div style={{ padding: 30, textAlign: 'center' }}>
              {this.state.isLoading ? 'Loading...' : 'Loaded'}
            </div>
          )}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          style={{
            height: this.state.height,
            overflow: 'auto'
          }}
          scrollRenderAheadDistance={500}
          onEndReached={this.onEndReached}
          onEndReachedThreshold={10}
        />
      </div>
    )
  }

  /**
   * 渲染行数据
   */
  renderRow = (rowData, sectionID, rowID) => {
    return (
      <div key={rowID} className="rowItem">
        <div>{rowData.date}</div>
        <div>{rowData.address}</div>
        <div>{rowData.desc}</div>
      </div>
    )
  }

  /**
   * 渲染每行间隔
   */
  renderSeparator = (sectionID, rowID) => (
    <div key={`${sectionID}-${rowID}`} className="section" />
  )

  /**
   * 触发下拉分页
   */
  onEndReached = event => {
    if (this.state.isLoading && !this.state.hasMore) {
      return
    }
    this.setState({ isLoading: true })
    this.props.getClockRecordList()
  }

  /**
   * 解析头数据
   */
  getSectionData = (dataBlob, sectionID) => {
    return dataBlob[sectionID]
  }

  /**
   * 获取行数据
   */
  getRowData = (dataBlob, sectionID, rowID) => {
    return dataBlob[sectionID][rowID]
  }
}

export default injectIntl(ClockRecord)
