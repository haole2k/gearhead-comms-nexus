import { prisma } from './prisma';

export async function testConnection() {
  try {
    await prisma.$connect();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getMembers() {
  return prisma.member.findMany();
}

export async function getChannels() {
  return prisma.channel.findMany();
}

export async function getCommunications() {
  return prisma.communication.findMany();
}