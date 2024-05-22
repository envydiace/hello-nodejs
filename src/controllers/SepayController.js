import sepayService from '../services/SepayService.js'

const SepayController = {
    listenSepayPayment: async (req, res) => {
        try {
            const reqBody = req.body;
            const token = req.get("Authorization");
            const resData = await sepayService.transferDiamond(reqBody, token);
            res.json(resData);
        } catch (err) {
            res.status(400).json({
                error: err.message
            })
        }
    }
}

export default SepayController;