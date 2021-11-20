document.addEventListener("DOMContentLoaded" , function() {
  add_post=document.querySelector("#new_post");
  add_post.style.animationPlayState = "paused";
  add_post.onclick = () => {
    document.querySelector("#new").innerHTML = `
      <textarea id="new_post_text" rows="3" cols="100" name = "new_post_text"></textarea><br>
      <button id="post" class="btn btn-primary">Post</button>
      <button id="cancel" class="btn btn-primary">Cancel</button><br>
    `
    add_post.style.animationPlayState = "running";
    setTimeout(() =>{add_post.remove()}, 800);
  }


})
