// firebase-connectivity-test.mjs
// Quick connectivity test — checks if Firestore is enabled and writable
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDoc, doc, deleteDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWQgJAT2S8ighO9ibsP9vOIA4Icibivi8",
  authDomain: "catering-dde32.firebaseapp.com",
  projectId: "catering-dde32",
  storageBucket: "catering-dde32.firebasestorage.app",
  messagingSenderId: "474684737870",
  appId: "1:474684737870:web:d17d904a20d70efdb2f61f",
};

console.log("🔥 Testing Firebase Firestore connectivity...");
console.log("   Project:", firebaseConfig.projectId);

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

try {
  // 1. Write test document
  console.log("\n📝 Step 1: Writing test document to Firestore...");
  const docRef = await addDoc(collection(db, "_connectivity_test"), {
    test: true,
    timestamp: new Date().toISOString(),
    source: "firebase-connectivity-test.mjs",
  });
  console.log("   ✅ Write SUCCESS — Document ID:", docRef.id);

  // 2. Read test document back
  console.log("\n📖 Step 2: Reading test document back...");
  const docSnap = await getDoc(doc(db, "_connectivity_test", docRef.id));
  if (docSnap.exists()) {
    console.log("   ✅ Read SUCCESS — Data:", JSON.stringify(docSnap.data()));
  } else {
    console.log("   ❌ Read FAILED — document not found");
  }

  // 3. Clean up test document
  console.log("\n🧹 Step 3: Cleaning up test document...");
  await deleteDoc(doc(db, "_connectivity_test", docRef.id));
  console.log("   ✅ Cleanup SUCCESS");

  console.log("\n🎉 RESULT: Firestore is LIVE and fully operational!");
  console.log("   The admin dashboard will now use Firestore (not LocalStorage).\n");
  process.exit(0);
} catch (err) {
  console.error("\n❌ RESULT: Firestore is NOT reachable.");
  const msg = err?.message ?? String(err);
  if (msg.includes("PERMISSION_DENIED")) {
    console.error("   Cause: Cloud Firestore API is DISABLED on GCP.");
    console.error("   Fix:   https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=catering-dde32");
  } else if (msg.includes("UNAUTHENTICATED")) {
    console.error("   Cause: Invalid API key or credentials.");
  } else {
    console.error("   Error:", msg);
  }
  console.log();
  process.exit(1);
}
