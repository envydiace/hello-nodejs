import testService from "../services/TestService.js";

const TestController = {
    post: (req, res) => {
        console.log(req.body)
        res.json(req.body)
    },
    testPayment: (req, res) => {
        res.json({
            success: true,
            msg: 'Bad request'
        })
    },
    testPromise : (req,res) => {
        testService.testPromise(req.query.value)
            .then((value) => {
                res.json({
                    value: value
                })
            })
            .catch((err) => {
                res.status(400).json({
                    error: err
                })
            });
    },

    testTryPromise : async (req,res) => {
        try {
            const value = await testService.testPromise(req.query.value)

            res.json({
                value: value
            })
        } catch (err) {
            res.status(400).json({
                error: err
            })
        }

    }
}

export default TestController;