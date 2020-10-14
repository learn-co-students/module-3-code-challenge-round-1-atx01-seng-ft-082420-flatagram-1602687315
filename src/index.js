// write your code here
const imgURL = "http://localhost:3000/images/1"

function getImg() {
    fetch(imgURL)
    .then(res => res.json())
    .then(imgs => {
        renderImg(imgs);
    })
}
function renderImg(imgs) {
    const imgCont = document.querySelector(".image-container")
    

    let imgCard = document.querySelector(".image-card")

    let imgTitle = document.querySelector(".title")
    imgTitle.innerText = imgs.title

    let imgImg = document.querySelector(".image")
    imgImg.src = imgs.image

    let likesSection = document.querySelector(".likes-section")

    let imgLikes = document.querySelector(".likes")
    imgLikes.innerHTML = imgs.likes
    
    let likeBtn = document.querySelector(".like-button")
    likeBtn.addEventListener("click", () => {
        let likes = parseInt(imgLikes.innerHTML)
        fetch(imgURL, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                likes: likes++
            })
        })
    
    })

    let commList = document.querySelector(".comments")
    let comments = document.createElement("li")
    comments.innerText = renderComm(imgs);
    commList.append(comments)
    likesSection.append(imgLikes, likeBtn)
    imgCard.append(imgTitle, imgImg, likesSection, commList)
    imgCont.append(imgCard)
}

function renderComm(imgs) {
    imgs.comments.forEach(comm => {
        comm.content
    })
}

function postComm(imgs) {
    const commForm = document.querySelector(".comment-form")
    commForm.addEventListener("submit", (e) => {
        e.preventDefault();
        fetch("http://localhost:3000/comments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                content: e.target.name.value
            })
        })
        .then(renderComm(imgs))
    })
}



getImg();