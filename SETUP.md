## Installation & Setup
These instructions assume you're using Mac OSx.  

Here are some links in case you need information about setup for other operating systems:  
[Node JS](https://nodejs.org/en/);
[Angular](https://angular.io/);
[Jasmine](https://jasmine.github.io/);
[Karma](https://karma-runner.github.io/latest/index.html);
[TypeScript](https://www.typescriptlang.org/).

## Necessary Setup for API keys

**If you gave cloned this project onto your machine:**    
from the project directory run    
 `$ touch src/app/api-keys.ts`    
This will generate a file in your src app folder - open it through your finder    
You need 3 variables: [api key from Songkick](https://www.songkick.com/api_key_requests/new) fill application out as needed, [Spotify client info](https://developer.spotify.com/dashboard/) A Spotify account is required.
``` ts
// songkick
export const songkickKey: string = '[YOUR_Songkick_API_KEY_GOES_HERE]'
//Spotify
//Your ID
export const spotifyAPIclientID: string = '[YOUR_Spotify_CLIENT_ID_GOES_HERE]'
export const spotifyAPIclientSecret: string = '[YOUR_Spotify_CLIENT_SECRET_GOES_HERE]'
```
### Basic Setup
You will need to have these tools installed on your machine. They may already be installed - see the 'Confirm installation' sections below.

### Install Node JS:
This uses Homebrew:  

```
$ brew install node
```
### Confirm installation:

```
$ node -v
(should return something like: v11.6.0)

$ npm -v
(should return something like: 3.10.5)
```
### Install TypeScript:
This uses Node Package Manager (npm) which was installed in the previous step:
```
$ npm install typescript -g
```
### Confirm installation:
```
$ tsc -v
(should return something like: Version 2.1.4)
```

### Install Angular:
```
$ npm install -g @angular/cli@1.6.5
```

### Confirm installation:
```
$ ng -v
```
You should get something like this in return:
```
    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.6.5
Node: 8.8.1
OS: darwin x64
Angular:
...
```

### OPTIONAL :: Install the Atom-TypeScript package:

```
$ apm install atom-typescript
```

Fork the repository from [GitHub](https://github.com/skillitzimberg/ua-clone).  
Clone your forked repository.  

Use your preferred command line/terminal to navigate into the directory:
```
cd ua-clone/
```

Open the project in a text editor like Atom or VS Code.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
