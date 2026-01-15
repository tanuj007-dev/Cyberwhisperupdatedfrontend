import { promises as fs } from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const blogsFile = path.join(dataDir, 'blogs.json');

// Ensure data directory exists
async function ensureDataDir() {
    try {
        await fs.mkdir(dataDir, { recursive: true });
    } catch (error) {
        console.error('Error creating data directory:', error);
    }
}

// Get all blogs from file
export async function getAllBlogs() {
    try {
        await ensureDataDir();
        const data = await fs.readFile(blogsFile, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // File doesn't exist yet, return empty array
        return [];
    }
}

// Save blogs to file
export async function saveBlogs(blogs) {
    try {
        await ensureDataDir();
        await fs.writeFile(blogsFile, JSON.stringify(blogs, null, 2));
        return true;
    } catch (error) {
        console.error('Error saving blogs:', error);
        return false;
    }
}

// Add a new blog
export async function addBlog(blog) {
    try {
        const blogs = await getAllBlogs();
        
        // Generate ID if not provided
        const id = blog.id || Date.now();
        
        const newBlog = {
            id,
            ...blog,
            created_at: blog.created_at || new Date().toISOString(),
            updated_at: new Date().toISOString()
        };
        
        blogs.push(newBlog);
        await saveBlogs(blogs);
        return newBlog;
    } catch (error) {
        console.error('Error adding blog:', error);
        return null;
    }
}

// Update a blog
export async function updateBlog(id, updates) {
    try {
        const blogs = await getAllBlogs();
        const index = blogs.findIndex(b => b.id === parseInt(id));
        
        if (index === -1) {
            return null;
        }
        
        blogs[index] = {
            ...blogs[index],
            ...updates,
            updated_at: new Date().toISOString()
        };
        
        await saveBlogs(blogs);
        return blogs[index];
    } catch (error) {
        console.error('Error updating blog:', error);
        return null;
    }
}

// Delete a blog
export async function deleteBlog(id) {
    try {
        const blogs = await getAllBlogs();
        const filteredBlogs = blogs.filter(b => b.id !== parseInt(id));
        await saveBlogs(filteredBlogs);
        return true;
    } catch (error) {
        console.error('Error deleting blog:', error);
        return false;
    }
}

// Get a single blog by ID
export async function getBlogById(id) {
    try {
        const blogs = await getAllBlogs();
        return blogs.find(b => b.id === parseInt(id));
    } catch (error) {
        console.error('Error getting blog:', error);
        return null;
    }
}

// Get blogs with filters
export async function getFilteredBlogs(filters = {}) {
    try {
        let blogs = await getAllBlogs();
        
        // Filter by status
        if (filters.status) {
            blogs = blogs.filter(b => b.status === filters.status);
        }
        
        // Filter by category
        if (filters.category_id) {
            blogs = blogs.filter(b => b.category_id === parseInt(filters.category_id));
        }
        
        // Filter by visibility
        if (filters.visibility) {
            blogs = blogs.filter(b => b.visibility === filters.visibility);
        }
        
        return blogs;
    } catch (error) {
        console.error('Error filtering blogs:', error);
        return [];
    }
}
