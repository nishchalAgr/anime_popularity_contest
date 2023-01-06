# Guess which anime character is more popular

This project is simple web game based on Anilist's graphQL API. Random characters are given by the _anime-character-random_ npm package and then fed into the Anilist API to retrieve information like popularity and associated media.

### How to run

`npm index.js` will spin up a node.js API server that integrates the aforementioned npm package and Anilist API. Relevant information is then served to the frontend, which is accessible at _localhost:3000_.

### How to play

Click on the character that you think is more popular. Guessing correctly will increase the score by 1 and incorrectly will reset the score back to 0.

### Things to fix

- [ ] The npm package has some reliablity issues and is the cause of most of the bugs. Best approach would be to write my own solution that I can easily update.

### Things to add

- [ ] Server hosting
- [ ] A leaderboard
- [ ] More polished UI
- [ ] Multithreading on to reduce loading times
