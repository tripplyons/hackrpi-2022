inputDiv = document.getElementById('uploadBox');
linkInput = document.getElementById('linkInput');
goButton = document.getElementById('GoButton');
guiBox = document.getElementById('uploadBox');
resultsDisplay = document.getElementById('resultsDisplay');
resetButton = document.getElementById('resetButton');


resultsDisplay.style.display = "none";
selectionInterface = document.getElementById('selectionInterface');
detailsModal = document.getElementById('DetailedResultsModal');
closeSpan = document.getElementById("closeSpan");

resetButton.onclick = () => {
    uploadForm.reset();
    location.reload();
}

document.onload = () => {
    uploadForm.reset();
}

window.onclick = function (event) {
    if (event.target == detailsModal) {
        detailsModal.style.display = "none";
    }
}

closeSpan.onclick = function () {
    detailsModal.style.display = "none";
}

linkInput.addEventListener('keydown', uploadLink)
goButton.onclick = uploadLink;

inputDiv.style = 'cursor: pointer;'

function showError() {
    alert("Error");
}

function uploadLink(e) {
    if (!e.key || e.key == 'Enter') {
        console.log(e)
        loading();
        fetch("/g_url?url=" + linkInput.value, {
            "credentials": "omit",
            "method": "GET",
            "mode": "cors"
        }).then(function (response) {
            if (!response.ok) {
                showError();
            } else {
                response.text().then(f => {
                    setCaption(f).then(stopLoading);
                });
            }
            stopLoading();
        });
    }
}
function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}

function dropHandler(ev) {
    console.log('File(s) dropped');
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items aren't files, reject them
            if (item.kind === 'file') {
                const file = item.getAsFile();
                console.log(file);
                let formData = new FormData();

                formData.append("file", file);
                fetch('/upload_file', { method: "POST", body: formData }).then(function (e) {
                    if (!e.ok) {
                        showError();
                    }
                    else {
                        e.text().then(f => {
                            setCaption(f).then(stopLoading);
                        });
                    }
                });
            }
        })
    }
}
async function setCaption(e) {
    resultsDisplay.style.display = "block";
    selectionInterface.style.display = "none";

    console.log(e);
    texts = e.split('\n');
    console.log(texts);
    var array = [];
    async function getSummary(text) {
        let res = await fetch('/s_text', { method: "POST", body: text });
        return await res.text();
    }

    resultsList = document.getElementById('resultsList');
    for (let i = 0; i < texts.length; i++) {
        console.log(texts[i]);
        array.push(await getSummary(texts[i]));
        // display things
        list = document.createElementNS("http://www.w3.org/1999/xhtml", 'li');
        list.innerHTML = array[i];
        list.style = 'cursor:pointer'
        list.onclick = function () {
            console.log(i);
            displayDetailsModal('', ''+texts[i]);
        }

        resultsList.append(list);
    }
    return array.join('\n')
}

function loading() {
    selectionInterface.style.display = 'none';
    resultsDisplay.style.display = 'block';
    console.log("STARTED LOADING");
}
function stopLoading() {
    console.log("STOPPED LOADING");
}
function displayDetailsModal(title, message) {
    var infoText = document.getElementById("DetailedResultsModalText");
    infoText.innerHTML = message;
    detailsModal.style.display = "block";
}

