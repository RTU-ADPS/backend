import express from 'express';
import { PaymentOption } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const paymentOption = await PaymentOption.create(req.body);
    res.json(paymentOption);
});

router.get('/', async (req, res) => {
    const paymentOption = await PaymentOption.findAll();
    res.json(paymentOption);
});

router.get('/:id', async (req, res) => {
    const paymentOption = await PaymentOption.findByPk(req.params.id);
    if (paymentOption) {
        res.json(paymentOption);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.put('/:id', async (req, res) => {
    const paymentOption = await PaymentOption.findByPk(req.params.id);
    if (paymentOption) {
        await paymentOption.update(req.body);
        res.json(paymentOption);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const paymentOption = await PaymentOption.findByPk(req.params.id);
    if (paymentOption) {
        await paymentOption.destroy();
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

export default router;
