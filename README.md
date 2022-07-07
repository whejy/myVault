# myVault

Convenient credential storage.

## Distinctiveness and Complexity

myVault is a username/ password storage web application built with Django and React.js. Designed with convenience in mind, this app features the following:

- Add new, update, delete, delete all article functionality via API from Django to React

- Realtime search bar with filters and reset button for quick data retrieval

- Optional storage field for URLs to provide users easy navigation via the URL's favicon to where their passwords are required

- Copy-to-clipboard functionality

- Input URLS are checked via an async function, informing the user of a bad result and preventing database storage

- Dynamic form errors that respond to user input in realtime. For responsiveness, if the URL is valid but another field is invalid, the URL is not checked again unless altered

- Mobile responsive auto-scroll on article-list load that centers the articles to the viewport

- Backend encryption for all usernames and passwords

For these reasons, I believe myVault satisfies the requirements for Distinctiveness and Complexity.

## Installation

Install dependencies:

`pip install -r requirements.txt`

In a terminal window, navigate to /backend and execute:

`python3 manage.py makemigrations`

`python3 manage.py migrate`

`python3 manage.py runserver`

to initiate database and start Django server.

In a second terminal window, navigate to /frontend and execute:

`npm start`

to start React.js.

## Files

/backend contains Django project files and /backend/vault contains app files for myVault. /frontend contains React.js files, frontend/src contains the React.js source code for this app, including all CSS and JS files. App.js is the highest order React component which renders each component contained in frontend/src/components. /frontend/src/APIService.js contains all API functions which make calls to /backend/vault/urls.py and are handled by /backend/vault/views.py. APIService.js also contains an async function ValidateUr() which checks for a response from a user URL input and returns a boolean.