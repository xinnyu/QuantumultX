const url = "https://payapp.weixin.qq.com/smbpminiapptrans/webuy/getshelflist";
const sid = $prefs.valueForKey("LW_MINIAPP_SID");

const myRequest = {
    url: `${url}?sid=${sid}&v=0.24.4&appid=wx2061e2d09d2ac76c`,
    method: "POST",
    headers: {
        "Host": "payapp.weixin.qq.com",
        "Connection": "keep-alive",
        "Content-Length": "126",
        "content-type": "application/json",
        "Accept-Encoding": "gzip,compress,br,deflate",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.41(0x18002930) NetType/WIFI Language/zh_CN",
        "Referer": "https://servicewechat.com/wx2061e2d09d2ac76c/4/page-frame.html"
    },
    body: JSON.stringify({
        "v": "0.24.4",
        "appid": "wx2061e2d09d2ac76c",
        "page_size": 20,
        "page_num": 1,
        "sid": sid
    })
};

const LAST_KEY = "laowu_last_shelf"

$task.fetch(myRequest).then(response => {
    if (!sid) {
        $notify("【老吴日单】", "Error", "先获取SID");
        $done();
    }
    let responseData;
    try {
        responseData = JSON.parse(response.body);
    } catch (error) {
        console.log("请求错误，解析JSON时发生错误" + error.message);
        $notify("【老吴日单】", "Error", "解析JSON时发生错误: " + error.message);
        $done();
    }
    const currentShelf = responseData.data?.shelf_list[0];
    if (!currentShelf) {
        console.log("请求错误，没有商品");
        $notify("【老吴日单】", "Error", "请求错误，没有商品");
        $done();
    }
    const lastShelf = $prefs.valueForKey(LAST_KEY);
    console.log(`last: ${lastShelf}, current: ${currentShelf.shelf_info}`);
    if (lastShelf && currentShelf.shelf_info !== lastShelf) {
        $notify("【老吴日单】", "", "发现新东西！！！！！！！！！");
    } else {
        $notify("【老吴日单】", "", "没有更新");
    }
    $prefs.setValueForKey(currentShelf.shelf_info, LAST_KEY);
    $done();
}, reason => {
    $notify("Error", "", reason.error);
    $done();
});
