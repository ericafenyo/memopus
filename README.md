# Memopus

Memopus is a web application that helps users memorize information by creating and managing flashcards.

![](./assets/Screenshot%202024-09-12%20at%2000.20.43.png)

## Features:

1. **User Authentication:**  
   Users can log in with their username and password to access the app's features, ensuring secure management of their
   cards.

2. **Card Management:**  
   Users can create, view, edit, and delete cards. Each card consists of a question, an answer and a description,
   providing a flexible way to memorize information.

3. **Columns-based Organization:**  
   Cards are categorized by columns, allowing users to easily move cards between different columns with a simple click,
   helping them keep track of progress or status.

4. **Filter by Tag:**  
   Users can filter cards by selecting a tag, which displays only the relevant cards associated with that tag or
   category.

5. **Sneak peek of the Answer:**  
   When viewing a card, the user can click on the question to reveal the answer, enabling a quick review of the content.

6. **Propose an Answer:**  
   Users can propose answers to card questions. The app compares the proposed answer with the stored answer, providing
   instant feedback based on the comparison.

## Installation

### Prerequisite

Make sure you have the following installed:

- Node.js (v18 or higher)
- Angular CLI (The version used in this project is 18.2)
- npm

Download and navigate to the project directory in your terminal:

```sh
cd memopus
```

Install dependencies:

```sh
npm install
```

## 2. Start the JSON Server

To start the json-server (in watch mode):

```sh
npm run start:server
```

## 3. Start the Angular Application

```sh
npm start
```

Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Technical documentation

### Profile structure

```
├── assets
├── public
└── src
    ├── app
    │   ├── components
    │   │   └── ui
    │   ├── core
    │   │   ├── guards
    │   │   ├── services
    │   │   └── enums
    │   ├── models
    │   ├── pages
    └── environments
```

## UI and Theming

Components are custom-made and styled using Tailwind utility classes.

## App state management

As someone who comes from a React background, I am more familiar with Redux for state management. So, I duplicated it
using ReactiveX BehaviorSubject subject and created a `Store`.
BehaviorSubject is a type of Subject,that stores the latest value emitted to its consumers, and whenever a new Observer
subscribes, it will immediately receive the “current” value from the BehaviorSubject. so it a way it search as a cache.

This `Store` serve as a single source of truth for the application state, and it is injected into the ui components.
The values exposed by the `Store` are Observables, which means the components to subscribe to changes will be notified
whenever the state changes.

ui-components -> Store -> Service -> JSON Server (API)

## Further help

To get more help on the Angular CLI use `ng help` or go check out
the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
