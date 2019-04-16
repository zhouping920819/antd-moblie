const path = require('path')
const url = require('url')
const fs = require('fs')

const jsdom = require('jsdom')
const { JSDOM } =  jsdom ;


let getJuejinUrl = 'http://www.jiuyaocha.cn/idcard/id_652325.html'
let http= url.parse(getJuejinUrl)['protocol'].includes('https') ? require('https'): require('http')
let option = url.parse(getJuejinUrl)

function getData (argreUrl,success=null) {
    http.get(getJuejinUrl,res => {
        if(res.statusCode == 200){
            let html = ''
            res.setEncoding('utf-8')
            res.on('data',(item) => {
                html += item
            })
            res.on('end',function () {
                success & success(html)
            })
        }else if(res.statusCode == 302 || res.statusCode == 301){
            getData(res.headers.location, success)
        }
    }).on('error',function(error){
        console.log('error======'+error)
    })
}
getData(getJuejinUrl,success)

function success (html) {
    console.log('html===='+html)
    const dom = new JSDOM(`${html}`)
    const document = dom.window.document
    let targetDom = document.querySelectorAll('.mcon')
    if (targetDom.length) {
        targetDom = targetDom[0]
    } else
        return false
    let arr = targetDom.querySelectorAll('tbody > tr')
    let jsonStr = []

    arr.forEach(el => {
        let list = el.querySelectorAll('td')
        let obj = {}
        obj.name = list[0].textContent
        obj.id = list[1].textContent
        jsonStr.push(obj)
    });
    //console.log('jsonStr======='+jsonStr)
    fs.writeFile(path.join(__filename, '../../src/utils/getDownload.html'),
        `export const getDownload =  ${JSON.stringify(jsonStr)}`,
        'utf8',
        (err) => {
            if (err) throw err;
            console.log('网页爬去结束')
        })
}
