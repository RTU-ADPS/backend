import express from 'express';
import { DebitCard } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const debitCard = await DebitCard.create(req.body);
    res.json(debitCard);
});

router.get('/', async (req, res) => {
    const debitCards = await DebitCard.findAll();
    res.json(debitCards);
});

router.get('/:id', async (req, res) => {
    const debitCard = await DebitCard.findByPk(req.params.id);
    if (debitCard) {
        res.json(debitCard);
    } else {
        res.status(404).json({ error: 'Debit card not found' });
    }
});

router.put('/:id', async (req, res) => {
    const debitCard = await DebitCard.findByPk(req.params.id);
    if (debitCard) {
        await debitCard.update(req.body);
        res.json(debitCard);
    } else {
        res.status(404).json({ error: 'Debit card not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const debitCard = await DebitCard.findByPk(req.params.id);
    if (debitCard) {
        await debitCard.destroy();
        res.json({ message: 'Debit card deleted successfully' });
    } else {
        res.status(404).json({ error: 'Debit card not found' });
    }
});

export default router;

