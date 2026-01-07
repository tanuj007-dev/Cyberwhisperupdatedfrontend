# Blog Admin Panel

A modern, responsive, production-quality Blog Admin Panel built with **Next.js 16** and **Tailwind CSS 4**. This is a **frontend-only** implementation using mock JSON data.

## 🚀 Features

### ✅ Complete CRUD Operations
- **Blogs**: Create, Read, Update, Delete blog posts
- **Users**: Manage users and instructors  
- **Categories**: Simple category management

### 📊 Dashboard
- Real-time statistics (Total Blogs, Active Users, Categories, Likes)
- Recent blogs list
- Most popular blogs
- Top instructors showcase
- Quick action buttons

### 📝 Blog Management
- **Add/Edit Blog** with all database fields:
  - Title, Category, Author
  - Keywords, Rich Text Description
  - Thumbnail & Banner images (Upload + URL)
  - Popular toggle
  - Status (Active/Inactive)
- **Blog List** with:
  - Search by title/keywords
  - Filter by category and status
  - Pagination
  - Toggle popular status
  - Delete confirmation modal
  - View, Edit, Delete actions

### 👥 User Management
- **Add/Edit User** with all database fields:
  - Personal info (name, email, phone, address)
  - Professional details (title, biography)
  - Skills (tag input)
  - Social links (Twitter, LinkedIn, GitHub)
  - Role selection and Instructor toggle
  - Profile image
- **User List** with:
  - Search by name/email
  - Filter by role, instructor status, account status
  - Pagination
  - View details modal
  - Edit and Delete actions

### 📂 Categories
- Simple CRUD interface
- Grid layout
- Active/Inactive status

## 🗄️ Database Structure Match

All field names **exactly match** the provided database structure:

### Blog Fields
- `blog_id`, `blog_category_id`, `user_id`
- `title`, `keywords`, `description`
- `thumbnail`, `banner`
- `is_popular`, `likes`
- `added_date`, `updated_date`, `status`

### User Fields
- `id`, `first_name`, `last_name`
- `email`, `phone`, `address`, `password`
- `skills`, `social_links`, `biography`
- `role_id`, `is_instructor`
- `date_added`, `last_modified`, `status`
- `title`, `image`

### Category Fields
- `id`, `name`, `status`

## 📁 Project Structure

```
app/admin/
├── layout.jsx              # Admin layout wrapper
├── page.jsx                # Redirect to dashboard
├── dashboard/
│   └── page.jsx            # Dashboard with stats
├── blogs/
│   ├── page.jsx            # Blog list
│   ├── add/
│   │   └── page.jsx        # Add blog
│   ├── edit/[id]/
│   │   └── page.jsx        # Edit blog
│   └── [id]/
│       └── page.jsx        # View blog
├── users/
│   ├── page.jsx            # User list
│   ├── add/
│   │   └── page.jsx        # Add user
│   └── edit/[id]/
│       └── page.jsx        # Edit user
├── categories/
│   └── page.jsx            # Categories CRUD
└── settings/
    └── page.jsx            # Settings page

components/
├── layouts/
│   ├── AdminLayout.jsx     # Main layout
│   ├── Sidebar.jsx         # Left sidebar
│   └── Header.jsx          # Top header
└── ui/
    └── index.jsx           # Reusable UI components

contexts/
└── AdminContext.jsx        # Data management context

data/
├── mockBlogs.js            # Mock blog data
├── mockUsers.js            # Mock user data
└── mockCategories.js       # Mock category data
```

## 🎨 UI Components

All reusable components in `components/ui/index.jsx`:
- **Button** - Multiple variants (primary, secondary, danger, success, outline, ghost)
- **Input** - Text inputs with labels and error states
- **Textarea** - Multi-line text input
- **Select** - Dropdown with options
- **Toggle** - On/off switch
- **Badge** - Status indicators
- **Card** - Container with title and actions
- **Modal** - Popup dialogs
- **Skeleton** - Loading placeholders
- **Toast** - Notification messages

## 🚦 Getting Started

### Access the Admin Panel

Navigate to: `http://localhost:3000/admin`

You'll be automatically redirected to the dashboard.

### Navigation

Use the sidebar to access:
- **Dashboard** - Overview and stats
- **Blogs** → Add Blog / All Blogs
- **Categories** - Manage categories
- **Users** - Manage users
- **Settings** - Settings page (UI only)

## 🎯 Key Features

### Modern UI/UX
- ✅ Gradient accents and glassmorphism
- ✅ Smooth animations and transitions
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Clean card-based layout
- ✅ Intuitive navigation

### State Management
- Uses React Context API for global state
- Simulated CRUD operations
- Auto-generated IDs and timestamps
- Data persistence in memory (resets on refresh)

### Form Features
- ✅ Validation with error messages
- ✅ Image upload with preview
- ✅ Rich text editor UI
- ✅ Tag input for skills
- ✅ JSON editor for social links
- ✅ Toggle switches
- ✅ Radio buttons for status

### Table Features
- ✅ Search functionality
- ✅ Multi-column filtering
- ✅ Pagination
- ✅ Sortable columns
- ✅ Inline actions
- ✅ Delete confirmations
- ✅ Toast notifications

## 🔌 Ready for API Integration

All CRUD operations are centralized in `AdminContext.jsx`. To connect to a real backend:

1. Replace mock data imports with API calls
2. Update CRUD functions to use `fetch` or `axios`
3. Add authentication/authorization
4. Implement proper error handling

Example:
```javascript
const addBlog = async (blog) => {
  const response = await fetch('/api/blogs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(blog)
  });
  const newBlog = await response.json();
  setBlogs([...blogs, newBlog]);
};
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563EB)
- **Secondary**: Purple (#9333EA)
- **Success**: Green (#10B981)
- **Danger**: Red (#EF4444)
- **Warning**: Yellow (#F59E0B)

### Typography
- System fonts with Tailwind defaults
- Clear hierarchy with different font sizes and weights

### Spacing
- Consistent padding and margins
- Responsive spacing using Tailwind utilities

## 🛠️ Technologies

- **Next.js 16** - React framework
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **Lucide React** - Icon library
- **Context API** - State management

## ✨ Production Quality Features

- ✅ No hardcoded values
- ✅ Reusable components
- ✅ Clean code organization
- ✅ Responsive on all devices
- ✅ Loading states
- ✅ Error handling
- ✅ Form validation
- ✅ Toast notifications
- ✅ Confirmation modals
- ✅ Skeleton loaders

## 📝 Notes

- **Frontend Only**: No backend or authentication
- **Mock Data**: Data resets on page refresh
- **Field Names**: Exact match with database structure
- **Production Ready**: Clean, maintainable code
- **API Ready**: Easy to integrate with backend

## 🎉 Result

A complete, clickable, production-quality admin dashboard that:
- ✅ Manages Blogs with all features
- ✅ Manages Users with all features  
- ✅ Manages Categories
- ✅ Uses real database field names
- ✅ Uses mock JSON data
- ✅ Has modern, premium UI
- ✅ Is fully responsive
- ✅ Ready for backend integration

---

**Built with ❤️ for CyberWhisper**
