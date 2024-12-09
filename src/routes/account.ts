import express from 'express';
import { Account } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const account = await Account.create(req.body);
    res.json(account);
});

router.get('/', async (req, res) => {
    const accounts = await Account.findAll();
    res.json(accounts);
});

router.get('/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (account) {
        res.json(account);
    } else {
        res.status(404).json({ error: 'Account not found' });
    }
});

router.put('/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (account) {
        await account.update(req.body);
        res.json(account);
    } else {
        res.status(404).json({ error: 'Account not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const account = await Account.findByPk(req.params.id);
    if (account) {
        await account.destroy();
        res.json({ message: 'Account deleted successfully' });
    } else {
        res.status(404).json({ error: 'Account not found' });
    }
});

export default router;
