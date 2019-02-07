# HypeTown
<sup>Designed By: Charley McGowan, Devin Sweeting, Michael Brown, and Chris Rudnicky</sup>

---

## Table of Contents

**[Description](#description)**<br>
**[Installation Instructions](#installation-instructions)**<br>
**[Known or Potential Errors](#known-or-potential-errors)**<br>
**[Technologies Used](#technologies-used)**<br>
**[Acknowledgements](#acknowledgements)**<br>

---

## Description

The purpose of HypeTown is to provide users with a playlist generated from a  of musicians playing shows in a given area. HypeTown makes finding local live music simpler!

---

## Installation Instructions

Clone the repository and `cd` into your directory and run the following command:

```
$ npm install
```

**You will need to configure and API key**  
Here's how you can do this:
1. Obtain an API key from [SongKick](https://www.songkick.com/api_key_requests/new).  
<sub>(Note: this can take up to seven days)</sub>
2. Make a new file called api-keys.ts in the app directory:<br>
`src/app/api-keys.ts`.
3. Store your SongKick API key in the following format:<br>
`export const songkickKey = "xxxxxxxxxxxxxxxx"`

###  Running on the Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

---
## Known or Potential Errors

**Error 1.** Despite requiring a date parameters in the API call,  `filterByDate(locationId, minDate, maxDate)` <sup>_(in `src/app/services/sonkick.service`)_</sup> our API call will return the maximum amount of entries one call can provide regardless of the value in maxDate. Our current work around is using a method to filter the results of the API call through using conditional to push our desired event objects into an array.

If you notice any bugs or problems while using HypeTown feel free to submit a pull request!

---
## Technologies Used  
[Angular 7](https://angular.io/)  
[Angular CLI](https://github.com/angular/angular-cli)  
[SongKick](https://www.songkick.com/)  
[Spotify](https://www.spotify.com/us/)  
[TypeScript](https://www.typescriptlang.org/)

---
## Acknowledgements
