# React movie app

A react movie app is not something very unique, I know, you've probably already seen it somewhere on the internet, but I am a huge movie fanatic and I could not resist to make one. I've applied a personal touch while still trying to make it resemble the most popular streaming platforms. This fully responsive app is connected to a public movie database and you can search for a specific movie, swipe through the genres and add your favorite movie to a list.

In this second app built with React I covered some more advanced topics:
 - Hooks - UseState, UseEffect;
 - API requests using asynchronous js - fetch(), async and await;
 - Higher order js functions - map() and filter();

API used for the project - https://www.themoviedb.org/

Libraries used:
- React Spring for animations;
- React Responsive for responsive design;

work by Marco Falcone

Note - For the horizontal scroll in the Movielist component I've used the DOM selector getElementbyId which is something you shouldn't do with React (the method function will return only the first element with the specified id which will cause errors in the application, in this case all the arrows in the page were selecting only the first container) and found out about Refs only later on but I had fun trying to find a workaround and being a personal project I'll leave the code as it is . I've managed to make it work by passing a unique ID to each component with props.
