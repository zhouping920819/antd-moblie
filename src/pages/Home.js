import React from 'react'
import { FormattedMessage } from 'react-intl'

import {
    Header,
    Swiper,
    Grider,
    Content,
    Footer
} from 'commons'
//import { Footer } from './commons';
class Home extends React.Component {
  render() {
    return (
      <div>
        <Header header={<FormattedMessage id="app.home.title" />} showBack showMore />
        <Swiper/>
        <Grider/>
        <Content/>
        <Footer/>
      </div>
    )
  }
}

export default Home
