const url = 'http://localhost:3000'
const imgUrl = url + '/images/1'
const cmntUrl = url + '/comments'

document.addEventListener('DOMContentLoaded', () => {
    
    fetch(imgUrl)
    .then(function(res) {
        return res.json()
    })
    .then(function(pic) {
        renderPic(pic)
    })

    
})

function renderPic(pic) {
    //select all parts of dog container
    const container = document.querySelector('.image-container')
    const div = document.querySelector('.image-card')
    const h2 = document.querySelector('.title')
    const img = document.querySelector('.image')
    const likesDiv = document.querySelector('.likes-section')
    const span = document.querySelector('.likes')
    const likesBtn = document.querySelector('like-button')
    const ul = document.querySelector('.comments')
    const li = document.querySelector('li')
    const form = document.querySelector('.comment-form')
    const input = document.queryCommandEnabled('.commment-input')
    const cmntBtn = document.queryCommandEnabled('.comment-button')

    //set inners
    h2.innerText = pic.title
    img.src = pic.image
    li.innerText = input.value
    span.innerText = pic.likes + 'likes'

    let comment = input.value

    //append everything
    container.append(div)
    div.append(h2, img, likesDiv, ul, form)
    likesDiv.append(span, likesBtn)
    ul.append(li)
    form.append(input, cmntBtn)

    
    // likesBtn.addEventListener('click', () => {
        
    //     let updateLikes = parseInt(span.innerText + 1)

    //     fetch(imgUrl, {
    //         method: 'POST',
    //         headers: {
    //             "Content-type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             id: pic.id
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(() => span.innerText = updateLikes)
    // })
    

    
    //     form.addEventListener('submit', e => {
    //         // console.log(e.target)
    //         e.preventDefault()
    //         fetch(cmntUrl, {
    //             method: 'POST',
    //             headers: {
    //                 "Content-type": "application/json",
    //                 Accept: "application/json"
    //             },
    //             body: JSON.stringify({
    //                 content: comment
    //             })
    //         })
    //         .then(res => res.json())
    //         .then(() => (li.innerText = createComment))

    //     })
    



// {id: 1, title: "Woofing those bugs away", likes: 0, image: "./assets/coder-dog.png"}
// id: 1
// image: "./assets/coder-dog.png"
// likes: 0
// title: "Woofing those bugs away"
// __proto__: Object
}