const deleteElement = document.querySelectorAll(".delete-element");

const allDates = {
    "users" : null,
    "projects" : null,
    "posts" : null
};

fetch("/api/users")
    .then(res => {
        return res.json();
    })
    .then(function (items) {
        allDates.users = items;
    });
fetch("/api/posts")
    .then(res => {
        return res.json();
    })
    .then(function (items) {
        allDates.posts = items;
    });
fetch("/api/projects")
    .then(res => {
        return res.json();
    })
    .then(function (items) {
        allDates.projects = items;
    });

deleteElement.forEach((item) => {
    item.onclick = (evt) => {
        const dataId = +evt.target.getAttribute("data-id");
        const dataName = evt.target.getAttribute("data-name");
        const data = allDates[dataName];

        let indexItem = data.findIndex((item) => {
            return item.id === dataId;
        });

        data.splice(indexItem, 1);

        fetch(`/api/${dataName}`,{
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            method: "delete",
            body : JSON.stringify(data),
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
