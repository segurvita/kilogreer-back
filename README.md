# kilogreer-back
A Firebase express project

## Build Setup

```bash
# install firebase-tools
npm install -g firebase-tools

# login to firebase
firebase login --interactive

# Set environment variable
firebase functions:config:set withings.client_id="xxx" withings.client_secret="yyy" withings.redirect_uri="zzz" withings.state="www"

# start localhost:5000
firebase serve --only hosting,functions

# deploy
firebase deploy --only hosting,functions
```

