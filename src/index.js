// write your code here

//Start with event listener when page loads
//Make a GET request using fetch
//Include images and comments
//type of data: [{array of objects}]

const dogImages = "localhost:3000/images"
//set variable to be passed in as a JSON object

document.addEventListener('DOMContentLoaded', () => {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(dogImages),
    fetch('localhost:3000/images')
        .then(response => response.json()) 
        .then(data => console.log(data));
})


likeBtn = document.querySelector("like-button")
likes = document.querySelector("likes").innerText
likesNum = likes.parseInt();
//extract inner text from span div
//separate the character 0 and convert from str to integer using parseInt
//using UPDATE fetch request to increase likes on click (event)
//<span class="likes">0 likes</span>
//prevent page from reloading on click using preventDefault
likeBtn.addEventListener("click", function(event){
    event.preventDefault()
    fetch()

})

comments = document.querySelector("comments")


configObject = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify([
        {
          "id": 1,
          "title": "Woofing those bugs away",
          "likes": 0,
          "image": "./assets/coder-dog.png"
        }
      ])
}

//create GET request for when page loads
//fetch default behavior is GET
//event listener: event => callback function
//isolate comments using querySelector
//create a PATCH fetch request to update them 
//PATCH fetch request should be inside event listener
//event listener event should be called on "post" button
//even should be "click"
