export default class Request {
    /*
     *  get请求
     *  url:请求地址
     *  params:参数
     *  callback:回调函数
     */
    static get(url, params, callback) {
        if (JSON.stringify(params) !== "{}") {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        fetch(url, { method: 'GET', })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.log(error)
            });
    }

    /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数格式是：{param1: 'value1',param2: 'value2'}
     *  callback:回调函数
     */
    static postJSON(url, params, callback) {
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params)
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.log("error = " + error)
            });
    }

    /*
     *  post请求
     *  url:请求地址
     *  params:参数,这里的参数要用这种格式：'key1=value1&key2=value2'
     *  callback:回调函数
     */
    static postForm(url, params, callback) {
        //fetch请求
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params
        })
            .then((response) => response.json())
            .then((responseJSON) => {
                callback(responseJSON)
            })
            .catch((error) => {
                console.log("error = " + error)
            });
    }
}