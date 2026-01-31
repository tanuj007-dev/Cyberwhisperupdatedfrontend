import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Get all users from file
export async function getAllUsers() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(usersFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // File doesn't exist yet, return empty array
        console.log('Users file not found, returning empty array');
        return [];
    }
}

// Save users to file
export async function saveUsers(users) {
    try {
        await ensureDataDir();
        await fs.writeFile(usersFile, JSON.stringify(users, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving users:', error);
        return false;
    }
}

// Add a new user
export async function addUser(user) {
    try {
        const users = await getAllUsers();
        
        // Generate ID if not provided
        const id = user.id || Date.now();
        
        const newUser = {
            id,
            ...user,
            created_at: user.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        users.push(newUser);
        await saveUsers(users);
        return newUser;
    } catch (error) {
        console.error('Error adding user:', error);
        return null;
    }
}

// Update a user
export async function updateUser(id, updates) {
    try {
        const users = await getAllUsers();
        const index = users.findIndex(u => u.id === parseInt(id));
        
        if (index === -1) {
            return null;
        }
        
        users[index] = {
            ...users[index],
            ...updates,
            updated_at: new Date().toISOString()
        };
        
        await saveUsers(users);
        return users[index];
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}

// Delete a user
export async function deleteUser(id) {
    try {
        const users = await getAllUsers();
        const filteredUsers = users.filter(u => u.id !== parseInt(id));
        
        if (filteredUsers.length === users.length) {
            // No user was deleted
            return false;
        }
        
        await saveUsers(filteredUsers);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
}

// Get a single user by ID
export async function getUserById(id) {
    try {
        const users = await getAllUsers();
        return users.find(u => u.id === parseInt(id));
    } catch (error) {
        console.error('Error getting user:', error);
        return null;
    }
}

// Get users with filters
export async function getFilteredUsers(filters = {}) {
    try {
        let users = await getAllUsers();
        
        // Filter by status
        if (filters.status) {
            users = users.filter(u => u.status === filters.status);
        }
        
        // Filter by role
        if (filters.role) {
            users = users.filter(u => u.role === filters.role);
        }
        
        // Filter by is_instructor
        if (filters.is_instructor !== undefined) {
            users = users.filter(u => u.is_instructor === filters.is_instructor);
        }
        
        return users;
    } catch (error) {
        console.error('Error filtering users:', error);
        return [];
    }
}
