//Get Image
fetch('http://localhost:3000/images/1')
.then(function(res){
    return res.json()
})
.then(function(image){
    renderImage(image)
})

function renderImage(photo) {
    const imgTitle = document.querySelector('.title')
    imgTitle.innerHTML = photo.title

    const img = document.querySelector('.image')
    img.src = photo.image

    const ul = document.querySelector('.comments')
    while (ul.firstChild) {
        ul.removeChild(ul.firstChild)
    }
    const comments = photo.comments
    for(let i = 0; i < comments.length; i++) {
        const comment = document.createElement('li')
        comment.innerHTML = photo.comments[i].content
        ul.append(comment)
    }

    const likes = document.querySelector('.likes')

    renderLikes(photo)

    const likebtn = document.querySelector('.like-button')
    likebtn.addEventListener('click', function(e) {
        e.preventDefault()
        const numLikes = parseInt(likes.innerHTML)
        addLike(numLikes)
    })

    const comForm = document.querySelector('.comment-form')
    comForm.addEventListener('submit', function(e){
        e.preventDefault()
        addComment(e.target, ul)
        comForm.reset()
    })
}

//Add like to database and then reflect change on page
function addLike(numLikes) {
    const newLikes = numLikes + 1
    fetch('http://localhost:3000/images/1', {
        method: 'PATCH', 
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            likes: newLikes
        })
    })
    .then(function(res){
        return res.json()
    })
    .then(function(photo){
        renderLikes(photo)
    })
}

function renderLikes(photo) {
    const likes = document.querySelector('.likes')
    likes.innerHTML = `${photo.likes} likes`
}

function addComment(form, ul) {
    const comment = form.comment.value
    fetch('http://localhost:3000/comments', {
        method: 'POST', 
        headers: {
            'Content-Type':'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({
            imageId: 1,
            content: comment
        })
    })
    .then(function(res){
        return res.json()
    })
    .then(function(photo){
        const li = document.createElement('li')
        li.innerHTML = photo.content
        ul.append(li)
    })
}