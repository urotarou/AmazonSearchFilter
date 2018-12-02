var targetTabId

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (tab.url.includes("https://www.amazon.co.jp/")) {
        console.log("Hello Amazon!!");
        targetTabId = tabId
        chrome.pageAction.show(tabId);
    }
});

chrome.pageAction.onClicked.addListener(() => {
    chrome.tabs.get(targetTabId, (tab) => {
        if(tab.url.includes("&emi=AN1VRQENFRJN5")) return

        var afterUrl = tab.url + "&emi=AN1VRQENFRJN5"

        console.log("before: " + tab.url);
        console.log("after : " + afterUrl);
        chrome.tabs.update({
                url: afterUrl
            });
        });
});
