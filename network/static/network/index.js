document.addEventListener("DOMContentLoaded" , function() {
  document.querySelector("#add_new_post").style.display = 'block';
  document.querySelector("#new_post_view").style.display = 'none';
//  document.querySelector("#cancel").style.display = 'none';
  add_post=document.querySelector("#new_post");
  add_post.style.animationPlayState = "paused";
  add_post.onclick = () => {
    add_post.style.animationPlayState = "running";
    setTimeout(() =>{document.querySelector("#add_new_post").style.display = 'none'}, 550);
    //document.querySelector("#add_new_post").style.display = 'none';
    document.querySelector("#new_post_view").style.display = 'block';
  //  document.querySelector("#cancel").style.display = 'block';

  }
  cancel = document.querySelector("#cancel")
  cancel.onclick = () => {
    document.querySelector("#add_new_post").style.display = 'block';
    document.querySelector("#new_post_view").style.display = 'none';
  //  document.querySelector("#cancel").style.display = 'none';
    add_post.style.animationPlayState = "paused";
  }

  all_like = document.querySelectorAll(".like");
  try{
    for (like in all_like) {
    all_like[like].style.animationPlayState = "paused";
  }
}
  catch(err){}

  all_liked = document.querySelectorAll(".liked");
  try{
    for (liked in all_liked) {
      all_liked[liked].style.animationPlayState = "paused";
    }
  }
  catch(err) {}
  document.addEventListener('click' , event =>{
    clicked = event.target;
    console.log(clicked);

    //console.log(clicked);
    if (clicked.className === "bi bi-heart") {
      event.preventDefault();
      like=clicked.parentElement.parentElement;
      liked=like.nextSibling.nextSibling;
      like.style.animationPlayState = "running";
      liked.style.animationPlayState = "running";

    }
  })
  //like.onclick = () => {}
})

function post() {
  document.querySelector("#new").innerHTML = `
    <textarea id="new_post_text" rows="3" cols="100" name = "new_post_text"></textarea><br>
    <button id="post" class="btn btn-primary" name = "post">Post</button>
    <button id="cancel" class="btn btn-primary">Cancel</button><br>
  `
}
