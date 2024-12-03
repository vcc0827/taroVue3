import Taro from '@tarojs/taro';
const config = {
  rpcURL: 'https://mini.midonglab.com/gateway/api/jsonrpc.jsp',
  participantAPI: 'blind@mini.paticipant',
};

class RpcClient {
  constructor() {
    const store_cookie = Taro.getStorageSync('mew.rpc.cookie');
    const cookie = store_cookie ? JSON.parse(store_cookie) : undefined;
    this.cookie = cookie;
    this.acquireListeners = [];
  }
  directRPC(method, parameters, callback) {
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    if (this.cookie) {
      headers['Cookie'] = this.cookie;
    }
    const baseUrl = config.rpcURL;
    const methodParam = process.env.NODE_ENV === 'development' ? `?${method && method.split('mini.')[1]}` : '';
    Taro.request({
      url: `${baseUrl}${methodParam}`,
      method: 'POST',
      data: JSON.stringify({
        jsonrpc: '2.0',
        method: method,
        params: parameters,
        id: new Date().getTime().toString() + '.' + Math.round(Math.random() * 0xffff),
      }),
      header: headers,
      fail: callback,
      timeout: 5000,
      success: (result) => {
        try {
          var response = result.data;
          let cookie = Object.keys(result.header).filter((key) => /^set\-cookie$/i.test(key))[0];

          if (cookie) {
            this.cookie = result.header[cookie].split(';')[0];
            Taro.setStorageSync('mew.rpc.cookie', JSON.stringify(this.cookie));
          }

          if (!response) {
            callback(new Error('Empty result data'));
            return;
          }

          if (response.error) {
            let error = new Error(response.error.msg);
            error.code = response.error.code;
            callback(error);
            return;
          }

          callback(null, response.result);
        } catch (error) {
          console.error(error);
          callback(error);
        }
      },
    });
  }
  rpc(method, parameters, callback) {
    if (this.acquireListeners.length) {
      this.acquireListeners.push(
        function () {
          setTimeout(() => {
            this.directRPC(method, parameters, callback);
          }, 50);
        }.bind(this),
      );
    } else {
      this.directRPC(method, parameters, (error, result) => {
        if (error && error.code == RpcClient.ERROR_NEED_TOKEN) {
          this.acquireToken((error, _result) => {
            if (error) {
              callback(error);
            } else {
              this.directRPC(method, parameters, callback);
            }
          });
        } else {
          callback(error, result);
        }
      });
    }
  }
  acquireToken(callback) {
    let client = this;
    client.acquireListeners.push(callback);
    if (client.acquireListeners.length == 1) {
      let login = Taro.login;
      let times = 1;
      if (typeof times !== 'number') {
        times = 1;
      }
      if (times < 1) {
        times = 1;
      }
      const tryLogin = (error) => {
        --times;
        if (times < 0) {
          if (!error) {
            error = new Error('Unknown Error');
          }
          var listeners = client.acquireListeners.slice(0);
          client.acquireListeners.length = 0;
          listeners.forEach(function (listener) {
            try {
              listener(error);
            } catch (error) {
              console.error(error);
            }
          });
          return;
        }
        login({
          success: (res) => {
            if (res.code) {
              this.directRPC(config.participantAPI, [res.code], function (error, result) {
                if (error) {
                  tryLogin(error);
                  return;
                }
                const listeners = client.acquireListeners.slice(0);
                client.acquireListeners.length = 0;
                listeners.forEach(function (listener) {
                  try {
                    listener(null, result);
                  } catch (error) {
                    console.error(error);
                  }
                });
              });
            } else {
              const listeners = client.acquireListeners.slice(0);
              client.acquireListeners.length = 0;
              listeners.forEach(function (listener) {
                let error = new Error(res.errMsg);
                try {
                  listener(error);
                } catch (error) {
                  console.error(error);
                }
              });
            }
          },
          fail: (res) => {
            const listeners = client.acquireListeners.slice(0);
            client.acquireListeners.length = 0;
            listeners.forEach(function (listener) {
              let error = new Error(res.errMsg);
              try {
                listener(error);
              } catch (error) {
                console.error(error);
              }
            });
          },
        });
      };
      tryLogin();
    }
  }
}

RpcClient.ERROR_NEED_TOKEN = 592;
const rpcClient = new RpcClient();

const buildProxy = function (name, context) {
  return new Proxy(
    function () {
      const parameters = Array.prototype.slice.call(arguments, 0);
      return new Promise(function (resolve, reject) {
        rpcClient.rpc(context.join('@') + '.' + name, parameters, function (error, result) {
          if (error) {
            if (error.errMsg === 'request:fail timeout') {
              console.error('网络连接失败,请检查你的设置');
            }
            reject(error);
          } else {
            resolve(result);
          }
        });
      });
    },
    {
      get(target, method) {
        if (!target[method]) {
          target[method] = buildProxy(method, context.concat([name]));
        }
        return target[method];
      },
    },
  );
};

export const rpc = new Proxy(
  {},
  {
    get(target, domain) {
      if (!target[domain]) {
        target[domain] = new Proxy(
          {},
          {
            get(subTarget, method) {
              if (['bind', 'length', 'name'].indexOf(method) < 0) {
                if (!subTarget[method]) {
                  subTarget[method] = buildProxy(method, [domain]);
                }
                return subTarget[method];
              } else {
                return subTarget[method];
              }
            },
          },
        );
      }
      return target[domain];
    },
  },
);
