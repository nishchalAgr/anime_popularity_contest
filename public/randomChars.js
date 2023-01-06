let state = [];
let score = 0;

const getRandomChar = async () => {
  const res = await fetch("/random");
  const myJson = await res.json();
  return myJson;
};

const handleImgClick = (id) => {
  m = 0;
  pop = -1;
  console.log(id);
  console.log(state);
  for (const s of state) {
    m = Math.max(m, s.pop);
    if (s.id == id) {
      pop = s.pop;
    }

    let popElement = document.createElement("div");
    popElement.textContent = s.pop;
    document.getElementById(s.id).appendChild(popElement);

    let titleElement = document.createElement("div");
    titleElement.textContent = s.mediaTitle;
    document.getElementById(s.id).appendChild(titleElement);
  }

  if (pop == m) {
    document.getElementById("result").textContent = "Correct";
    score += 1;
  } else {
    document.getElementById("result").textContent = "Wrong";
    score = 0;
  }
  document.getElementById("score").textContent = `Score: ${score}`;
  document.getElementById("controls").removeAttribute("hidden");
};

const getAndDisplay = (tag_id) => {
  getRandomChar().then((res) => {
    let nameElement = document.createElement("div");
    nameElement.textContent = res.name;

    let imgElement = document.createElement("img");
    imgElement.src = res.details.data.Character.image.large;

    let title = res.details.data.Character.media.nodes[0].title.english;

    imgElement.onclick = () => {
      handleImgClick(tag_id);
    };

    document.getElementById(tag_id).appendChild(nameElement);
    document.getElementById(tag_id).appendChild(imgElement);

    state.push({
      id: tag_id,
      pop: res.details.data.Character.favourites,
      mediaTitle: title,
    });
  });
};

const handleNextButtonClick = () => {
  reset();
  init();
};

const reset = () => {
  state = [];
  removeAllChildren("char1");
  removeAllChildren("char2");
  document.getElementById("controls").setAttribute("hidden", "hidden");
  document.getElementById("result").textContent = "";
};

const removeAllChildren = (tag_id) => {
  var element = document.getElementById(tag_id);
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};

const init = () => {
  getAndDisplay("char1");
  getAndDisplay("char2");
};

init();
