from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.urls import reverse
from django.utils import timezone
from .models import *
from django.core.serializers import serialize
import json

def index(request):
    if 'post' in request.POST:
        if request.method == "POST":
            user = User.objects.get(pk=request.user.id)
            post = request.POST.get("new_post_text")
            new_post = Post.objects.create(user=user,post=post)
            new_post.save()
            HttpResponseRedirect(reverse("index"))
    posts = reversed(Post.objects.all())
    return render(request, "network/index.html" , {
    "all_post" : posts,
    })

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "network/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "network/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "network/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
            follow = Followers.objects.create(user=user)
        except IntegrityError:
            return render(request, "network/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "network/register.html")

def profile(request,user_id):
    user = User.objects.get(pk=user_id)
    followers=Followers.objects.get(user=user)
    #print(followers)
    if request.method == "POST" :
        data = json.loads(request.body)
        #print(f"here {data} ")
        follower = User.objects.get(username=f"{data[1]}")
        following = User.objects.get(username=f"{data[0]}")
        follow = Followers.objects.get(user=following)
        #print(follow)
        if data[2] == "follow" :
            follow.followers.add(follower)
        elif data[2] == "unfollow":
            follow.followers.remove(follower)
        followers = Followers.objects.get(user=user)
        total_followers = followers.followers.all()
        total_followers_json = serialize("json" , total_followers , fields=("username"))
        print(total_followers_json)
        return HttpResponse(total_followers_json , content_type="application/json")

    return render(request , "network/profile.html" , {
    "profile_user": user,
    "total_followers" : followers.followers.count(),
    "followers" : followers.followers.all()
    })
