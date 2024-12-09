import express from 'express';
import { AccountHolder } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const accountHolder = await AccountHolder.create(req.body);
    res.json(accountHolder);
});

router.get('/', async (req, res) => {
    const accountHolders = await AccountHolder.findAll();
    res.json(accountHolders);
});

router.get('/:id', async (req, res) => {
    const accountHolder = await AccountHolder.findByPk(req.params.id);
    if (accountHolder) {
        res.json(accountHolder);
    } else {
        res.status(404).json({ error: 'Account holder not found' });
    }
});

router.put('/:id', async (req, res) => {
    const accountHolder = await AccountHolder.findByPk(req.params.id);
    if (accountHolder) {
        await accountHolder.update(req.body);
        res.json(accountHolder);
    } else {
        res.status(404).json({ error: 'Account holder not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const accountHolder = await AccountHolder.findByPk(req.params.id);
    if (accountHolder) {
        await accountHolder.destroy();
        res.json({ message: 'Account holder deleted successfully' });
    } else {
        res.status(404).json({ error: 'Account holder not found' });
    }
});

export default router;
