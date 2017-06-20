import axios from 'axios'
// import qs from 'qs'

import { HTTP_DEV, HTTP, DEBUG} from './config'

const HTTPS = DEBUG ? HTTP_DEV : HTTP

axios.defaults.withCredentials = true
const config = {
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

class XHR {
// 微信JSSKD授权接口
    wxConfig () {
        return axios.post(`${HTTPS}api/nr/nbwx/GetJ`, '', config)
    }

    isErr (res, self) {
        setTimeout(() => {
            self.$Modal.error({
                title: res.msg,
                content: res.msg
            })
        }, 400)
    }
}

// 实例化后再导出
export default new XHR()
