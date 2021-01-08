const baseURL = "https://api-hmugo-web.itheima.net/api/public/v1"
// ...config 接收所有参数，解构出 url
const request = ({url,...config})=>{
    return new Promise((resolve,reject)=>{
        uni.request({
            // 展开运算符把所有请求参数展开作为 request 的参数
            ...config,
            // 基本路径 + 接口API
            url: baseURL + url, 
            success: (res) => {
                resolve(res)
            },
            fail:(err)=>{
                reject(err)
            }
        });
    })
}

export default request