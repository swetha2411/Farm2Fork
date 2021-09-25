//all post are nested inside articles-dynamically posts are saved from database
let articlesBlock = document.querySelector('.articles')

articlesBlock.addEventListener('click', function (e) {
    if(e.target.classList.contains('btn-remove')){
        //div is parent node for delete button and article
        //is parent for div 
        let id = e.target.parentNode.parentNode.querySelector('.id').value
        fetch('http://localhost:3000/posts/'+id, {
            method: 'DELETE'
        }).then((resp) => resp.text())
        .then(() => window.history.go()) //redirect client to main page of admin page
    }
})