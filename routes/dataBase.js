const jsonFile = require('jsonfile');
const fileLinks = {
  usersFile : './views/users/users.json',
  postsFile :     './views/blog/posts.json',
  projectsFile : './views/projects/projects.json'
};

const allData = {
  users : jsonFile.readFileSync(fileLinks.usersFile),
  posts : jsonFile.readFileSync(fileLinks.postsFile),
  projects : jsonFile.readFileSync(fileLinks.projectsFile)
};

const setData = (to, data) => {
  return new Promise((res, rej) => {
    allData[to].push(data);
    jsonFile.writeFile(fileLinks[`${to}File`], allData[to], {spaces: 2}, (err) => {
      if(err) {
        rej(err)
      }
      res(true)
    })
  })
};

const setProject = data => setData("projects", data);
const setPosts = data => setData("posts", data);
const setUsers = data => setData("users", data);

const getProject = () => allData.projects;
const getPosts = () => allData.posts;
const getUsers = () => allData.users;

module.exports = {
  setProject,
  setPosts,
  setUsers,
  getPosts,
  getProject,
  getUsers
};

