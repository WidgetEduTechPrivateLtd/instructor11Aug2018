# Instructor
This contains files owing to instructor part of the website.

While reading and/or running this module this fact must be kept in mind:  This is only a part of whole functionality. Some parts may not work properly until the "head and tail" are connected or integrated.
This file may explain how to do integrate those parts and how you are expected to do that.

## Start

Run this module by navigating to the folder its app.js file is located in and running:
$ DEBUG=instructor:* npm run devstart

If this runs, you must get this after a few nodemon info lines:

instructor:server Listening on port 5000 +0ms
Database connected


## Available Routes:

Previous command must start the local server and now you can open your browser and visit the pages this app serves.
Please note that the port set in this app is 5000. Hence this address must arrive you to the app resources:

localhost:5000/ping --> If this address return a pong messege, your app's routes are working fine.

localhost:5000/ --> For the starting page of THIS module *

localhost:5000/login --> For the common login page

localhost:5000/register --> For the registeration page of instructor

localhost:5000/instructor --> this SHOULD be the default path for all functionality provided further to approved instructors

localhost:5000/instructor/dashboard --> this should render the instructor dashboard page with basic layout **

\* & ** are explained in further topics

## Assumptions/expectations and Must-Dos for other modules:

\* This is just for this module means replacing this with appropiate paths from student module is expected. In fact, this can even be completely replaced as students won't need going to instructor part and instructor can register from any appropiate button placed in student module.

** This has just the sidebar(menu) and header footer done. All else is supposed to be added.

Assumptions & must-do:

1. Student module will register the most basic user i.e. student and verify their email while creating entries in User.js model.
2. Admin will change approval value in User.js when approved and set nodemailer as needed.
3. Replacing the company logo in /views/partials/header.ejs with real logo.
4. Nodemailer details will be filled when needed with an appropiate credential.

Note: Main app is in the instructor folder. /public only contains the raw static html,css files which were used to design the views. Editing these will not affect views as they use /instructor/public for static files.

For any queries or suggestions, email me at zircoz@outlook.com . Happy to help out.
