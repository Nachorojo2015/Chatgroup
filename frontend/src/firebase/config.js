// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 } from 'uuid'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

// Subir avatar
export async function uploadAvatar(file, username) {
    const storageRef = ref(storage, `avatar/${username}`)
    await uploadBytes(storageRef, file)  
    const url = getDownloadURL(storageRef)
    return url
}

// Subir imágen de grupo
export async function uploadImageGroup(file) {
  const uuid = v4()
  const storageRef = ref(storage, `group/${uuid}`)
  await uploadBytes(storageRef, file)
  const url = getDownloadURL(storageRef)
  return url
}
