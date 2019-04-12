import React from 'react'
import './index.less'
import { Carousel, WingBlank } from 'antd-mobile';

class Swiper extends React.Component {
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        flag: false,
    }

    componentDidMount() {
        this.setState({
            flag: true,
            data: [
                'https://zos.alipayobjects.com/rmsportal/AiyWuByWklrrUDlFignR.png',
                'https://zos.alipayobjects.com/rmsportal/TekJlZRVCjLFexlOCuWn.png',
                'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYdTyaDTRVrLI.png'
            ]
        });
    }
    render () {
        return (
            <div className="main-carousel">
                <WingBlank>
                    <Carousel
                        autoplay={this.state.flag}
                        infinite
                        beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                        afterChange={index => console.log('slide to', index)}
                    >
                        {this.state.data.map(val => (
                            <a
                                key={val}
                                href= "http://www.baidu.com"
                                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                            >
                                <img
                                    src={val}
                                    alt=""
                                    style={{ width: '100%', verticalAlign: 'top' }}
                                    onLoad={() => {
                                        // fire window resize event to change height
                                        window.dispatchEvent(new Event('resize'));
                                        this.setState({ imgHeight: 'auto' });
                                       // imgHeight: this.state.imageHeight
                                    }}
                                />
                            </a>
                        ))}

                    </Carousel>
                </WingBlank>
            </div>
        )
    }
}

export default Swiper
