import express from 'express';
import { Transaction } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const transaction = await Transaction.create(req.body);
    res.json(Transaction);
});

router.get('/', async (req, res) => {
    const transactions = await Transaction.findAll();
    res.json(transactions);
});

router.get('/:id', async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        res.json(transaction);
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

router.put('/:id', async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        await transaction.update(req.body);
        res.json(transaction);
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
        await transaction.destroy();
        res.json({ message: 'Transaction deleted successfully' });
    } else {
        res.status(404).json({ error: 'Transaction not found' });
    }
});

export default router;
