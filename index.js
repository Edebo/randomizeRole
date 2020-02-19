let form = document.querySelector("#addform");
let randFormName = document.querySelector("#randFormName");
let unrandom = document.querySelector("#unrandom");
let delBtns = document.querySelectorAll(".del-btn");
let randomize = document.querySelector("#randomize");
let randDiv = document.querySelector("#rand-div");
let randBody = document.querySelector("#rand-body");
let randTitle = document.querySelector("#rand-title");
let save = document.querySelector("#save");
let randTable = document.querySelector("#rand-table");
let text, added, names, sorted, randname;

// Options for the observer (which mutations to observe)
const config = { attributes: true, childList: true, subtree: true };
// Callback function to execute when mutations are observed
const callback = function(mutationsList, observer) {
  // Use traditional 'for loops' for IE 11
  mutationsList.forEach(mutation => {
    randomize.disabled = !names || names.length === 0;
    randDiv.style.display = "none";

    delBtns = document.querySelectorAll(".del-btn");

    delBtns.forEach(delBtn => {
      delBtn.addEventListener("click", e => {
        names = JSON.parse(localStorage.getItem("names" || []));

        names = names.filter(name => delBtn.value !== name);
        added = names.map((value, i) => {
          return ` <tr>
      <th scope="row">${i + 1}</th>
      <td>${value}</td>   
      <td><button class="btn btn-danger del-btn" value="${value}">Delete</button></td>
    </tr>`;
        });

        unrandom.innerHTML = added.join("");
        localStorage.setItem("names", JSON.stringify(names));
      });
    });
  });
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(unrandom, config);
form.addEventListener("submit", e => {
  e.preventDefault();
  text = e.target[0].value.trim();
  e.target[0].value = "";
  if (text === "") return;
  text = text.split(/[\s,;]+/);
  //get from the localstorage
  names = JSON.parse(localStorage.getItem("names" || []));
  names = names ? [...names, ...text] : text;
  added = names.map((value, i) => {
    return ` <tr>
      <th>${i + 1}</th>
      <td>${value}</td> 
      <td><button class="btn btn-danger mx-4 del-btn" value="${value}">Delete</button></td>
    </tr>`;
  });

  unrandom.innerHTML = added.join("");
  localStorage.setItem("names", JSON.stringify(names));
});

randFormName.addEventListener("submit", e => {
  e.preventDefault();

  randname = e.target[1].value;
  //check if purpose is filled
  if (randname) {
    randomize.disabled = true;
    //now the randomizing
    console.log(names);
    let newNames = [...names];
    const length = newNames.length;
    let randomizeArray = [];
    let index, name;
    for (let i = 0; i < length; i++) {
      index = Math.floor(Math.random() * newNames.length);
      name = newNames[index];
      randomizeArray.push(name);
      newNames.splice(index, 1);
    }

    sorted = randomizeArray.map((value, i) => {
      return ` <tr>
      <th scope="row">${i + 1}</th>
      <td>${value}</td>   
    </tr>`;
    });
    randTitle.textContent = `Randomized table for ${randname}`;
    randBody.innerHTML = sorted.join("");
    randDiv.style.display = "block";
  }
});

save.addEventListener("click", e => {
  const tableContent = randTable.outerHTML.replace(/ /g, "%20");
  let uri = "data:application/vnd.ms-excel;charset-utf-8," + tableContent;
  triggerDownload(uri, `${randname}.xlsx`);
  randDiv.style.display = "none";
});

function handleChanged(delta) {
  if (delta.state && delta.state.current === "complete") {
    console.log(`Download ${delta.id} has completed.`);
  }
}
function triggerDownload(url, filename) {
  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = filename;
  document.body.appendChild(downloadLink);

  downloadLink.click();
}

window.addEventListener("load", () => {
  localStorage.removeItem("names");
});
