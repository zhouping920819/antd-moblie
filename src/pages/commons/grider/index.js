import React from 'react'
import './index.less'
import { Grid } from 'antd-mobile';

class Grider extends React.Component {
    componentDidMount () {
    }
    render () {
        return (
                <div>
                <Grid data={ Array.from(new Array(8)).map((_val, i) => ({
                        icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
                        text: `name${i}`,
                    }))} hasLine={false} />
                </div>
        )
    }
}

export default Grider
