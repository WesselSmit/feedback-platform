# feedback-platform
A platform to allow students with giving and receiving feedback on their data visualisations.
## Codebase setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

## Firebase setup
Firebase services (authentication, firestore, storage) are used as the backend for this project. To host this platform on your own you'll need to follow the next steps.

### 1. Create a firebase project
```
1. https://firebase.google.com/
2. Log in/sign up
3. Head to youor console
4. Click 'add project'
5. Complete the setup steps
```

### 2. Enable the authentication service
```
1. Click 'authentication' in the sidebar
2. Click 'get started'
3. Click 'Email/password'
4. Toggle the checkmark to enable authentication using email/password
5. Click 'save'
```

### 3. Enable and setup the firestore service
```
1. Click 'firestore database' in the sidebar
2. Click 'create database'
3. Choose 'start in production mode'
4. Choose a 'cloud firestore location'
5. Click 'enable'
The platform relies on a specific database structure, without it the platform won't function (see steps below to recreate the database structure):
6. Create 5 collections
    - use the following IDs: 'insights', 'comments', 'projects', 'groups' and 'users'
    - collections cannot be empty so they need to have a document, add an empty document to each collection (the info/metadata doesn't matter)
7. The 'group' collection also needs to be populated for the platform to work, make sure to atleast have one group
    - Add to each document a field named 'users', the value should be an empty array
8. Click 'rules'
9. Update the rules with the following code (this code will allow all writes and reads, it's recommended to write your own security rules):
    rules_version = '2';
    service cloud.firestore {
        match /databases/{database}/documents {
            match /{document=**} {
                allow read, write: if true;
            }
        }
    }
10. Click 'publish'
```

### 4. Enable the storage service
```
1. Click 'storage' in the sideba
Just like the firestore, the platform relies on a specific storage structure, without it the platform won't function (see steps below to recreate the storage structure):
2. Click 'create folder'
3. Create 2 folders
    - use the following folder names: 'visualisations' and 'feedback'
4. Update the rules with the following code (this code will allow all writes and reads, it's recommended to write your own security rules):
    rules_version = '2';
    service firebase.storage {
        match /b/{bucket}/o {
            match /{allPaths=**} {
                allow read, write: if true;
            }
        }
    }
5. Click 'publish'
```

### 5. Update codebase to use your firebase project
```
1. Click 'settings > project settings' in the sidebar
2. Scroll to 'your apps'
3. Click the web option (the icon looks like: </>)
4. Enter an app nickname
5. Click 'register app'
6. Copy the 'firebaseConfig' variable in the code preview
7. Open the codebase
8. Open 'firebase.js'
9. Replace the existing 'firebaseConfig' variable with your own
10. Click 'continue to console'
```

It's possible you'll see some errors when trying to use the platform, these are related to the code not being waterproofed for empty collections (or documents missing the necessary fields). This still needs to be fixed.