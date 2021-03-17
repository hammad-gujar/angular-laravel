// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false, 
  firebase: {
    apiKey: "AIzaSyDaC65yUqPTpgpUSZTDmfIbSQAWi9yuH2E",
    authDomain: "kanban-fire-10daa.firebaseapp.com",
    projectId: "kanban-fire-10daa",
    storageBucket: "kanban-fire-10daa.appspot.com",
    messagingSenderId: "905509249087",
    appId: "1:905509249087:web:a8306002c7eb70b35b588a",
    measurementId: "G-7E4CKM5W3C"
  }
};

export const serverAppURL = "http://127.0.0.1:8000/api/"; 

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
