# Portfolio Website

A modern, responsive portfolio website built with Next.js, React, TypeScript, and Tailwind CSS. Features a complete full-stack setup with database integration using Prisma and SQLite.

## 🚀 Features

- **Modern Design**: Beautiful gradient backgrounds and smooth animations
- **Responsive**: Fully responsive design that works on all devices
- **Full-Stack**: Complete backend with API routes and database
- **Contact Form**: Functional contact form with database storage
- **Project Showcase**: Dynamic project display with filtering
- **Blog Ready**: Blog system ready for content management
- **SEO Optimized**: Built with Next.js for optimal performance
- **Dark/Light Theme**: Support for different themes
- **Admin Dashboard**: Access to manage projects and blog posts
- **Authentication System**: Secure login and user management
- **Dynamic Content Management**: Easy to add and update projects and blog posts

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄️ Database Setup

The project uses SQLite for local development. The database file will be created automatically at `prisma/dev.db`.

### Database Schema

- **User**: Profile information and social links
- **Project**: Portfolio projects with technologies and links
- **Blog**: Blog posts with content and publishing status
- **Contact**: Contact form submissions

### Adding Sample Data

You can add sample data by creating a seed script or manually inserting data through the API endpoints.

## 📁 Project Structure

```
src/
├── app/
│   ├── api/
│   │   ├── projects/
│   │   ├── blogs/
│   │   └── contact/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── lib/
    └── db.ts
```

## 🎨 Customization

### Personal Information

Update the following files with your information:

1. **Hero Section** (`src/components/Hero.tsx`)
   - Change "Your Name" to your actual name
   - Update the description

2. **About Section** (`src/components/About.tsx`)
   - Update skills and their proficiency levels
   - Modify the about text

3. **Contact Section** (`src/components/Contact.tsx`)
   - Update email addresses
   - Change social media links

4. **Footer** (`src/components/Footer.tsx`)
   - Update social media links
   - Change copyright information

### Styling

The project uses Tailwind CSS for styling. You can customize:

- Colors in `tailwind.config.ts`
- Animations and keyframes
- Component-specific styles

### Database

To add your projects:

1. Use the API endpoint: `POST /api/projects`
2. Or manually insert into the database using Prisma Studio:
   ```bash
   npx prisma studio
   ```

## 🚀 Deployment

### Prerequisites

1. A Vercel account
2. A PostgreSQL database (e.g., from Supabase, Railway, or Vercel Postgres)
3. Git installed on your machine

### Steps to Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `NEXTAUTH_URL`: Your production URL (e.g., https://your-domain.vercel.app)
     - `NEXTAUTH_SECRET`: A secure random string for session encryption

3. **Database Setup**
   - Run Prisma migrations on your production database:
     ```bash
     npx prisma migrate deploy
     ```

4. **Verify Deployment**
   - Check all routes are working
   - Test authentication
   - Verify admin functionality
   - Test contact form

## 📝 API Endpoints

- `GET /api/projects` - Fetch all projects
- `POST /api/projects` - Create a new project
- `GET /api/blogs` - Fetch published blog posts
- `POST /api/blogs` - Create a new blog post
- `POST /api/contact` - Submit contact form

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Database Commands

- `npx prisma generate` - Generate Prisma client
- `npx prisma db push` - Push schema to database
- `npx prisma studio` - Open database GUI
- `npx prisma migrate dev` - Create and apply migrations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/portfolio/issues) page
2. Create a new issue with detailed information
3. Contact me through the portfolio contact form

---

Built with ❤️ using Next.js and Tailwind CSS

## Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXTAUTH_URL`: Your application URL
- `NEXTAUTH_SECRET`: Secret key for session encryption
