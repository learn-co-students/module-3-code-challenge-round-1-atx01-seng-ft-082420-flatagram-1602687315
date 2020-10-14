document.addEventListener("DOMContentLoaded", () => {
  console.log("Its Working");
  fetch("http://localhost:3000/images")
    .then(res => res.json())
    .then(json => {
      json.forEach(image => {
        // console.log(image);
        createImageCard(image);
      });
    });
  //   fetch("http://localhost:3000/comments")
  //     .then(res => res.json())
  //     .then(json => {
  //       json.forEach(comment => {
  //         console.log(comment);
  //       });
  //     });
});

function createImageCard(image) {
  const imgContainer = document.querySelector(".image-container");

  // Create Elements
  const divCard = document.createElement("div");
  const h2 = document.createElement("h2");
  const img = document.createElement("img");
  const likeDiv = document.createElement("div");
  const span = document.createElement("span");
  const likeBtn = document.createElement("button");
  const ul = document.createElement("ul");
  const li = document.createElement("li");
  const form = document.createElement("form");
  const input = document.createElement("input");
  const button = document.createElement("button");

  // Assign Elements
  divCard.className = "image-card";
  h2.className = "title";
  h2.innerText = image.title;
  img.className = "image";
  img.setAttribute("src", image.image);
  likeDiv.className = "likes-section";
  span.className = "likes";
  span.innerText = `${image.likes} likes`;
  likeBtn.className = "like-button";
  likeBtn.innerText = "♥";
  ul.className = "comments";

  fetch("http://localhost:3000/comments")
    .then(res => res.json())
    .then(json => {
      json.forEach(comment => {
        // console.log(comment);
        li.innerText = comment.content;
        ul.append(li);
      });
    });
  form.className = "comment-form";
  input.className = "comment-input";
  input.type = "text";
  input.name = "comment";
  input.placeholder = "Add a comment....";
  input.id = "newComment";
  button.className = "comment-button";
  button.type = "submit";
  button.innerText = "Post";
  form.append(input, button);
  likeDiv.append(span, likeBtn);
  divCard.append(h2, img, likeDiv, ul, form);
  //   console.log(divCard);
  imgContainer.append(divCard);

  button.addEventListener("submit", e => {
    e.preventDefault();
    const comment = document.querySelector("#newComment").value;
    console.log(comment);
    newComment(comment);
    // console.log(image.id);
  });

  likeBtn.addEventListener("click", e => {
    e.preventDefault();
    let updateLikes = parseInt(span.innerText) + 1;
    // console.log(updateLikes);
    // console.log(image.id);
    fetch(`http://localhost:3000/images/${image.id}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({
        likes: updateLikes
      })
    })
      .then(res => res.json())
      .then(() => (span.innerText = updateLikes + " likes"));
  });
}

function newComment(comment) {
  return fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      imageId: 1,
      content: comment
    })
  })
    .then(data => data.json())
    .then(comment => createImageCard(comment));
}
