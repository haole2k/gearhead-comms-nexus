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
    const activeMembers = await prisma.member.count({
      where: { isOnline: true }
    });
    const totalMembers = await prisma.member.count();

    res.json({
      totalUsers,
      activeMembers,
      activeMembersPercentage: `${Math.round((activeMembers / totalMembers) * 100)}% dos membros ativos hoje`,
      userGrowth: '+20.1% em relação ao mês anterior', // This would need actual calculation
      engagementRate: '89%', // This would need actual calculation
      engagementComparison: '12% maior que a média' // This would need actual calculation
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

router.get('/stats/member-distribution', async (req, res) => {
  try {
    const leaders = await prisma.member.count({
      where: { isTeamLead: true }
    });
    
    const members = await prisma.member.count({
      where: { isTeamLead: false }
    });

    res.json([
      { name: "Líderes", value: leaders },
      { name: "Membros", value: members }
    ]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch member distribution' });
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