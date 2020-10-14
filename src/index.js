const baseUrl = "http://localhost:3000"
const imgUrl = "http://localhost:3000/images/"
const comUrl = "http://localhost:3000/comments/"
const combinedUrl = `http://localhost:3000/images/1?_embed=comments`

document.addEventListener("DOMContentLoaded", () =>{
    // comForm = document.querySelector(".comment-form")

    fetch(combinedUrl).then(res => res.json()).then(picture => renderPicture(picture))

    // comForm.addEventListener("submit", e => {
    //     e.preventDefault()

    //     fetch(comUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Accept: "application/json"
    //         },
    //         body: JSON.stringify({
    //             "content": e.target.content.value
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(newCom => renderPicture(newCom))
    // })

})

function renderPicture(picture){

    // console.log(picture)

    const title = document.querySelector(".title")
    title.innerText = picture.title

    const image = document.querySelector(".image")
    image.src = picture.image

    const ul = document.querySelector(".comments")
    
    const li = document.querySelectorAll("li")

    let comForm = document.querySelector(".comment-form")
    // console.log(comForm)
    comForm.addEventListener("submit", event =>{
        event.preventDefault()
        
        console.log(event)
        fetch(comUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "content": event.target[0].value
            })
        })
        .then(res => res.json())
        .then(() => picture.comments)
    })
    
    let amount = document.querySelector(".likes")
    const likes = document.querySelector(".like-button")
    likes.addEventListener("click", () => {
        
        let likeAmount = ++picture.likes

        console.log(picture.likes)

        fetch(imgUrl + picture.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify({
                "likes": likeAmount
            })
        })
        .then(res => res.json())
        .then(() => amount.innerText = `${likeAmount} likes`)
    })
    

}