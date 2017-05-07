# 获取url查询参数

```
//简易版
function parse(url){
    url = url || window.location.href;
    if( !/\?/.test(url) ) return false;
    url = String(url).split('?').pop();

    var params = {};
    if( url && /=/.test(url) ){
        url.split('&').forEach( v => {
            var part = v.split('=');
            var name = part[0];
            var value = part[1];
            params[name] = value;
        })
    }
    return params;
}
console.log(parse('?a=1&b=1'));     //{a: "1", b: "1"}

//完整版
function parseUrl(url){
    url = url || window.location.href;
    if( !/\?/.test(url) ) return false;
    var search = String(url).split('?').pop();

    var params = {};
    if( /=/.test(search) ){
        search.split('&').forEach( v => {
            var parts = v.split('=');
            var name = parts.shift();
            var value = parts.join('=');

            if( /\[]$/.test(name) || typeof params[name] !== 'undefined' ){
                name = name.replace(/\[]$/, '');
                params[name] = params[name] || [];
                if( Object.prototype.toString.call(params[name]) !== '[object Array]' ){
                    params[name] = [params[name]];
                }
                params[name].push(value);
            }else if( /\[.+]$/.test(name) ){
                var key = name.match(/\[(.+)]$/)[1];
                name = name.replace(/\[.+]$/, '');
                params[name] = params[name] || {};
                params[name][key] = value;
            }else{
                params[name] = value;
            }
        })
    }
    return params;
}
console.log(parseUrl('?a=1&a=2&b=1=2&c[]=1&c[]=2&d[a]=1&d[b]=2&e=1&e[]=2&f'));      
//{a: [1, 2], b: "1=2", c: [1, 2], d: {a: "1", b: "2"}, e: [1, 2], f: ""}
```