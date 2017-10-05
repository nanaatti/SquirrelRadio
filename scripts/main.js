var likeCount = 1;

function like(x) {
    var liked = true;
    //likeCount + 1;
    likeCount ++;
    console.log(likeCount);
    //x.classList.toggle("fa-heart");
    document.getElementById("likes").innerHTML = likeCount;
    x.classList.remove("fa-heart-o");
    x.classList.add("fa-heart");
}