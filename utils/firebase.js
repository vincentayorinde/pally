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
} from '../db/config/firebase.js'

export const add = async (data) => {
    try {
        const addRecord = await addDoc(collection(db, 'spot_prices'), data)
        console.log('record added with ID: ', addRecord.id)
    } catch (e) {
        console.error('Error adding record: ', e)
    }
}

export const read = async (spot_type) => {
    let store
    try {
        const q = query(
            collection(db, 'spot_prices'),
            where('type', '==', spot_type)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            store = doc.data()
        })
        console.log('the store >>>', store)
        return store
    } catch (e) {
        console.error('Error reading record: ', e)
    }
}

export const update = async (spot_type, price) => {
    const q = query(
        collection(db, 'spot_prices'),
        where('type', '==', spot_type)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (_doc) => {
        const docRef = doc(db, 'spot_prices', _doc.id)
        updateDoc(docRef, {
            price: price,
        })
    })
}
