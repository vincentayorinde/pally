
import {
    db,
    doc,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    getDoc,
    updateDoc,
} from '../config/firebase.js'

export const addSetting = async (data) => {
    try {
        const addRecord = await addDoc(collection(db, 'settings'), data)
        console.log('setting added with ID: ', addRecord.id)
    } catch (e) {
        console.error('Error adding setting: ', e)
    }
}


export const getSetting = async (name) => {
    let setting
    try {
        const q = query(
            collection(db, 'settings'),
            where('name', '==', name)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            setting = doc.data()
        })
        console.log('the setting >>>', setting)
        return setting
    } catch (e) {
        console.error('Error getting setting: ', e)
    }
}

export const getAllSettings = async () => {
    let data = []
    try {
        const settingsRef = collection(db, 'settings');
        const snapshot = await getDocs(settingsRef);
        snapshot.forEach(doc => {
            data.push(doc.data())
        });
        return data
    } catch (e) {
        console.error('Error getting setting: ', e)
    }
}

export const updateSetting = async (name, value) => {
    const q = query(
        collection(db, 'settings'),
        where('name', '==', name)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (_doc) => {
        const docRef = doc(db, 'settings', _doc.id)
        updateDoc(docRef, {
            value: value,
            dateUpdated: new Date()
        })
    })
}