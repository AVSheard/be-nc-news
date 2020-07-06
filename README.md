# Northcoders News API BE

### Link to hosted version

https://nc-news-anthony.herokuapp.com/ (as this repo is just a backend you will need to make your own requests to interact with it)

### Project summary

This repo contains the backend for a reddit style news app where users can login, read news articles and up/down vote them. They can do this by making GET, PATCH, POST and DELETE requests to a database all of which is handled here. A front end for this repo can be found here: https://github.com/AVSheard/nc-news-frontend

### How to run this repo

1. Make a copy of this repo by using the big green clone button at the top of this GitHub page

2. Open up the terminal on your computer (Ctrl+t)

3. Paste the repo into the desired folder using the command 'git clone <repo-url>', use the commands 'ls' and 'cd file_name' to navigate to the desired folder 

4. Make sure you have Visual Studio Code (VS code) downloaded on your computer (or similar coding program)

5. When in the new file in the terminal run the command 'code .' to open the repo

6. Open a new terminal in VS code and run the command 'npm install' to install everything needed to run repo

7. If you are using a linux operating system you will need to make a loginData.js file as detailed below. 

8. Before being able to use this repo you will need to get it to create a database by using the command 'npm seed'. Run this command again to revert the database back to its default setting. 

9. To check that everything in the repo is working correctly before starting run the command 'npm test'. If you get a message indicating that any of the tests have failed check that you have followed all the previous steps correctly. After checking that you have followed all the previous steps if tests are still failing then check you have not accidentally made any of your own changes to the repo.

10. Finally you will be able to run the repo by using the command 'npm run' in the projects terminal. You will need to send your own requests as this repo only contains the backend.

### Making a loginData.js file

1. Make a blank file titled loginData.js in the main folder for the repo

2. Copy the code below into the new file:

```javascript
const loginData = { username: "yourUserName", password: "yourPassword" };

module.exports = loginData;
```

3. Replace yourUserName and yourPassword to your computers database username and password

### Requirements

This repo has been designed to be run on a windows or OS operating system. 

This repo has been built using Node.js v13.4.0, earlier versions of Node.js may not be commpatible.
