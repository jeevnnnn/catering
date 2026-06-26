# Firebase Project Configuration Guide

Follow these step-by-step instructions to create a Firebase project, configure Firestore, and secure your credentials.

---

## 1. Create a Firebase Project

1. Open the [Firebase Console](https://console.firebase.google.com/).
2. Click **Add project** (or **Create a project**).
3. Enter your project name (e.g., `kaeon-catering`).
4. (Optional) Configure Google Analytics for your project based on your requirements and click **Continue**.
5. Click **Create project** and wait for the initialization to complete. Click **Continue** once ready.

---

## 2. Register Your Web App

1. On the project home page, click the **Web** icon (`</>`) to add a web application.
2. Enter an App nickname (e.g., `Catering Web Portal`).
3. (Optional) Check the box for *Firebase Hosting* if you plan to deploy your application to Firebase Hosting.
4. Click **Register app**.
5. Copy the configuration object displayed under `const firebaseConfig = { ... }`.
   - You will need these keys to configure your `.env` file.

---

## 3. Provision Cloud Firestore Database

The project uses Cloud Firestore to store and manage lead submissions.

1. In the left-hand navigation sidebar, click **Build** -> **Firestore Database**.
2. Click **Create database**.
3. Select your preferred database location (choose a location close to your primary audience, e.g., `eur3` or `us-central`). Click **Next**.
4. Start in **Production mode** (secure rules) and click **Create**.
5. Once created, go to the **Rules** tab and configure your Firestore rules. For example, to allow public lead generation requests while restricting read access to authenticated administrative sessions:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // Public users can submit leads, but only read their own if authenticated.
    match /leads/{leadId} {
      allow create: if true;
      allow read, update, delete: if true; // Restrict this or configure admin rules as needed
    }
  }
}
```

---

## 4. Obtain Environment Credentials

Refer to the configuration keys you copied in Step 2:

- `apiKey` -> Map to `NEXT_PUBLIC_FIREBASE_API_KEY`
- `authDomain` -> Map to `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `projectId` -> Map to `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `storageBucket` -> Map to `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `messagingSenderId` -> Map to `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `appId` -> Map to `NEXT_PUBLIC_FIREBASE_APP_ID`

Paste these variables into your `.env` file in the root of the project directory.
