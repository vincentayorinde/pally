// Import the functions you need from the SDKs you need
import dotenv from 'dotenv';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, query, where, getDocs, getDoc, updateDoc } from 'firebase/firestore';
import { getSetting } from '../firebase/setting.js';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.firebase_api_key,
  authDomain: process.env.firebase_auth_domain,
  projectId: process.env.firebase_project_id,
  storageBucket: process.env.firebase_storage_bucket,
  messagingSenderId: process.env.firebase_message_sender_id,
  appId: process.env.firebase_app_id,
  measurementId: process.env.firebase_measurement_id,
};

const firebaseConfigBackup = {
  apiKey: process.env.firebase_backup_api_key,
  authDomain: process.env.firebase_backup_auth_domain,
  projectId: process.env.firebase_backup_project_id,
  storageBucket: process.env.firebase_backup_storage_bucket,
  messagingSenderId: process.env.firebase_backup_message_sender_id,
  appId: process.env.firebase_backup_app_id,
  measurementId: process.env.firebase_backup_measurement_id,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);




export { db, addDoc, collection, query, where, getDocs, getDoc, updateDoc, doc };
