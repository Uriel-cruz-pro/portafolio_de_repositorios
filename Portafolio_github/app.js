const USERNAME = "Uriel-cruz-pro";

const repoList = document.getElementById("repoList");
const recentRepoDiv = document.getElementById("recentRepo");

// ==========================
// 1️⃣ CARGAR TODOS LOS REPOS
// ==========================
fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&direction=desc&type=owner`)
    .then(res => res.json())
    .then(repos => {
        repos.forEach(repo => {
            const div = document.createElement("div");
            div.className = "repo";

            div.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Sin descripción"}</p>
                <a href="${repo.html_url}" target="_blank">Ver repositorio</a>
            `;

            repoList.appendChild(div);
        });

        // El repo más reciente es el primero
        if (repos.length > 0) {
            loadRecentCommits(repos[0].name);
        }
    });

// ==========================
// 2️⃣ COMMITS DEL REPO MÁS RECIENTE
// ==========================
function loadRecentCommits(repoName) {
    fetch(`https://api.github.com/repos/${USERNAME}/${repoName}/commits?per_page=3`)
        .then(res => res.json())
        .then(commits => {
            recentRepoDiv.innerHTML = `<h3>Repositorio: ${repoName}</h3>`;

            commits.forEach(commit => {
                const div = document.createElement("div");
                div.className = "commit";
                div.innerHTML = `
                    <strong>${commit.commit.author.name}</strong><br>
                    ${commit.commit.message}
                `;
                recentRepoDiv.appendChild(div);
            });
        });
}
