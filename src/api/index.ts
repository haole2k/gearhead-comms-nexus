import express from 'express';
import prisma from '../lib/prisma';

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

router.get('/stats', async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const adminCount = await prisma.user.count({
      where: { role: 'ADMIN' }
    });

    res.json({
      totalUsers,
      adminCount,
      adminPercentage: `${Math.round((adminCount / totalUsers) * 100)}% são administradores`,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

router.get('/stats/user-growth', async (req, res) => {
  try {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const users = await prisma.user.findMany({
      where: {
        createdAt: {
          gte: sixMonthsAgo
        }
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const monthlyData = users.reduce((acc: any[], user) => {
      const month = user.createdAt.toLocaleString('default', { month: 'short' });
      const existingMonth = acc.find(data => data.name === month);
      
      if (existingMonth) {
        existingMonth.total += 1;
      } else {
        acc.push({ name: month, total: 1 });
      }
      
      return acc;
    }, []);

    res.json(monthlyData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user growth data' });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        role: true,
        createdAt: true,
        updatedAt: true
      }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

export default router;