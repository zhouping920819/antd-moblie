import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
    Header,
    Swiper,
    Grider,
    Content,
   // Foot
} from 'commons'
class Home extends React.Component {
  render() {
    return (
      <div>
        <Header header={<FormattedMessage id="app.home.title" />} showBack showMore />
      {/*  <Swiper/>*/}
        <Grider/>
        <Content/>
      </div>
    )
  }
}

export default Home
