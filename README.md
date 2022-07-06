# myVault
Convenient credential storage.

#### Distinctiveness and Complexity
myVault is a username/ password storage web application built with Django and React.js and designed with convenience in mind. This app features
a realtime search bar with filters for quick credential retrieval, and an optional storage field for URLs to provide users easy navigation to where
their passwords are required, complete with copy-to-clipboard functionality. To ensure valid user URL inputs, I implemented an async function that
checks for a response from the requested URL and informs the user of a bad result, preventing storage. For responsiveness, if the URL is valid but
another form field is invalid, the URL is not checked again unless altered. Because of the sensitive nature of the data involved, all usernames and
passwords are encrypted before being stored in the database. For these reasons, I believe myVault satisfies the requirements for Distinctiveness
and Complexity.

#### Files
/backend contains Django project files and /backend/vault contains app files for myVault.
/frontend contains React.js files, frontend/src contains the React.js source code for this app, including all CSS and JS files.
App.js is the highest order React component which renders each component contained in frontend/src/components.
/frontend/src/APIService.js contains all API functions which make calls to /backend/vault/urls.py and are handled
by /backend/vault/views.py. APIService.js also contains an async function ValidateUrl() which checks for a response from a user URL input and returns
a boolean.

#### How to Run
In a terminal window, navigate to /backend and execute "python3 manage.py runserver" to start the Django server.
In a second terminal window, navigate to /frontend and execute "npm start" to start React.js.
