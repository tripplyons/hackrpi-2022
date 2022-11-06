inputDiv = document.getElementById('uploadBox');
linkInput = document.getElementById('linkInput');
goButton = document.getElementById('GoButton');
guiBox   = document.getElementById('gui_box');
resultsDisplay = document.getElementById('resultsDisplay');
resultsDisplay.style.display = "none";
selectionInterface = document.getElementById('selectionInterface');

linkInput.addEventListener('keydown', uploadLink)
goButton.onclick = uploadLink;
onclick="document.getElementById('fileInput').click();" 
function uploadLink(e) {
    console.log('bruh');
    if (!e.key || e.key == 'Enter') {
        console.log(e)
        loading();
        fetch("/g_url?url=" + linkInput.value, {
            "credentials": "omit",
            "method": "GET",
            "mode": "cors"
        }).then(function (e) {
            e.text().then(f => {
                setCaption(f).then(stopLoading);
            });
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
                    e.text().then(f => {
                        setCaption(f).then(stopLoading);
                    });
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
    var array = [];
    console.log(texts);
    async function getSummary(k) {
        let res = await fetch('/s_text', { method: "POST", body: texts[k] });
        return await res.text();
    }

    resultsList = document.getElementById('resultsList');
    for (var i = 0; i < texts.length; i++) {
        array.push(await getSummary(i));
        // display things
        resultsList.innerHTML += `<li>${array[i]}</li>`;
    }
    return array.join('\n')
}


function loading() {
    console.log("STARTED LOADING");
}
function stopLoading() {
    console.log("STOPPED LOADING");
}