import express from 'express';
import { Address } from '../models';

const router = express.Router();

router.post('/', async (req, res) => {
    const address = await Address.create(req.body);
    res.json(address);
});

router.get('/', async (req, res) => {
    const address = await Address.findAll();
    res.json(address);
});

router.get('/:id', async (req, res) => {
    const address = await Address.findByPk(req.params.id);
    if (address) {
        res.json(address);
    } else {
        res.status(404).json({ error: 'Address not found' });
    }
});

router.put('/:id', async (req, res) => {
    const address = await Address.findByPk(req.params.id);
    if (address) {
        await address.update(req.body);
        res.json(address);
    } else {
        res.status(404).json({ error: 'Address not found' });
    }
});

router.delete('/:id', async (req, res) => {
    const address = await Address.findByPk(req.params.id);
    if (address) {
        await address.destroy();
        res.json({ message: 'Address deleted successfully' });
    } else {
        res.status(404).json({ error: 'Address not found' });
    }
});

export default router;
