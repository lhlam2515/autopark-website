/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
let sw = fs.readFileSync("firebase-messaging-sw.template.js", "utf8");

sw = sw
  .replace("__FIREBASE_API_KEY__", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
  .replace(
    "__FIREBASE_AUTH_DOMAIN__",
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
  )
  .replace(
    "__FIREBASE_PROJECT_ID__",
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
  )
  .replace(
    "__FIREBASE_MESSAGING_SENDER_ID__",
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
  )
  .replace("__FIREBASE_APP_ID__", process.env.NEXT_PUBLIC_FIREBASE_APP_ID);

fs.writeFileSync("public/firebase-messaging-sw.js", sw);
