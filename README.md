# DevConnector

A full-stack social media platform for developers to connect, share projects, and build their professional network.

## 🚀 Features

### Authentication & User Management
- User registration and login with JWT authentication
- Secure cookie-based session management
- Profile creation and editing with image upload
- Protected routes for authenticated users

### Social Features
- **Posts**: Create, view, and interact with posts
- **Likes**: Like/unlike posts with real-time updates
- **Connections**: Follow/unfollow other developers
- **Messaging**: Real-time chat with Socket.IO
- **Search**: Search for posts, users, and topics
- **Feed Navigation**: View all posts, trending, or following feed

### Profile Management
- **Personal Information**: Name, profession, bio, contact details
- **Experience**: Add work experience with company and role details
- **Education**: Add educational background
- **Skills**: Tag relevant programming skills
- **Portfolio**: Showcase posts and projects

### Real-time Features
- **Live Messaging**: Socket.IO powered chat system
- **Unread Message Count**: Real-time notification badges
- **Message Status**: Track read/unread messages

## 🛠️ Tech Stack

### Frontend
- **React** (18.x) with Vite
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API calls
- **Socket.IO Client** for real-time features
- **React Hot Toast** for notifications
- **React Icons** for UI icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **JWT** for authentication
- **Socket.IO** for real-time messaging
- **Multer** for file uploads
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📁 Project Structure

```
DevConnector/
├── Frontend/
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── NavBar.jsx       # Navigation with search
│   │   │   ├── Post.jsx         # Post component with like/comment
│   │   │   ├── CreatePostForm.jsx # Post creation modal
│   │   │   ├── EditProfile.jsx  # Profile editing form
│   │   │   ├── People.jsx       # User card component
│   │   │   ├── CreatePost.jsx   # Post input trigger
│   │   │   ├── Trending.jsx     # Trending topics sidebar
│   │   │   ├── EducationSection.jsx
│   │   │   ├── ExperienceSection.jsx
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Home/            # Main feed page
│   │   │   ├── Profile/         # User profile pages
│   │   │   ├── Messages/        # Chat interface
│   │   │   ├── Signin/          # Authentication pages
│   │   │   └── NotFound/        # 404 page
│   │   ├── Context/             # React Context providers
│   │   │   ├── UserContext.jsx  # User state management
│   │   │   └── SocketContext.jsx # Socket.IO context
│   │   ├── hooks/               # Custom React hooks
│   │   │   ├── SignUp.js        # Signup logic
│   │   │   ├── UpdateDetailsHook.js # Profile update
│   │   │   └── Update.Timing.js # Time formatting
│   │   └── App.jsx              # Main app component
├── Backend/
│   ├── Controllers/             # Route handlers
│   │   ├── Authentication.js    # Auth operations
│   │   ├── messageController.js # Message operations
│   │   ├── uploadController.js  # Post operations
│   │   └── connectionController.js # User connections
│   ├── Routes/                  # API routes
│   │   ├── Authentication.js
│   │   ├── connectinRoute.js
│   │   └── ...
│   ├── model/                   # MongoDB schemas
│   │   ├── userModel.js         # User schema
│   │   ├── postModel.js         # Post schema
│   │   └── message.model.js     # Message schema
│   ├── middlewares/             # Custom middleware
│   │   ├── authenticateMiddleware.js
│   │   └── mutler.js            # File upload middleware
│   ├── DB/                      # Database connection
│   │   └── connect.js
│   ├── socket/                  # Socket.IO logic
│   ├── uploads/                 # File storage
│   └── app.js                   # Express app setup
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DevConnector
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install
   ```

   Create `.env` file:
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/devconnector
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

   Start backend server:
   ```bash
   npm start
   ```

3. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

   Create `.env` file:
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

   Start frontend development server:
   ```bash
   npm run dev
   ```

4. **Access the application**
   - Frontend: `https://dev-connector-seven.vercel.app/`
   - Backend API: `https://devconnector-7ny6.onrender.com`

## 📱 Usage Examples

### User Registration
```javascript
// POST /api/register
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "confirmpassword": "securepassword123"
}
```

### Creating a Post
```javascript
// POST /api/uploads/upload
FormData: {
  description: "Check out my new React project!",
  file: [image file]
}
```

### Sending a Message
```javascript
// Socket.IO event
socket.emit('sendMessage', {
  roomId: 'user1_user2',
  senderId: 'user1_id',
  recipientId: 'user2_id',
  text: 'Hello! How are you?'
});
```

### Liking a Post
```javascript
// GET /api/posts/like/:postId
// Toggles like status and returns updated post
```

### Updating Profile
```javascript
// POST /api/uploads/updateDetails
FormData: {
  inputdetails: JSON.stringify({
    fullname: "John Doe",
    profession: "Full Stack Developer",
    bio: "Passionate developer with 3+ years experience",
    email: "john@example.com",
    website: "https://johndoe.dev",
    github: "https://github.com/johndoe",
    address: "San Francisco, CA"
  }),
  skills: JSON.stringify(["React", "Node.js", "MongoDB"]),
  experience: JSON.stringify([{
    company: "Tech Corp",
    role: "Frontend Developer",
    startdate: "2021-01-01",
    enddate: "2023-12-31"
  }]),
  education: JSON.stringify([{
    nameofCollege: "University of Technology",
    class: "Computer Science",
    startdate: "2017-09-01",
    enddate: "2021-06-30"
  }]),
  file: [profile image file]
}
```

