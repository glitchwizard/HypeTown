# HypeTown

_A site to generate a playlist based off of musical performers in your area._

### Developed By
J. Michael Brown, Charley McGowan, Chris Rudnicky, and Devin Sweeting

## Table of contents
**[Description](#description)**<br>
**[Setup & Installation](#setup-and-installation)**<br>
**[Known Bugs](#known-bugs)**<br>
**[Support](#support-and-contact-details)**<br>
**[Technologies Used](#technologies-used)**<br>
**[License](#license)**<br>
**[Copyright](#copyright)**<br>

## Description

On our site, you give a location and date range to generate a list of performances playing in within those parameters (based off of the Songkick API). Next this site generates a Spotify playlist based off of those artists return from first call. It then displays artists, venues, and event page link.

## Setup and Installation
See [SETUP.md](./SETUP.md) for details about tools you may need to install and use to work on and use this project on your Mac.  

Here are some links in case you need information about setup for other operating systems:  
[Angular](https://angular.io/);
[Karma](https://karma-runner.github.io/latest/index.html);
[Jasmine](https://jasmine.github.io/);
[Node JS](https://nodejs.org/en/);
[TypeScript](https://www.typescriptlang.org/).

![HypeTown](src/assets/screenshot.png)

## Known Bugs

* Not all artists songs are returned
* Artists from spotify are displayed out of order on the page
* Moving too quickly on the page can create an endless loop somehow.
* Making multiple searches without refreshing the page will append to the current lists, rather than start the whole thing over again
* CSS :hover sizing could be a bit smoother

## Support and contact details
Michael Brown :: [gmail](jmichaelbrown132737@gmail.com)
Charley McGowan :: [GitHub](https://github.com/glitchwizard)
Devin Sweeting :: [gmail](devinsweeting@gmail.com)
Chris Rudnicky :: [gmail](chrisrudnicky@gmail.com)

## Technologies Used
(This wonderful table was lovingly pilfered from [Tanvi Garg](https://github.com/TanviCodeLife) and modestly edited for personal sensibilities.)

For versions and a full list of dependencies, plugins, and scripts see the "devDependencies" section in [package.json](./package.json).  

| Dependency | Description |
| --- | --- |
| babel-core | Babel compiler core |
| babel-loaded | Babel loader for webpack |
| babel-present-es2015 | Specifies how Babel can convert ES6 to ES5 |
| clean-webpack-plugin | Clean your build folder(s) before building |
| css-loader | Interprets `@import` and `url()` like `import/require()` and resolves them |
| dotenv-webpack | imports information like API keys from .env to src/anyfile.js |
| eslint | Identifies and reports on patterns found in Javscript code |
| eslint-loader | ESLint loader for webpack |
| html-webpack-plugin | Simplifies creation of HTML files to serve webpack bundles |
| jasmine | Allows Jasmine specs to be run |
| jasmine-core | JavaScript BDD testing framework |
| karma | Allows the execution of JavaScript code in multiple *real* browsers |
| karma-chrome-launcher | Launcher for Google Chrome, Google Chrome Canary, and Google Chromium |
| karma-cli | Use Karma from the command line |
| karma-jasmine | Plugin - adapter for Jasmine testing framework |
| karma-jasmine-html-reporter | Dynamically shows test results at debug.html page |
| karma-jquery | Plugin - adapter for jQuery framework |
| karma-webpack | Use webpack to preprocess files in Karma |
| Songkick API | Service that holds event information for music venues |
| Spotify API | Popular music hosting platform - api allows access to searching music, artist, and more |
| style-loader | adds CSS to the DOM by injecting a `<style>` tag |
| uglifyjs-webpack-plugin | Minifies JavaScript |
| webpack | A module bundler used to bundle JavaScript files and additional resources   *Note - Remove carrot sign ^ in version number if webpack issues occur* |
| webpack-cli | Use webpack from command line |
| webpack-dev-server | Provides live reloading during development |
| css-loader and style-loader | renders images in DOM when `<img>` tag is used |

## License
Licensed under the MIT license.

## Copyright
Copyright (c) 2019 ** John Michael Brown, Charley McGowan, Devin Sweeting, Chris Rudnicky **

## Developer Notes    
README.md and SETUP.md template provided by [Ralph Perdomo](https://github.com/pseudoralph)
