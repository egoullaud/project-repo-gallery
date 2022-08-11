//target profile information
const overview = document.querySelector(".overview");
//github username
const username = "egoullaud"
//select unordered list to display repos list
const repoList = document.querySelector(".repo-list");

//grab user information from git API
const getRepos = async function (){
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
const data = await userInfo.json();
console.log(data);
displayUserInfo(data);
};
getRepos();

const displayUserInfo = function(data) {
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    userInfo.innerHTML = 
    `
    <figure> 
        <img alt = "user avatar" src=${data.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Bio:</strong> ${data.bio}</p>
      <p><strong>Location:</strong> ${data.ocation}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
     `;

overview.append(userInfo);
getRepoList();
};

const getRepoList = async function () {
const repoListItem = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
const repos = await repoListItem.json()
// console.log(repos);
displayRepos(repos);
}
// getRepoList();

const displayRepos = function(repos){
for(const repo of repos){
const repoItem =document.createElement("li");
repoItem.classList.add("repo");
repoItem.innerHTML = `<h3> ${repo.name} </h3>`;
repoList.append(repoItem);
}
};