import { Octokit } from "https://cdn.skypack.dev/@octokit/rest";

const re = /-\s\[.+\]\(https:\/\/github\.com\/(\S+)\)\s-/;

async function buildRepoSection(owner, repo, path) {
  await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`)
    .then((d) => d.json())
    .then((j) => atob(j.content).split("\n"))
    .then((arr) => {
      const plugins = [];
      arr.forEach((element) => {
        let match = re.exec(element);
        if (match != null) {
          let plugin = match[1];
          plugins.push(plugin);
          const [owner, repo] = plugin.split("/");
          octokit.rest.repos
            .get({
              owner,
              repo,
            })
            .then(({ data }) => {
              const {
                name,
                description,
                html_url,
                forks_count,
                stargazers_count,
              } = data;
              message.innerHTML = "";
              const repo = document.createElement("div");
              repo.className = "repo";
              repo.innerHTML = `
      <a href="${html_url}" target="_blank" rel="noopener noreferrer">
        <h4 class="repo__title">${name}</h4>
        <p class="repo__description">${description}</p>
      </a>
      <div class="repo__stats">
      <a class="stargazers" href="${html_url}/stargazers" target="_blank" rel="noopener noreferrer">
        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill-rule="evenodd" d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"></path>
        </svg>
        ${stargazers_count}
      </a>
      <a class="stargazers" href="${html_url}/network/members" target="_blank" rel="noopener noreferrer">
        <svg height="16" viewBox="0 0 16 16" version="1.1" width="16">
            <path fill-rule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
        </svg>
        ${forks_count}
      </a>
    `;
              repos.appendChild(repo);
            })
            .catch((error) => {
              message.innerHTML = "Something went wrong";
              console.error(error);
            });
          console.log(`https://github.com/${plugin}`);
        }
      });
    });
}

const codeBlock = document.querySelector(".codeblock");
codeBlock.addEventListener("click", copy);
function copy() {
  navigator.clipboard
    .writeText(
      "zsh <(curl -s https://raw.githubusercontent.com/zap-zsh/zap/master/install.zsh) --branch release-1.0"
    )
    .then(() => {
      document.getElementById("test").style.display = "flex";
      setTimeout(function () {
        document.getElementById("test").style.display = "none";
      }, 2000);
    });
}

const repos = document.getElementById("repos");
const message = document.getElementById("repos__message");
message.innerHTML = "Loading...";
const octokit = new Octokit();

buildRepoSection("zap-zsh", "outlet", "README.md");
