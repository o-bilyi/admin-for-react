const deleteElement = document.querySelectorAll(".delete-element");
let posts = null;
fetch("/api/posts")
    .then(res => {
        return res.json();
    })
    .then(function (post) {
        posts = post;
    });

deleteElement.forEach((item) => {
    item.onclick = (evt) => {
        const dataId = +evt.target.getAttribute("data-id");
        let indexItem = posts.findIndex((item) => {
            return item.id === dataId;
        });
        posts.splice(indexItem, 1);

        fetch("/api/posts",{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "delete",
            body : JSON.stringify(posts),
        })
        .then(function (data) {
            console.log("Request success: ", data);
            location.reload();
        })
        .catch(function (error) {
            console.log("Request failure: ", error);
        });
    };
});
