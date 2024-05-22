import tokenController from '../controllers/TokenController.js'
import testController from '../controllers/TestController.js'
import sepayController from '../controllers/SepayController.js'
import userController from '../controllers/UserController.js';
import express from "express";
import authController from "../controllers/AuthController.js";
import settingController from "../controllers/SettingController.js";
import authFilter from "./filter/AuthFilter.js";
import traceFilter from "./filter/TraceFilter.js";
import paymentHistoryController from "../controllers/PaymentHistoryController.js";
const router = express.Router();

router.use(traceFilter)
router.use(authFilter)

router.route('/token')
    .get(tokenController.getLastToken)
    .post(tokenController.generateToken);

router.route('/test')
    .post(testController.post)
    .get(testController.testPromise)

router.route('/test/try-promise')
    .get(testController.testTryPromise)

router.route('/test/payment')
    .post(testController.testPayment);

router.route('/sepay')
    .post(sepayController.listenSepayPayment);

router.route('/user')
    .get(userController.get)

router.route('/auth/login')
    .post(authController.login)

// router.route('/auth/register')
//     .post(authController.register)

router.route('/auth/renew-access-token')
    .post(authController.reNewAccessToken)

router.route('/auth/check-role-admin')
    .get(authController.checkRoleAdmin)

router.route('/setting/get-all')
    .get(settingController.getAllSetting)

router.route('/admin/setting/get-all')
    .get(settingController.getAllAdminSetting)

router.route('/setting/get-by-key')
    .get(settingController.getSettingByKey)

router.route('/admin/setting/update-setting')
    .post(settingController.updateSetting)

router.route('/admin/payment-history/get-all')
    .get(paymentHistoryController.getAllHistory)

export default router;