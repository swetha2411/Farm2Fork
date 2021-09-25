//it has both static and dynamic content - event delegation
{
    let articlesBlock = document.querySelector('.articles')
    let updateForm = document.querySelector('.update-post-form')
    let titleInp = document.querySelector('#update-title')
    let textArea = document.querySelector('#update-text')
    let id
    articlesBlock.addEventListener('click', async function(e) {
        if(e.target.classList.contains('btn-edit')){
            //to fill in form with existing post content
            id = e.target.parentNode.parentNode.querySelector('.id').value
            let postInfo = await fetch('http://localhost:3000/posts/'+ id)
                       .then((resp) => resp.json())
                       .then((data) => data)
            
            titleInp.value = postInfo.title
            
            textArea.value = postInfo.text

            let articleTab = document.getElementById('v-pills-articles')
            articleTab.classList.remove('show')
            articleTab.classList.remove('active')
            let updateTab = document.getElementById('v-pills-update-post')
            updateTab.classList.add('show')
            updateTab.classList.add('active')
        }
    })

    updateForm.addEventListener('submit', function(e) {
        e.preventDefault()
        fetch('http://localhost:3000/posts/'+ id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                title: titleInp.value,
                text: textArea.value,
                description: textArea.substring(0, textArea.indexOf('.') + 1)
            })
        }).then((resp) => resp.text())
        .then(() => window.history.go())
   })
    
}

