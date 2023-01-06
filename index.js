const randomChar = require("anime-character-random");
const express = require("express");
const app = express();

var query = `
query ($search: String) {
  Character(search: $search) {
    favourites,
    image {
      large
    },
    media {
      nodes {
        title {
          english
        }
      }
    }
  }
}
`;

async function getChar() {
  try {
    let char = await randomChar.GetChar();
    return char.CharacterName;
  } catch {
    let char = await getChar();
    return char;
  }
}

async function getCharDetails(name) {
  let vars = {
    search: name,
  };

  is_error = false;

  let char = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: vars,
    }),
  })
    .then((res) =>
      res.json().then((json) => (res.ok ? json : Promise.reject(json)))
    )
    .catch((error) => (is_error = true));

  if (is_error) {
    name = await getChar();
    char = await getCharDetails(name);
  }
  return char;
}

app.use(express.static("public"));

app.get("/random", async (req, res) => {
  let char = "";
  let details = { data: { Character: null } };
  while (details.data.Character == null) {
    char = await getChar();
    details = await getCharDetails(char);
  }
  res.send({
    name: char,
    details: details,
  });
});

app.listen(3000);