## 🔐 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/logout` - User logout
- `GET /api/profile` - Get current user profile

### Posts
- `GET /api/posts/allposts` - Get all posts
- `POST /api/uploads/upload` - Create new post
- `GET /api/posts/like/:postId` - Like/unlike post

### Messages
- `GET /api/messages/message/:roomId` - Get chat history
- `POST /api/messages/send` - Send message
- `GET /api/messages/unread-count` - Get unread message count
- `POST /api/messages/mark-as-read` - Mark messages as read

### Users
- `GET /api/people-you-know` - Get suggested connections
- `GET /api/users/:userId` - Get user details
- `POST /api/uploads/updateDetails` - Update user profile

## 🎨 UI Components

### Main Components
- **NavBar**: Global navigation with search functionality and unread message notifications
- **Post**: Individual post display with like/comment features
- **CreatePostForm**: Modal for creating new posts with image upload
- **EditProfile**: Comprehensive profile editing form with sections for experience, education, and skills
- **MessagingPage**: Real-time chat interface with message history
- **CreatePost**: Post creation trigger component
- **Trending**: Displays trending topics and hashtags
- **NotFound**: Custom 404 error page

### Key Features in UI
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Updates**: Live message notifications and post interactions
- **Image Upload**: Profile pictures and post images with preview
- **Search Functionality**: Filter posts and users in real-time
- **Modal Components**: Overlay forms for post creation and profile editing
- **Time Formatting**: Human-readable time stamps (e.g., "2 hours ago")

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/devconnector
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

**Frontend (.env)**
```env
VITE_BASE_URL=http://localhost:3000
```

### Database Models

**User Model** ([Backend/model/userModel.js](Backend/model/userModel.js))
```javascript
{
  fullname: String,
  email: String (unique),
  password: String (hashed),
  profilepic: String,
  profession: String,
  bio: String,
  followers: [ObjectId],
  following: [ObjectId],
  posts: [ObjectId],
  skills: [String],
  contact: {
    website: String,
    github: String,
    address: String
  },
  experience: [{
    company: String,
    role: String,
    startdate: Date,
    enddate: Date
  }],
  education: [{
    nameofCollege: String,
    class: String,
    startdate: Date,
    enddate: Date
  }]
}
```

**Post Model** ([Backend/model/postModel.js](Backend/model/postModel.js))
```javascript
{
  description: String,
  image: String,
  likes: [ObjectId],
  comments: [ObjectId],
  userId: ObjectId (ref: User)
}
```

**Message Model** ([Backend/model/message.model.js](Backend/model/message.model.js))
```javascript
{
  roomId: String,
  senderId: ObjectId (ref: User),
  senderName: String,
  recipientId: ObjectId (ref: User),
  text: String,
  isRead: Boolean,
  timestamp: Date
}
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Heroku/Railway)
```bash
# Set environment variables
# Deploy with Node.js buildpack
```

### Database (MongoDB Atlas)
```bash
# Create cluster and update MONGODB_URI
```

### Cookie Configuration for Production
For production deployment, update cookie settings in [Backend/Controllers/Authentication.js](Backend/Controllers/Authentication.js):

```javascript
res.cookie('token', token, {
  httpOnly: true,
  secure: true,        // HTTPS required
  sameSite: 'none',    // Cross-origin cookies
  maxAge: 24 * 60 * 60 * 1000 // 1 day
});
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add some feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🐛 Known Issues

- **Cookie Persistence**: For local development, ensure `sameSite: 'lax'` and `secure: false` in cookie settings
- **Image Upload**: File size limit is currently set to handle typical profile/post images
- **Real-time Features**: Requires stable WebSocket connection for optimal messaging experience
- **Search**: Search functionality requires minimum 3 characters for filtering

## 🔮 Future Enhancements

- [ ] Video post support
- [ ] Advanced search filters
- [ ] Email notifications
- [ ] Mobile app (React Native)
- [ ] Dark mode theme
- [ ] Advanced analytics
- [ ] Group chat functionality
- [ ] Post comments system
- [ ] User verification badges
- [ ] Hashtag functionality
- [ ] Story features
- [ ] Push notifications

## 📱 Key Features Walkthrough

### 1. User Authentication
- Secure registration with password confirmation
- JWT-based login with httpOnly cookies
- Automatic session management and user persistence
- Protected routes for authenticated content

### 2. Profile Management
- Comprehensive profile editing with [EditProfile.jsx](Frontend/src/components/EditProfile.jsx)
- Dynamic skill addition and removal
- Experience and education sections with date validation
- Profile picture upload with preview

### 3. Post Creation & Interaction
- Rich post creation with [CreatePostForm.jsx](Frontend/src/components/CreatePostForm.jsx)
- Image upload with instant preview
- Like/unlike functionality with real-time updates
- Post search and filtering

### 4. Real-time Messaging
- Socket.IO powered chat system
- Message persistence with read/unread status
- Real-time unread message notifications
- Chat room management

### 5. Responsive Design
- Mobile-first approach with Tailwind CSS
- Adaptive layouts for all screen sizes
- Touch-friendly interface elements
- Optimized performance across devices

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check existing documentation
- Review the codebase for implementation details

---

**Built with ❤️ by the DevConnector team**

*DevConnector - Connecting developers, one post at a time.*
