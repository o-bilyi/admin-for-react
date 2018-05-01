const jsonFile = require("jsonfile");

const fileLinks = {
    usersFile: "./views/users/users.json",
    postsFile: "./views/blog/posts.json",
    projectsFile: "./views/projects/projects.json"
};

const allData = {
    users: jsonFile.readFileSync(fileLinks.usersFile),
    posts: jsonFile.readFileSync(fileLinks.postsFile),
    projects: jsonFile.readFileSync(fileLinks.projectsFile)
};

const setData = (to, data) => {
    return new Promise((res, rej) => {
        allData[to].push(data);
        jsonFile.writeFile(fileLinks[`${to}File`], allData[to], {spaces: 2}, (err) => {
            if (err) {
                rej(err)
            }
            res(true)
        })
    })
};

const changeData = (to, data) => {
    return new Promise((res, rej) => {
        allData[to] = data;
        jsonFile.writeFile(fileLinks[`${to}File`], allData[to], {spaces: 2}, (err) => {
            if (err) {
                rej(err)
            }
            res(true)
        })
    })
};

const setProject = data => setData("projects", data);
const setPosts = data => setData("posts", data);
const setUsers = data => setData("users", data);

const changeProjects = data => changeData("projects", data);
const changePosts = data => changeData("posts", data);
const changeUsers = data => changeData("users", data);

module.exports = {
    setProject,
    setPosts,
    setUsers,
    changePosts,
    changeUsers,
    changeProjects,
    allData
};
