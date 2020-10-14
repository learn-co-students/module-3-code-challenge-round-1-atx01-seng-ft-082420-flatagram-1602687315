// write your code here
document.addEventListener('DOMContentLoaded', ()=>{

    const urlBase = 'http://localhost:3000/'

    fetch(urlBase+'images/')
    .then(r => r.json())
    .then(qArray=>qArray.forEach(image => createPost(image)))

    function cEl(el){
        return document.createElement(el)
    }
    function createPost(image){
        const imgContainer = document.querySelector('.image-container')
        const newDiv = cEl('div')
        newDiv.className = 'image-card'

        const h2 = cEl('h2')
        h2.className = 'title'
        h2.innerText = image.title

        const img = cEl('img')
        img.src = image.image
        img.className = 'image'
    //------------------
        const divLikes = cEl('div')
        divLikes.className = 'likes-section'

        const span = cEl('span')
        span.className = 'likes'
        span.innerText = `${image.likes} likes`

        const likeBtn = cEl('button')
        likeBtn.className='like-button'
        likeBtn.innerText = '♥'
        likeBtn.addEventListener('click', e=>{
            e.preventDefault()
            addLike(e, image.id)
        })
    //-------------------------------
        const commentsUl = cEl('ul')
        commentsUl.className = 'comments'
        commentsUl.id = image.id

    //-----------------------------------

        const form = cEl('form')
        form.className = 'comment-form'
        
        const input = cEl('input')
        input.className= 'comment-input'
        input.type = 'text'
        input.name = 'comment'
        input.placeholder = 'Add a comment...'

        const commentBtn = cEl('button')
        commentBtn.addEventListener('click', e =>{
            e.preventDefault()
            addComment(e.target.parentElement[0].value, image.id)
        })
        commentBtn.className = 'comment-button'
        commentBtn.innerText = "Post"

        form.append(input, commentBtn)
        divLikes.append(span, likeBtn)
        newDiv.append(h2, img, divLikes, commentsUl, form )
        imgContainer.append(newDiv)
    }
    fetch(urlBase+'comments/')
    .then(r => r.json())
    .then(qArray=>qArray.forEach(comment => addComment(comment.content, comment.imageId, comment.id)))

    function addComment(comment, id, commentId){
        const commentsUl = document.getElementById(id)
        const li = cEl('li')
        li.id = `${commentId} Comment`
        li.innerText = comment
        commentsUl.append(li)
    }
    
    function addLike(like, id){
        console.log(like.target.previousElementSibling.innerText, id)
        let newLikes = parseInt(like.target.previousElementSibling.innerText)+1
        console.log(newLikes)
        fetch('http://localhost:3000/images/'+id,{
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"},
            body: JSON.stringify({
                likes : newLikes
            })
        })
        .then (res => res.json())
        .then(like => {
            const comments = document.getElementById(id)
            comments.previousElementSibling.firstChild.innerText = `${newLikes} likes`
        })
    }
})
