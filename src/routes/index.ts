import express from 'express';
import accountRoutes from './account';
import accountHolderRoutes from './account-holder';
import addressRoutes from './address';
import debitCardRoutes from './debit-card';
import paymentOptionRoutes from './payment-option';
import transactionRoutes from './transaction';

const router = express.Router();

router.use('account', accountRoutes);
router.use('account-holder', accountHolderRoutes);
router.use('address', addressRoutes);
router.use('debit-card', debitCardRoutes);
router.use('payment-option', paymentOptionRoutes);
router.use('transaction', transactionRoutes);

export default router;
