//生成时间戳
let timestamp = new Date().getTime()
    //生成随机字符串
function randomString(len) {
    len = len || 32;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789';
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
        pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}
let nonceStr = randomString(16)

//配置
function setConfig(timestamp, nonceStr, signature, jsList) {
    console.log("canshu", timestamp, nonceStr, signature, jsList)

    return wx.config({
        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wx3991aa10153e8449', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature, // 必填，签名
        jsApiList: jsList // 必填，需要使用的JS接口列表
    });
}
//获取配置权限
function getconfig(timestamp, nonceStr, wxList) {
    let openid = localStorage.getItem("openid")
    let turl = location.href
    $.ajax({
        url: baseUrl + "/api/third/generateAuthSignature",
        method: "POST",
        data: {
            openid: openid,
            timestamp: timestamp,
            deviceId: nonceStr,
            deviceType: "3",
            url: turl
        },
        dataType: "json",
        success: function(res) {
            console.log("获取签名", res)
            let data = res.data
            setConfig(data.timestamp, data.noncestr, data.signature, wxList)
        }
    })
}