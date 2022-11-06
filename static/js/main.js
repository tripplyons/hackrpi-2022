inputDiv = document.getElementById('uploadBox');
linkInput = document.getElementById('linkInput');
goButton = document.getElementById('GoButton');
guiBox = document.getElementById('uploadBox');
finalGuiBox = document.getElementById('gui_box');
resultsDisplay = document.getElementById('resultsDisplay');
resetButton = document.getElementById('resetButton');
buttonDiv = document.getElementById('buttonDiv');
downloadButton = document.getElementById('DownloadButton');
loader = document.createElement('div');
loader.style['margin-bottom'] = '20px';
loader.style['margin-top'] = '20px';
loader.id = 'loader_wrapper';
var bigArray = [];
k = document.createElement('object');
k.data = '/static/bars.svg';
k.type = "image/svg+xml";
k.width = 50;
k.height = 50;
loader.appendChild(k);

resultsDisplay.style.display = "none";
selectionInterface = document.getElementById('selectionInterface');
detailsModal = document.getElementById('DetailedResultsModal');
closeSpan = document.getElementById("closeSpan");

resetButton.onclick = () => {
    location.reload();
}

window.onclick = function (event) {
    if (event.target == detailsModal) {
        detailsModal.style.display = "none";
    }
}
downloadButton.onclick = function () {
    bruh = prompt('File name:', 'summary.txt');
    download(bruh ? bruh : 1, bigArray.join('\n'))
}
closeSpan.onclick = function () {
    detailsModal.style.display = "none";
}
linkInput.onclick = e => {
    linkInput.placeholder = "";
}
linkInput.addEventListener('keydown', uploadLink);
goButton.onclick = uploadLink;

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
                    setCaption(f);
                });
            }
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
                loading();

                formData.append("file", file);
                fetch('/upload_file', { method: "POST", body: formData }).then(function (e) {
                    if (!e.ok) {
                        showError();
                    }
                    else {
                        e.text().then(f => {
                            setCaption(f);
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
    texts = e.split('\n');
    texts = texts.filter(e => e.length);
    console.log(texts);
    var array = [];
    async function getSummary(text) {
        let res = await fetch('/s_text', { method: "POST", body: text });
        return await res.text();
    }

    resultsList = document.getElementById('resultsList');
    for (let i = 0; i < texts.length; i++) {
        console.log(array);
        console.log(texts[i]);
        array.push(await getSummary(texts[i]));
        // display things
        list = document.createElementNS("http://www.w3.org/1999/xhtml", 'li');
        list.innerHTML = array[i];
        list.style = 'cursor:pointer'
        resultsList.style.display = 'block';
        loader.style['margin-top'] = '0px';
        list.onclick = function () {
            console.log(i);
            displayDetailsModal('', '' + texts[i]);
        }

        resultsList.append(list);
    }
    stopLoading();
    bigArray = array;
    return array.join('\n')
}

function loading() {
    selectionInterface.style.display = 'none';
    resultsDisplay.style.display = 'block';
    resultsList.style.display = 'none';
    finalGuiBox.appendChild(loader);
    buttonDiv.style.display = 'none';
    console.log("STARTED LOADING");
}
function stopLoading() {
    finalGuiBox.removeChild(loader);
    buttonDiv.style.display = 'inline';
    console.log("STOPPED LOADING");
}
function displayDetailsModal(title, message) {
    var infoText = document.getElementById("DetailedResultsModalText");
    infoText.innerHTML = message;
    detailsModal.style.display = "block";
    closeSpan.style.width = closeSpan.offsetHeight + 'px'
}


function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}