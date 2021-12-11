let body = document.querySelector("body");
const br = document.createElement("br");

body.addEventListener("click", selectText, false);


function selectText() {
    // 드래그 했을 시
    if (!document.getSelection().isCollapsed) {
        document.getSelection().baseNode.parentNode.appendChild(document.createElement("br"))
        console.log("됨");
    }
}

