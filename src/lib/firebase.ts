import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  Firestore
} from "firebase/firestore";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guestCount: number;
  budget: number;
  location: string;
  requirements?: string;
  createdAt: string;
  status: 'New' | 'Contacted' | 'Negotiation' | 'Confirmed' | 'Completed' | 'Cancelled';
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Check if all essential keys are provided
const hasFirebaseConfig = 
  firebaseConfig.apiKey && 
  firebaseConfig.projectId && 
  firebaseConfig.authDomain;

let app;
let firestoreDb: Firestore | null = null;

if (hasFirebaseConfig) {
  try {
    app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    firestoreDb = getFirestore(app);
  } catch (error) {
    console.error("Firebase failed to initialize:", error);
  }
} else {
  if (process.env.NODE_ENV !== 'production') {
    console.warn("Firebase config keys are missing. Using LocalStorage client-side fallback.");
  }
}

// Local Storage Fallback Helpers
const getLocalLeads = (): Lead[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem("catering_leads");
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

const setLocalLeads = (leads: Lead[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem("catering_leads", JSON.stringify(leads));
};

// Save a new lead
export async function saveLead(leadData: Omit<Lead, "id" | "createdAt" | "status">): Promise<string> {
  const newLead: Omit<Lead, "id"> = {
    ...leadData,
    status: "New",
    createdAt: new Date().toISOString(),
  };

  if (firestoreDb) {
    try {
      const docRef = await addDoc(collection(firestoreDb, "leads"), newLead);
      return docRef.id;
    } catch (err) {
      console.error("Error saving lead to Firestore, saving to LocalStorage instead:", err);
    }
  }

  // LocalStorage Fallback
  const leads = getLocalLeads();
  const fallbackId = "lead_" + Math.random().toString(36).substr(2, 9);
  leads.push({ id: fallbackId, ...newLead });
  setLocalLeads(leads);
  return fallbackId;
}

// Retrieve all leads
export async function getLeads(): Promise<Lead[]> {
  if (firestoreDb) {
    try {
      const q = query(collection(firestoreDb, "leads"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const leads: Lead[] = [];
      querySnapshot.forEach((doc) => {
        leads.push({ id: doc.id, ...doc.data() } as Lead);
      });
      return leads;
    } catch (err) {
      console.error("Error fetching leads from Firestore, fetching from LocalStorage instead:", err);
    }
  }

  // LocalStorage Fallback
  const localLeads = getLocalLeads();
  // Sort by createdAt descending
  return localLeads.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

// Update lead status
export async function updateLeadStatus(id: string, status: Lead["status"]): Promise<void> {
  if (firestoreDb && !id.startsWith("lead_")) {
    try {
      const leadDocRef = doc(firestoreDb, "leads", id);
      await updateDoc(leadDocRef, { status });
      return;
    } catch (err) {
      console.error("Error updating Firestore lead, updating LocalStorage fallback:", err);
    }
  }

  // LocalStorage Fallback
  const leads = getLocalLeads();
  const updatedLeads = leads.map((lead) => 
    lead.id === id ? { ...lead, status } : lead
  );
  setLocalLeads(updatedLeads);
}

// Helper to determine if we are in LocalStorage Fallback mode
export function isUsingFallback(): boolean {
  return !firestoreDb;
}
