const jsonFile = require("jsonfile");

const fileLinks = {
    usersFile: "./views/users/users.json",
    usersTextFile: "./views/usersText/text.json",

    postsFile: "./views/blog/posts.json",

    projectsFile: "./views/projects/projects.json",
    projectsTextFile: "./views/projectsText/text.json",

    contactsFile: "./views/contacts/text.json",
    contactsTextFile: "./views/contactsText/text.json",
};

const allData = {
    users: jsonFile.readFileSync(fileLinks.usersFile),
    usersText: jsonFile.readFileSync(fileLinks.usersTextFile),

    projects: jsonFile.readFileSync(fileLinks.projectsFile),
    projectsText: jsonFile.readFileSync(fileLinks.projectsTextFile),

    contacts: jsonFile.readFileSync(fileLinks.contactsFile),
    contactsText: jsonFile.readFileSync(fileLinks.contactsTextFile),

    posts: jsonFile.readFileSync(fileLinks.postsFile),
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
        allData[to] = [];
        allData[to].push(data);
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
const setProjectsText = data => setText("projectsText", data);

const setUsers = data => setData("users", data);
const setUsersText = data => setText("usersText", data);

const setContact = data => setText("contacts", data);
const setContactsText = data => setText("contactsText", data);

const setPosts = data => setData("posts", data);

const removeProject = data => removeData("projects", data);
const removePost = data => removeData("posts", data);
const removeUser = data => removeData("users", data);

module.exports = {
    setProject,
    setProjectsText,

    setUsers,
    setUsersText,

    setContact,
    setContactsText,

    setPosts,

    removePost,
    removeUser,
    removeProject,
    allData
};
