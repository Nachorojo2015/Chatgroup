import { GOOGLE_APPLICATON_CREDENTIALS, FIREBASE_STORAGE_BUCKET } from "./variables.js";
import admin from 'firebase-admin'

admin.initializeApp({
    credential: admin.credential.cert(GOOGLE_APPLICATON_CREDENTIALS),
    storageBucket: FIREBASE_STORAGE_BUCKET
})

const bucket = admin.storage().bucket()

export async function uploadFile(filePath, destination) {
    await bucket.upload(filePath, {
        destination: destination
    })
    console.log('File uploaded')
}

export async function getFileUrl(filePath) {
    const file = bucket.file(filePath);

    // Genera una URL firmada válida por 15 minutos (puedes ajustar el tiempo)
    const [url] = await file.getSignedUrl({
        action: 'read',
        expires: Date.now() + 10 * 365 * 24 * 60 * 60 * 1000, // 15 minutos
    });

    return url;
}