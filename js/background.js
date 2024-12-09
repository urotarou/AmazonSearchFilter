const VALID_URLS = ["https://www.amazon.co.jp/"];
const QUERY_AMAZON_ONLY = "&rh=p_6%3AAN1VRQENFRJN5";

chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    
    updateActionState(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== "complete") return;

    updateActionState(tab);
});

chrome.action.onClicked.addListener((tab) => {
    if(tab.url.includes(QUERY_AMAZON_ONLY)) return;

    const newUrl = tab.url + QUERY_AMAZON_ONLY;

    console.log("old: " + tab.url);
    console.log("new: " + newUrl);

    chrome.tabs.update({"url": newUrl});
});

function updateActionState(tab) {
    const isValidUrl = VALID_URLS.some((validUrl) => {
        return tab.url.startsWith(validUrl);
    });

    if (tab.url && isValidUrl) {
        console.log(`enable: [${tab.title}](${tab.url})`);
        chrome.action.enable(tab.id);
    } else {
        console.log(`disable: [${tab.title}](${tab.url})`);
        chrome.action.disable(tab.id);
    }
}
