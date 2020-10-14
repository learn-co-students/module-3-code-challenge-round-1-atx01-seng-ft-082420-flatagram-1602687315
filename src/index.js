const imageURL = "http://localhost:3000/images"
const commentURL = "http://localhost:3000/images"
const imageCont = document.querySelector('div.image-container')


document.addEventListener("DOMContentLoaded", () => {

    fetch(imageURL)
    .then(res => res.json())
    .then(images => images.forEach(function(image){
        renderImageList(image)
    }))


})

function renderImageList(image){
    let imgContainer = document.createElement('div')
    imgContainer.className = 'image-container'

    let imgCard = document.createElement('div')
    imgCard.className = 'image-card'

    let imgTitle = document.createElement('h2')
    imgTitle.className = 'title'
    imgTitle.innerText = image.title

    let imgPicture = document.createElement('img')
    imgPicture.className = ('image')
    imgPicture.src = image.image
    
    let imgLikes = document.createElement('div')
    imgLikes.className = 'likes-section'
    
    let imgLikesNumber = document.createElement('span')
    imgLikesNumber.className = 'likes'
    let numberOfLikes = image.likes
    imgLikesNumber.innerText = `${numberOfLikes} likes`

    let imgLikesBtn = document.createElement('button')
    imgLikesBtn.className = 'like-button'
    imgLikesBtn.innerText = '♥'
    imgLikesBtn.addEventListener('click', function(e){
        e.preventDefault
        imgLikesNumber.innerText = `${numberOfLikes++} likes`
    })
    // NOTE: For some reason you have to hit the like button twice in order for the incrementation to start counting the likes but it DOES work... 
    //however it doesnt persist YET, im running out of time and i will come back to it after I finish the comments section.
    // in order to do this i would make a function with a POST method, headers, and a body. the headers would be "content" and "accept" = application/json and the body would be the image.likes and I would basically update this number with the incrementation i used previously.
    
    let imgComments = document.createElement('ul')
    imgComments.className = 'comments'
    imgComments.innerText = []

    let imgCommentForm = document.createElement('form')
    imgCommentForm.className = 'comment-form'

    let imgCommentInput = document.createElement('input')
    imgCommentInput.className = 'comment-input'
    imgCommentInput.type = 'text'
    imgCommentInput.name = 'comment'
    imgCommentInput.placeholder = 'Add a comment...'
    
    let imgCommentBtn = document.createElement('button')
    imgCommentBtn.className = 'comment-button'
    imgCommentBtn.type = 'submit'
    imgCommentBtn.innerText = 'Post'
    imgCommentBtn.addEventListener('click', function(e){
        e.preventDefault
        imgComments.innerText.push()
    })

    // Where i was going w this was I would: push the string of whatever was typed into the comment input section into the imgComments.innerText array I had created above.
    // not sure if this would work but thats the way my brain decided to go with this logically in case more than one comment wanted to be written. if it was just one comment i wouldve scrapped the area idea and just updated the inner text itself
    //this was the last thing i was working on before time was up so I didnt exactly get to finish it
    
    imgCommentForm.append(imgCommentInput, imgCommentBtn)
    imgLikes.append(imgLikesNumber, imgLikesBtn)
    imgCard.append(imgTitle, imgPicture, imgLikes, imgComments, imgCommentForm)
    imgContainer.append(imgCard)
    imageCont.append(imgContainer)
}


// This was for personal use during the challenge
// {id: 1, title: "Woofing those bugs away", likes: 0, image: "./assets/coder-dog.png"}
// id: 1
// image: "./assets/coder-dog.png"
// likes: 0
// title: "Woofing those bugs away"