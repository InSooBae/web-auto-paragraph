// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");
let changeColor1 = document.getElementById("changeColor1");

chrome.storage.sync.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: setPageBackgroundColor,
    });
});

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor1.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: reddenPage,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
    });
}

// click extension plugin
function reddenPage() {
    let text = document.querySelector("body").innerText;

    function code(result) { // After executing 'code' (callback)
        //이 문서에서 body 태그 아래에 있는 모든 텍스트를 가져온다
        var bodyText = result;

        bodyText.replaceAll("\n", "<br/><br/><br/>")

        //id 값이 result인 태그에 결과를 추가한다
        document.querySelector("body").innerText = bodyText;
    }

    code(text);
}

