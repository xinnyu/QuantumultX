(async () => {
    if (typeof $request != "undefined") {
        // 解析URL
        const parsedUrl = new URL($request.url);
        // 获取sid参数的值
        const sid = parsedUrl.searchParams.get("sid");
        if (sid) {
            // 保存sid
            $prefs.setValueForKey(sid, "LW_MINIAPP_SID");
        } else {
            $notify("【老吴日单】", "SID", "获取SID失败: sid not found in the URL.");
        }
    } else {
        $notify("【老吴日单】", "SID", "获取SID失败: request undefined.");
    }
})().finally(() => {
    $.done();
});

