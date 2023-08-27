import {
    db,
    doc,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    updateDoc,
} from '../config/firebase.js'


export const addTransaction = async (data) => {
    try {
        const addTransaction = await addDoc(collection(db, 'transactions'), data)
        console.log('transaction added with ID: ', addTransaction.id)
    } catch (e) {
        console.error('Error adding transaction: ', e)
    }
}

export const getTransaction = async (id) => {
    let store
    try {
        const q = query(
            collection(db, 'transactions'),
            where('transactionId', '==', id)
        )
        const querySnapshot = await getDocs(q)
        querySnapshot.forEach((doc) => {
            store = doc.data()
        })
        return store
    } catch (e) {
        console.error('Error getting transaction: ', e)
    }
}

export const getAllTransactions = async () => {
    let transactions = []
    try {
        const transactionsRef = collection(db, 'transactions');
        const snapshot = await getDocs(transactionsRef);
        snapshot.forEach(doc => {
            transactions.push(doc.data())
        });
        return transactions
    } catch (e) {
        console.error('Error getting all transactions: ', e)
    }
}

export const updateTransaction = async (id, status, sellingPrice) => {
    const q = query(
        collection(db, 'transactions'),
        where('transactionId', '==', id)
    )
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (_doc) => {
        const docRef = doc(db, 'transactions', _doc.id)
        updateDoc(docRef, {
            status: status,
            sellingPrice,
            dateUpdated: new Date().toISOString()
        })
    })
}