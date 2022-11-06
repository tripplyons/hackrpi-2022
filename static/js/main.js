inputDiv   = document.getElementById('uploadBox');
linkInput  = document.getElementById('linkInput');



linkInput.addEventListener('keydown', function(e){
    console.log(e.key);
    if(e.key == 'Enter'){
        console.log(e)
        loading();
        fetch("/t_url?url="+linkInput.value, {
            "credentials": "omit",
            "method": "GET",
            "mode": "cors"
        }).then(function(e) {
            e.text().then(f=>{
                setCaption(f);
            });
            stopLoading();
        });
    }
})

function dragOverHandler(ev) {
    console.log('File(s) in drop zone');
    console.log("bruh")
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
                fetch('/upload_file', {method: "POST", body: formData}).then(function(e) {
                    e.text().then(f=>{
                        setCaption(f);
                    });
                });
                stopLoading();
            }
        })
    }
}
function setCaption(e) {
    console.log(e);
    texts = e.split('\n');
    var array = [];
    array.length = texts.length+1;
    console.log(texts);
    async function getSummary(k){
        console.log(texts[k]);
        if(k+1 > texts.length){
            array[array.length-1] = true;
            return false;
        } else {
            return fetch('/s_text', {method:"POST", body:k}).then(
                e.text().then(f=>{
                    console.log(f);
                    array[k]=f;
                    getSummary(k+1);
                })
            );
        }
    }
    console.log("jf");
    return array.join('\n')
}
function loading() {

}
function stopLoading() {

}