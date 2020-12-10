function ajax(options) {
    if (options.url === undefined || typeof(options.url) !== 'string') {
        throw new Error ('您的url 不对')
    }
    if(! (options.method === undefined || /^(get|post)$/i.test(options.method))) {
        throw new Error('目前只支持 GET 和 POST 方式')
    }
    if (!(options.data === undefined || /^(.+=.+&?)*$/i.test(options.data))) {
        throw new Error('请按照格式传递数据')
    }
    if (!(options.async === undefined || typeof(options.async) === 'boolean')) {
        throw new Error('async 只接受布尔类型')
    }
    if (!(options.success === undefined || typeof(options.success) === 'function')) {
        throw new Error('success 必须是一个函数类型')
    }
    const _default = {
        url: options.url,
        method: options.method || 'GET',
        data: options.data || '',
        async: typeof(options.async) === 'boolean' ? options.async : true,
        success: options.success || function () {}
    }
    if (_default.method.toUpperCase() === 'GET' && _default.data !== '') {
        _default.url = _default.url + '?' + _default.data
    }
    const xhr = new XMLHttpRequest()
    xhr.open(_default.method,_default.url,_default.async)
    xhr.onload = function () {
        _default.success(xhr.responseText)
    }
    if (_default.method.toUpperCase() === 'POST') {
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded')
        xhr.send(_default.data)
    } else {
        xhr.send()
    }
}
function pAjax(options) {
    const p = new Promise(function (resolve, reject) {
        ajax({
            url: options.url,
            data: options.data,
            async: options.async,
            method: options.method,
            success (res) {
                resolve(res)
            }
        })
    })
    return p
}