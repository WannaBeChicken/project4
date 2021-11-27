document.addEventListener('DOMContentLoaded', function(){
  user_id=document.querySelector("#user_id");
  user_id.style.display="none";
  logged_in=document.querySelector("#logged_in");
  logged_in.style.display="none";
  follow(user_id);
  })

function getCookie(name) {
    if (!document.cookie) {
      return null;
    }

    const xsrfCookies = document.cookie.split(';')
      .map(c => c.trim())
      .filter(c => c.startsWith(name + '='));

    if (xsrfCookies.length === 0) {
      return null;
    }
    return decodeURIComponent(xsrfCookies[0].split('=')[1]);
  }
function follow(user_id) {
  document.addEventListener("click" , event =>{
    clicked=event.target;
    if (clicked.id === "profile_follow") {
    event.preventDefault();
    console.log(clicked.id);
    csrftoken=getCookie("csrftoken");
    follow = document.querySelector("#profile_user").innerHTML;
    logged_in = document.querySelector("#logged_in").innerHTML;
    body = [follow , logged_in];
    console.log(body);

      fetch(`/${user_id.innerHTML}`, {
        method : 'POST',
        headers : {
          "Content-Type" : 'application/json',
          'X-CSRFToken' : csrftoken,
        },
        body: JSON.stringify(body)
      })
      .then(response => response.json())
      .then(data => {
        document.querySelector("#total_followers").innerHTML = data.length;
        console.log(data);
      })
    }
  })
}
