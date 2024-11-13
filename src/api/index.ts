import express from 'express';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/test-connection', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ success: true });
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ success: false, error: 'Database connection failed' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

router.get('/members', async (req, res) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch members' });
  }
});

router.get('/channels', async (req, res) => {
  try {
    const channels = await prisma.channel.findMany();
    res.json(channels);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch channels' });
  }
});

router.get('/communications', async (req, res) => {
  try {
    const communications = await prisma.communication.findMany();
    res.json(communications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch communications' });
  }
});

export default router;