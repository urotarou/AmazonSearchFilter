var targetTabId

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return

    if (tab.url.startsWith("https://www.amazon.co.jp/")) {
        console.log("Hello Amazon!!")

        targetTabId = tabId
        chrome.action.enable(tabId)
    }
})

chrome.action.onClicked.addListener(() => {
    chrome.tabs.get(parseInt(targetTabId), (tab) => {
        if(tab.url.includes("AN1VRQENFRJN5")) return

        var newUrl = tab.url + "&emi=AN1VRQENFRJN5"

        console.log("old: " + tab.url)
        console.log("new : " + newUrl)

        chrome.tabs.update({"url": newUrl})
    })
})
