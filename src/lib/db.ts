// Remove direct Prisma usage from frontend
export async function testConnection() {
  try {
    const response = await fetch('/api/test-connection');
    const data = await response.json();
    return data.success;
  } catch (error) {
    console.error('API connection test failed:', error);
    return false;
  }
}

export async function getUsers() {
  try {
    const response = await fetch('/api/users');
    return await response.json();
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

export async function getMembers() {
  try {
    const response = await fetch('/api/members');
    return await response.json();
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
}

export async function getChannels() {
  try {
    const response = await fetch('/api/channels');
    return await response.json();
  } catch (error) {
    console.error('Error fetching channels:', error);
    throw error;
  }
}

export async function getCommunications() {
  try {
    const response = await fetch('/api/communications');
    return await response.json();
  } catch (error) {
    console.error('Error fetching communications:', error);
    throw error;
  }
}