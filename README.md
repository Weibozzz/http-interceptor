## http-interceptor
模仿axios实现自定义网络请求拦截器,支持微信小程序拦截,ajax拦截,支付宝小程序等等

## Usage

```js
const axios = new Axios({
      // defaults 公共请求参数可选
      defaults: {
      },
      // dispatchRequest 自定义请求必传
      dispatchRequest (params) {
      }
})
axios.request(params)
.then()
.catch()
```

## Interceptors
You can intercept requests or responses before they are handled by then or catch.

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

## Example

```js
const axios = new Axios({
    defaults: {
      common: 123
    },
    dispatchRequest (params) {
      return new Promise((resolve, reject) => {
        $.ajax('http://www.liuweibo.cn:7654/api/getBlog?type=all&num=1&pageNum=10&wd=', {
          success: function (res) {
            resolve(res)
          },
          fail: function (err) {
            reject(err)
          }
        })
      });
    }
  })
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log('request')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    console.log('response')
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
  axios.request({
    b: '222'
  }).then( res => {
    console.log(res)
  }).catch(err => {
    console.log('err', err)
  })
```
