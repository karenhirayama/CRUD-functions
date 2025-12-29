# CodeLeap Network - CRUD Application

A modern React application built with TypeScript, Vite, Firebase, TanStack React Query, and Tailwind CSS v4.

🌐 **Live Demo**: https://codeleap-crud-front-challenge.web.app

## Features

- ✨ Full CRUD operations (Create, Read, Update, Delete)
- 🔥 Firebase integration (Firestore + Authentication)
- 🔐 Anonymous authentication with username
- ❤️ Like system with optimistic UI updates
- 🔄 Post sorting (newest, oldest, most liked)
- 📱 Fully responsive mobile design
- 🎨 Modern UI with Tailwind CSS v4
- ⚡ Fast performance with React Query caching
- 🏗️ Clean architecture with custom hooks
- 🚀 CI/CD with GitHub Actions
- 📊 Real-time data with Firestore

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Firebase** - Backend (Firestore, Auth, Hosting, Analytics)
- **TanStack React Query** - Server state management
- **Tailwind CSS v4** - Styling (with Vite plugin)

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CreatePostForm.tsx
│   ├── DeleteModal.tsx
│   ├── EditModal.tsx
│   ├── FilterPosts.tsx
│   ├── PostItem.tsx
│   ├── Posts.tsx
│   └── Signup.tsx
├── config/             # Configuration files
│   └── firebase.ts     # Firebase initialization
├── contexts/           # React Context providers
│   └── PostsContext.tsx
├── helpers/            # Helper functions
│   └── timeFormat.ts
├── hooks/              # Custom React hooks
│   ├── useCreatePostForm.ts
│   ├── useEditModal.ts
│   ├── useFilterPosts.ts
│   ├── useLocalStorage.ts
│   └── useSignup.ts
├── pages/              # Page components
│   ├── MainPage.tsx
│   └── SigninPage.tsx
├── service/            # Service layer
│   ├── api.ts          # Legacy API (deprecated)
│   ├── auth/
│   │   └── authService.ts    # Firebase Auth service
│   └── posts/
│       ├── firestore.ts      # Firestore operations
│       └── services.ts       # React Query hooks
├── types.ts            # TypeScript type definitions
├── vite-env.d.ts       # Environment variable types
└── App.tsx             # Root component

.github/
└── workflows/
    ├── eslint.yml      # Lint on push/PR
    └── deploy.yml      # Auto-deploy to Firebase

Configuration files:
├── .env                # Environment variables (gitignored)
├── .env.example        # Environment template
├── firebase.json       # Firebase configuration
├── .firebaserc         # Firebase project reference
├── firestore.rules     # Database security rules
└── firestore.indexes.json  # Database indexes
```

## Getting Started

### Prerequisites

- Node.js 20+ and npm
- Firebase account ([console.firebase.google.com](https://console.firebase.google.com))
- Firebase CLI: `npm install -g firebase-tools`

### Installation

1. Clone the repository
```bash
git clone <your-repo-url>
cd CRUD-functions
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Firebase credentials
# Get these from Firebase Console → Project Settings → General
```

4. Configure Firebase
```bash
# Login to Firebase
firebase login

# Initialize Firebase (if not already done)
firebase init
```

### Firebase Setup

1. **Create Firestore Database**
   - Go to Firebase Console → Firestore Database
   - Click "Create Database"
   - Select "Production mode"
   - Choose a region

2. **Enable Authentication**
   - Go to Firebase Console → Authentication
   - Click "Get Started"
   - Enable "Anonymous" sign-in method

3. **Deploy Firestore Rules**
```bash
firebase deploy --only firestore
```

### Development

```bash
npm run dev
```

The app will run on `http://localhost:5173`

### Build

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
# Build and deploy
npm run build
firebase deploy

# Or deploy only hosting
firebase deploy --only hosting
```

### Lint

```bash
npm run lint
```

## Architecture Highlights

### Firebase Integration
- **Firestore** - NoSQL cloud database for storing posts
- **Authentication** - Anonymous auth with username display names
- **Hosting** - Static site hosting with CDN
- **Analytics** - User behavior tracking

### Service Layer
- `firestoreService` - CRUD operations for posts
- `authService` - Authentication methods
- Auto-generated React Query hooks (`useGetPostsQuery`, `useCreatePostMutation`, etc.)

### State Management
- **PostsContext** - Global posts state and operations
- **React Query** - Server state caching and synchronization
- **Firebase Auth State** - Persistent authentication across sessions
- **Local State** - Optimistic UI updates for likes

### Custom Hooks
- `usePostsContext` - Access posts context safely
- `useFilterPosts` - Handle sorting/filtering logic with memoization

### CI/CD Pipeline
- **ESLint Workflow** - Runs on push/PR to enforce code quality
- **Deploy Workflow** - Auto-deploys to Firebase Hosting on push to main
- **Environment Variables** - Securely managed via GitHub Secrets

## Environment Variables

Required environment variables (add to `.env`):

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Security

- `.env` files are git-ignored
- Firestore security rules prevent unauthorized access
- Anonymous auth ensures user privacy
- GitHub Secrets protect credentials in CI/CD

## Color Scheme

- Primary: `#7695EC` (Blue)
- Danger: `#FF5151` (Red)
- Success: `#47B960` (Green)

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT

---

Made with ❤️ using React, TypeScript, and Firebase
