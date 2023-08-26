import { addTransaction, updateTransaction, getAllTransactions } from '../../db/firebase/transaction.js'
import { addRevenue } from '../../db/firebase/revenue.js'
import priceService from '../../services/price/index.js'


import { v4 as uuidv4 } from 'uuid';

let transactions;

const makeBTCBuyOrder = async (amountUSD, amountBTC, buyMargin, sellMargin, marketPrice, percentageChange, fees) => {
    let message = []
    let btcTransactions = []

    transactions = await getAllTransactions()
    btcTransactions.push(transactions.filter(t => t.currency === 'btc' && t.status === 'processing'));
    btcTransactions = btcTransactions[0]
    console.log('the processing btcTransactions', btcTransactions)

    if (btcTransactions.length > 1) {
        message.push(`There are currently processing BTC trades >> >> ${btcTransactions.length} = ${JSON.stringify(btcTransactions)}`)

        btcTransactions.forEach(async (btcTransaction) => {
            const transactionBuyPercentage = await priceService.getBtcUsdtPrice(btcTransaction.price)

            const sell = await makeBTCSellOrder(btcTransaction.amountUSD, sellMargin, btcTransaction.transactionId, btcTransaction.price, transactionBuyPercentage.percentageChange, btcTransaction.status, buyMargin, marketPrice, fees)
            if (message.length > 1) {
                message = ''
                message = `Transaction count is ${btcTransactions.length}. Also, Could not sell BTC because there is no current processing txns. Buy Margins is ${buyMargin}% Whiles Sell Margin is ${sellMargin}%`;
            } else {
                message.push(sell);
            }
        });
    }
    else if (btcTransactions.length < 2) {
        console.log('BTC percentageChange < buyMargin', percentageChange < buyMargin, 'percentageChange', percentageChange, 'buyMargin', buyMargin)
        await addTransaction({ price: marketPrice, type: 'buy', amountUSD, amountBTC, status: 'processing', transactionId: uuidv4(), percentageChangeFromLastPrice: percentageChange, currency: 'btc', dateAdded: new Date().toISOString(), dateUpdated: new Date().toISOString() })
        message.push(`Buy Order of ${amountUSD} worth of BTC made at ${marketPrice}`)
        return message.length > 0 ? message : `n/a in buy BTC block`;
    }
    return message
}

const makeBTCSellOrder = async (txnAmountUSD, sellMargin, transactionId, buyPrice, percentageChange, txnStatus, buyMargin, sellingPrice, fees) => {
    console.log('the buyPrice', buyPrice, 'the sell Price', sellingPrice)
    console.log('percentageChange > sellMargin BTC >>', percentageChange, sellMargin)
    if (percentageChange > sellMargin && txnStatus === 'processing') {
        const priceDifference = sellingPrice - buyPrice
        const gainOrLoss = priceDifference / buyPrice
        const gainOrLossPercentage = (gainOrLoss * txnAmountUSD)
        const revenue = (gainOrLossPercentage * txnAmountUSD) + txnAmountUSD
        const revenueAfterFeeDeduction = revenue - fees
        const actualProfit = revenueAfterFeeDeduction - txnAmountUSD
        const runningBalance = revenueAfterFeeDeduction

        console.log('actualProfit + revenueAfterFeeDeduction', actualProfit + revenueAfterFeeDeduction, 'actualProfit', actualProfit, 'revenueAfterFeeDeduction', revenueAfterFeeDeduction)

        await addRevenue({ revenueId: uuidv4(), amountBought: txnAmountUSD, runningBalance, revenue, actualProfit, revenueAfterFeeDeduction, fees, gainOrLossPercentage, transactionId, currency: 'btc', buyPrice, sellingPrice, dateAdded: new Date().toISOString() })
        await updateTransaction(transactionId, 'completed', sellingPrice)

        return `Sell of ${txnAmountUSD} worth of BTC made at ${sellingPrice}`;
    }
    return `Could not sell BTC because Buy Margin is ${buyMargin}% Whiles Sell Margin is ${sellMargin}%`;
}


