// write your code here 
document.addEventListener("DOMContentLoaded", ()=> {
fetch("http://localhost:3000/images/1")
.then(function(response){
return response.json()
})//ends first.then get  fetch
.then(function(image){
//console.log(images)

renderImage(image)
})// ends second. then get fetch
function renderImage(image){
    console.log(image)
    // {
    //     "id": 1,
    //     "title": "Woofing those bugs away",
    //     "likes": 0,
    //     "image": "./assets/coder-dog.png",
    //     "comments": [
    
    const imgTitle= document.querySelector(".title") 
    imgTitle.innerText= image["title"] 
    
     
    const span= document.querySelector(".likes") 
    //let likesCount = image.likes
    span.innerHTML= `${image.likes} likes`
    const img  =document.querySelector(".image")
    img.src = image.image 
    const ul = document.querySelector("ul")
    
   
    image["comments"].forEach(function(imageComments){
        const li= document.createElement("li")
        li.innerText = imageComments["content"]
        ul.append(li)

    })//ends forEach
 
//}//ends renderImage()
// button class="like-button">♥</button
let button = document.querySelector("button")
console.log(button)
button.addEventListener("click", function(e){
fetch("http://localhost:3000/comments", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Accept": "application/json"
},//ends headers
body:JSON.stringify({
    "likes": 0
})// end stringify
})//end fetch
.then(response => response.json())
.then(like => console.log(like))
// .then(like => {++span.innerHTML})
})// ends event listener
}//ends renderImage()
})//ends DOM content loaded
