import paymentHistoryRepository from "../repository/paymentHistoryRepository.js";
import {format} from "date-fns";
import Utils from "../utils/Utils.js";

const PaymentHistoryService = {
    getAllPaymentHistory: async () => {
        let results = [];
        const histories = await paymentHistoryRepository.getAllHistory();

        const result = Utils.groupBy('trans_id')(histories);

        for (const [key, value] of Object.entries(result)) {
            let childList = [];
            value.map(item => {
                childList.push({
                    created: format(item.created, 'yyyy-MM-dd hh:mm:ss'),
                    status: item.status,
                    message: item.message
                })
            })
            const item = value[0];
            results.push({
                uid: item.uid,
                transferAmount: item.transfer_amount,
                transactionDate: item.transaction_date,
                diamondAmount: item.diamond_amount,
                diamondRate: item.diamond_rate,
                info: childList
            })
        }
        results.sort((a, b) => {
                if (a.transactionDate > b.transactionDate) return -1;
                if (a.transactionDate < b.transactionDate) return 1;
                return 0;
            }
        )
        return results;
    },
    savePaymentHistory: async (transId, uid, transferAmount, transactionDate, diamondAmount, diamondRate, status, message) => {
        return await paymentHistoryRepository.insertHistory({
            trans_id: transId,
            uid: uid,
            transfer_amount: transferAmount,
            transaction_date: transactionDate,
            diamond_amount: diamondAmount,
            diamond_rate: diamondRate,
            status: status,
            message: message
        })
    }
}

export default PaymentHistoryService