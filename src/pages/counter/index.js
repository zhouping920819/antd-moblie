import React from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd-mobile'
import { increment, decrement } from '../redux/action'
import { FormattedMessage} from 'react-intl'

import { Header } from 'commons'

@connect(
  state => ({count: state.getIn(['count'])}),
  {increment, decrement}
)
class Counter extends React.Component {

  render() {
    return (
      <div>
          <Header
              header={<FormattedMessage id="app.clockRecord.title" />}
              showBack
              showMore
          />
        Counter: {this.props.count}
        <Button type="ghost" onClick={this.props.increment}>+11</Button>
        <Button type="ghost" onClick={this.props.decrement}>-</Button>
      </div>
    )
  }
}

export default Counter

