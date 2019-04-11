import React from 'react'
import './index.less'
import {Link} from "react-router-dom";

class Content extends React.Component {
    state = {
        dataList:[],
    };
    componentDidMount() {
        this.setState({
            dataList: [
                {
                    productName: '数据显示测试',
                    remark: '数据显示测试',
                    remark2: '测试'
                },
                {
                    productName: '数据显示测试',
                    remark: '数据显示测试',
                    remark2: '测试'
                },
                {
                    productName: '数据显示测试',
                    remark: '数据显示测试',
                    remark2: '测试'
                },
                {
                    productName: '数据显示测试',
                    remark: '数据显示测试',
                    remark2: '测试'
                },
            ],
        });
    }

    render () {
        return <div className="main-comtent">
            <div className="itemsList">
                {
                    this.state.dataList.map((val,index) => {
                       return (
                           <div className="padding8" key={index}>
                               <div className="itemContain">
                                   <div className="itemLeft">
                                       <div className="productName">
                                           {val.productName}
                                       </div>
                                       <div className="remark">{val.remark}</div>
                                   </div>
                                   <div className="itemMiddle">
                                       <div className="remark2">{val.remark2}</div>
                                   </div>
                                   <div className="itemRight">
                                       <div className="buttonContian">
                                           {
                                               index == '1' ?
                                                   (
                                                       <Link to='/counter'>
                                                           <button className="button-color" type="info">测试11</button>
                                                       </Link>
                                                   ):
                                                   (
                                                       <Link to='/clockRecord'>
                                                           <button className="button-color" type="info">测试</button>
                                                       </Link>
                                                   )
                                           }
                                       </div>
                                   </div>
                               </div>
                           </div>
                       )
                    })
                }
            </div>
        </div>
    }
}
export default Content
