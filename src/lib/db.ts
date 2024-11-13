import { prisma } from './prisma'

export async function testConnection() {
  try {
    // Use a simple query to test connection
    await prisma.$queryRaw`SELECT 1`
    console.log('Database connection successful')
    return true
  } catch (error) {
    console.error('Database connection failed:', error)
    return false
  } finally {
    await prisma.$disconnect()
  }
}

// Wrap database operations in try-catch blocks
export async function getUsers() {
  try {
    const users = await prisma.user.findMany()
    return users
  } catch (error) {
    console.error('Error fetching users:', error)
    throw error
  }
}

export async function getMembers() {
  try {
    const members = await prisma.member.findMany()
    return members
  } catch (error) {
    console.error('Error fetching members:', error)
    throw error
  }
}

export async function getChannels() {
  try {
    const channels = await prisma.channel.findMany()
    return channels
  } catch (error) {
    console.error('Error fetching channels:', error)
    throw error
  }
}

export async function getCommunications() {
  try {
    const communications = await prisma.communication.findMany()
    return communications
  } catch (error) {
    console.error('Error fetching communications:', error)
    throw error
  }
}