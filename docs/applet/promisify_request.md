# promise化API request

```
function promisifyRequest(options) {
  return new Promise((resolve, reject) => {
    options.success = res => {
      if (res.statusCode && /^2\d*/.test(res.statusCode)) {
        resolve(res.data)
      } else {
        console.warn(options.url, options.data, res)
        reject(res.data) //如果不需要依据错误码进行逻辑处理可直接输出`res.data.error || '请求出错'`
      }
    }
    options.fail = err => {
      console.error(options.url, options.data, err)
      reject({ error: err }) //把err放置在对象里是方便调用reject时取error方便
    }
    wx.request(options)
  })
}

promisifyRequest({
      url: 'xx',
    })
    .then( res => {
        // to do
    })
    .catch( err => {
        // to do
    })
```