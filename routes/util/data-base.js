const jsonFile = require("jsonfile");

const fileLinks = {
    usersFile: "./views/users/users.json",
    postsFile: "./views/blog/posts.json",
    projectsFile: "./views/projects/projects.json",
    contactsFile: "./views/contacts/text.json",

    textsFile: "./views/texts/text.json",
};

const allData = {
    users: jsonFile.readFileSync(fileLinks.usersFile),
    projects: jsonFile.readFileSync(fileLinks.projectsFile),
    contacts: jsonFile.readFileSync(fileLinks.contactsFile),
    posts: jsonFile.readFileSync(fileLinks.postsFile),

    texts: jsonFile.readFileSync(fileLinks.textsFile),
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

const setText = (to, data) => {
    return new Promise((res, rej) => {
        allData[to] = [data];
        jsonFile.writeFile(fileLinks[`${to}File`], allData[to], {spaces: 2}, (err) => {
            if (err) {
                rej(err)
            }
            res(true)
        })
    })
};

const removeData = (to, data) => {
    return new Promise((res, rej) => {
        allData[to] = allData[to].filter(item => {
            return item.id !== data;
        });
        jsonFile.writeFile(fileLinks[`${to}File`], allData[to], {spaces: 2}, (err) => {
            if (err) {
                rej(err)
            }
            res(true)
        })
    })
};

const setProject = data => setData("projects", data);
const setUsers = data => setData("users", data);
const setContact = data => setText("contacts", data);
const setPosts = data => setData("posts", data);

const setTexts = data => setText("texts", data);

const removeProject = data => removeData("projects", data);
const removePost = data => removeData("posts", data);
const removeUser = data => removeData("users", data);

module.exports = {
    setProject,
    setUsers,
    setContact,
    setPosts,

    setTexts,

    removePost,
    removeUser,
    removeProject,
    allData
};
