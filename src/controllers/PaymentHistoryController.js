import paymentHistoryService from "../services/PaymentHistoryService.js";

const PaymentHistoryController = {
    getAllHistory : async (req, res) => {
        try {
            res.json(await paymentHistoryService.getAllPaymentHistory());
        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    }
}

export default PaymentHistoryController;