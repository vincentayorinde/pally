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


export const addRevenue = async (data) => {
    try {
        const addRecord = await addDoc(collection(db, 'revenues'), data)
        console.log('revenue added with ID: ', addRecord.id)
    } catch (e) {
        console.error('Error adding revenue: ', e)
    }
}

export const getRevenue = async (id) => {
    let revenue
    try {
        const q = query(
            collection(db, 'revenues'),
            where('revenueId', '==', id)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            revenue = doc.data()
        })
        return revenue
    } catch (e) {
        console.error('Error getting revenue: ', e)
    }
}

export const getAllRevenues = async () => {
    let revenues = []
    try {
        const revenuesRef = collection(db, 'revenues');
        const snapshot = await getDocs(revenuesRef);
        snapshot.forEach(doc => {
            revenues.push(doc.data())
        });
        return revenues
    } catch (e) {
        console.error('Error getting all revenues: ', e)
    }
}
