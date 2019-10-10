class InterceptorManager {
  constructor() {
    this.handlers = []
  }
  use(fulfilled, rejected){
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    })
    return this.handlers.length - 1;
  }
  forEach(fn){
    this.handlers.forEach(param => {
      if(fn!=null){
        fn(param)
      }
    })
  }
}
class Axios {
  constructor(defaults) {
    this.defaults = defaults
    this.interceptors = {
      request: new InterceptorManager(),
      response: new InterceptorManager(),
    }
  }
  request(config){
    const params = {...config, ...this.defaults.defaults}
    const chain = [this.defaults.dispatchRequest, undefined]
    this.interceptors.request.forEach(interceptor => {
      chain.unshift(interceptor.fulfilled, interceptor.rejected)
    })
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor.fulfilled, interceptor.rejected)
    })
    let promise = Promise.resolve(params);
    while (chain.length){
      promise = promise.then(chain.shift(), chain.shift())
    }
    return promise;
  }
}