const makeETHBuyOrder = async (amountUSD, amountETH, buyMargin, sellMargin, marketPrice, percentageChange, fees) => {
    let message = []
    let ethTransactions = []

    transactions = await getAllTransactions()
    ethTransactions.push(transactions.filter(t => t.currency === 'eth' && t.status === 'processing'));
    ethTransactions = ethTransactions[0]
    console.log('the ethTransactions', ethTransactions)
    if (ethTransactions.length > 1) {

        message.push(`There are currently processing ETH trades >> ${ethTransactions.length} = ${JSON.stringify(ethTransactions)}`)

        ethTransactions.forEach(async (ethTransaction) => {
            const transactionBuyPercentage = await priceService.getEthUsdtPrice(ethTransaction.price)

            const sell = await makeETHSellOrder(ethTransaction.amountUSD, sellMargin, ethTransaction.transactionId, ethTransaction.price, transactionBuyPercentage.percentageChange, ethTransaction.status, buyMargin, marketPrice, fees)
            if (message.length > 1) {
                message = ''
                message = `Transaction count is ${ethTransactions.length}. Also, Could not sell ETH because there is no current processing txns. Buy Margins is ${buyMargin}% Whiles Sell Margin is ${sellMargin}%`;
            } else {
                message.push(sell);
            }
        });
    }
    else if (ethTransactions.length < 2) {
        console.log('ETH percentageChange < buyMargin', percentageChange < buyMargin, 'percentageChange', percentageChange, 'buyMargin', buyMargin)
        await addTransaction({ price: marketPrice, type: 'buy', amountUSD, amountETH, status: 'processing', transactionId: uuidv4(), percentageChangeFromLastPrice: percentageChange, currency: 'eth', dateAdded: new Date().toISOString(), dateUpdated: new Date().toISOString() })
        message.push(`Buy Order of ${amountUSD} worth of ETH made at ${marketPrice}`)
        return message.length > 0 ? message : `n/a inside buy ETH block`;
    }
    return message
}

const makeETHSellOrder = async (txnAmountUSD, sellMargin, transactionId, buyPrice, percentageChange, txnStatus, buyMargin, sellingPrice, fees) => {
    console.log('the buyPrice', buyPrice, 'the sell Price', sellingPrice)
    console.log('percentageChange > sellMargin ETH >>', percentageChange, sellMargin)
    if (percentageChange > sellMargin && txnStatus === 'processing') {
        const priceDifference = sellingPrice - buyPrice
        const gainOrLoss = priceDifference / buyPrice
        const gainOrLossPercentage = (gainOrLoss * txnAmountUSD)
        const revenue = (gainOrLossPercentage * txnAmountUSD) + txnAmountUSD
        const revenueAfterFeeDeduction = revenue - fees
        const actualProfit = revenueAfterFeeDeduction - txnAmountUSD
        const runningBalance = revenueAfterFeeDeduction

        console.log('actualProfit + revenueAfterFeeDeduction', actualProfit + revenueAfterFeeDeduction, 'actualProfit', actualProfit, 'revenueAfterFeeDeduction', revenueAfterFeeDeduction)

        await addRevenue({ revenueId: uuidv4(), amountBought: txnAmountUSD, runningBalance, revenue, actualProfit, revenueAfterFeeDeduction, fees, gainOrLossPercentage, transactionID: transactionId, currency: 'eth', buyPrice, sellingPrice, dateAdded: new Date().toISOString() })
        await updateTransaction(transactionId, 'completed', sellingPrice)

        return `Sell of ${txnAmountUSD} worth of ETH made at ${sellingPrice}`;
    }
    return `Could not sell ETH because Buy Margin is ${buyMargin}% Whiles Sell Margin is ${sellMargin}%`;
}

export default {
    makeBTCBuyOrder,
    makeETHBuyOrder,
    makeBTCSellOrder,
    makeETHSellOrder
}
