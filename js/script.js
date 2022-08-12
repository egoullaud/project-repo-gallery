//target profile information
const overview = document.querySelector(".overview");
//github username
const username = "egoullaud";
//select unordered list to display repos list
const repoList = document.querySelector(".repo-list");
//select class of repos where all repo info appears
const allReposContainer = document.querySelector(".repos");
//select section with class repo-data where individual repo data appears
const repoData = document.querySelector(".repo-data");
//select back to repo button
const viewReposButton = document.querySelector(".view-repos");
//select input with the search by name placeholder
const filterInput = document.querySelector(".filter-repos");




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
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>
     `;

overview.append(userInfo);
getRepoList();
};

const getRepoList = async function () {
const repoListItem = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
const repos = await repoListItem.json();
// console.log(repos);
displayRepos(repos);
};
// getRepoList();

const displayRepos = function(repos){
filterInput.classList.remove("hide"); 
for(const repo of repos){
const repoItem =document.createElement("li");
repoItem.classList.add("repo");
repoItem.innerHTML = `<h3> ${repo.name} </h3>`;
repoList.append(repoItem);
}
};

repoList.addEventListener("click",function(e){
if (e.target.matches("h3")){
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
}
});

const getRepoInfo = async function (repoName){
const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
const repoInfo = await response.json();
console.log(repoInfo);
//select languages from repo
const fetchLanguages = await fetch(repoInfo.languages_url);
const languageData = await fetchLanguages.json();
// console.log(languageData);

//add languages to array
const languages = [];
for( const language in languageData){
    languages.push(language);
}
// console.log(languages);
displayRepoInfo(repoInfo,languages);
};

const displayRepoInfo = function(repoInfo, languages){
   viewReposButton.classList.remove("hide");
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    allReposContainer.classList.add("hide");

    const div = document.createElement("div");
    div.innerHTML =`
        <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
    repoData.append(div);
};


viewReposButton.addEventListener("click", function() {
allReposContainer.classList.remove("hide");
repoData.classList.add("hide");
viewReposButton.classList.add("hide");

});

filterInput.addEventListener("input", function(e){
    const searchText = e.target.value;
    // console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerSearch = searchText.toLowerCase();

    for(const repo of repos){
        const lowerText = repo.innerText.toLowerCase();
        if (lowerText.includes(lowerSearch)){
            repo.classList.remove("hide");
        } else{
            repo.classList.add("hide");
        }
    }
});