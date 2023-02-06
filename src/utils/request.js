import axios from 'axios'

// 1.创建一个单例（实例）
const instance = axios.create({
    //一个接口前的统一地址
    baseURL: import.meta.env.VITE_APP_BASE_API,
    //超时的时间
    timeout: 10000, 
});

// 响应拦截器
instance.interceptors.response.use(res => {
    return  Promise.resolve(res.data)
})

// 通用下载方法
export function download(url, params, filename, config) {
    downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
    return service.post(url, params, {
      transformRequest: [(params) => { return tansParams(params) }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'blob',
      ...config
    }).then(async (data) => {
      const isLogin = await blobValidate(data);
      if (isLogin) {
        const blob = new Blob([data])
        saveAs(blob, filename)
      } else {
        const resText = await data.text();
        const rspObj = JSON.parse(resText);
        const errMsg = errorCode[rspObj.code] || rspObj.msg || errorCode['default']
        ElMessage.error(errMsg);
      }
      downloadLoadingInstance.close();
    }).catch((r) => {
      console.error(r)
      ElMessage.error('下载文件出现错误，请联系管理员！')
      downloadLoadingInstance.close();
    })
  }
  

//整体暴露
export default instance;