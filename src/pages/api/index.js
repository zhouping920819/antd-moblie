import { Fetch } from 'commons'

/**
 * 查询测试记录
 */
export async function getClockRecordList(params) {
    console.log('params====='+params)
    // debugger
    //params.getMockData = true
    return Fetch.get(`/employee/web/employee/searchEmployee`, params)
}
