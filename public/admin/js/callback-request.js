//getting all request from database
async function getCallbackRequests() {
    return await fetch('http://localhost:3000/callback-request')
                     .then((response) => response.json())
                     .then((data) => data)
}

let requestsBlock = document.querySelector('#v-pills-callback')

requestsBlock.addEventListener('click', function(e) {
    if(e.target.classList.contains('btn-remove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value
        fetch('http://localhost:3000/callback-request/' +id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go()) 
    }
})