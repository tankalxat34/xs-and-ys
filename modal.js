var modal = document.getElementById("myModal");

var btn_close = document.getElementById("btn-modal-close")

function modalClose(event = null) {
    modal.style.display = "none";
    document.getElementById("modal-title").innerText = new String()
    document.getElementById("modal-text").innerText = new String()
    
    try {
        document.getElementById("btn-modal-callback").remove()
    } catch {
        null;
    }
}

function modalShow(title = "title text", text = "modal text", callback = null, callback_text = "OK", close_after_callback = true, closeable_on_window = true) {
    modal.style.display = "block";

    document.getElementById("modal-title").innerHTML = title
    document.getElementById("modal-text").innerHTML = text

    if (callback) {
        let btn_callback = document.createElement("button")
        btn_callback.classList = "prim radius-round"
        btn_callback.id = "btn-modal-callback"
        btn_callback.onclick = () => {
            if (close_after_callback) modalClose()
            callback()
        }
        btn_callback.innerText = callback_text

        document.getElementById("modal-keyboard").appendChild(btn_callback)
    }

    if (closeable_on_window) {
        window.onclick = (event) => {
            if (event.target == modal) {
                modalClose(event)
            }
        }
    }
}

btn_close.addEventListener("click", () => modalClose())