import {commonParams,options} from "./config"
import axios from 'axios'

export function getdatabyAxios() {
  const url="/root/new"

  const data=Object.assign({},commonParams,{
    loc: 0,
    from: 'news_webapp',
    pd: 'webapp',
    os: 'android',
    ver: 6,
    category_id: 102,
    action: 1,
    display_time: 0,
    wf: 0,
  })

  return axios.get(url,{
    params:data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
