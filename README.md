# AI Resume Maker

A full-stack AI-powered resume builder application built with the MERN stack and Google Gemini API.

## Features

- 🤖 **AI-Powered Content Generation**: Generate professional summaries, improve job descriptions, and get smart skill suggestions
- 📄 **Multiple Templates**: Choose from modern, classic, creative, and minimal resume designs
- 👁️ **Live Preview**: See your resume update in real-time as you make changes
- 📥 **PDF Export**: Download your resume as a professional PDF with one click
- 🎯 **ATS Optimization**: Get tips to make your resume pass Applicant Tracking Systems
- 💾 **Save & Manage**: Create multiple resumes and manage them all in one place
- 🔐 **Secure Authentication**: JWT-based authentication system
- 🎨 **Modern UI**: Beautiful, responsive design with smooth animations

## Tech Stack

### Backend
- Node.js & Express
- MongoDB & Mongoose
- Google Gemini AI API
- JWT Authentication
- PDFKit for PDF generation

### Frontend
- React 18
- React Router v7
- Axios for API calls
- Context API for state management
- Modern CSS with custom design system

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Google Gemini API Key ([Get it here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   cd "ai reusme"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   ```

3. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the following variables:
     ```
     MONGODB_URI=your_mongodb_connection_string
     JWT_SECRET=your_secret_key
     GEMINI_API_KEY=your_gemini_api_key
     ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the Application

1. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

2. **Start Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server will run on `http://localhost:5000`

3. **Start Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Application will run on `http://localhost:5173`

4. **Open your browser** and navigate to `http://localhost:5173`

## Project Structure

```
ai-resume/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route controllers
│   ├── models/          # Mongoose models
│   ├── routes/          # API routes
│   ├── services/        # Business logic (AI, PDF)
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Express server
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   ├── context/     # Context providers
│   │   ├── styles/      # CSS files
│   │   ├── App.jsx      # Main app component
│   │   └── main.jsx     # Entry point
│   └── index.html
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Resumes
- `GET /api/resumes` - Get all user resumes
- `GET /api/resumes/:id` - Get single resume
- `POST /api/resumes` - Create new resume
- `PUT /api/resumes/:id` - Update resume
- `DELETE /api/resumes/:id` - Delete resume

### AI Features
- `POST /api/ai/generate-summary` - Generate professional summary
- `POST /api/ai/improve-description` - Improve job description
- `POST /api/ai/suggest-skills` - Get skill suggestions
- `POST /api/ai/generate-project-description` - Generate project description
- `POST /api/ai/optimize-ats` - Get ATS optimization tips
- `GET /api/ai/generate-pdf/:id` - Generate PDF

## Usage

1. **Register/Login**: Create an account or sign in
2. **Create Resume**: Click "Create New Resume" on the dashboard
3. **Fill Sections**: Add your personal info, experience, education, skills, and projects
4. **Use AI Features**: Click AI buttons to generate or improve content
5. **Preview**: See live preview of your resume
6. **Download**: Export your resume as PDF

## AI Features

- **Generate Summary**: AI creates a professional summary based on your experience
- **Improve Descriptions**: Enhance job descriptions with action verbs and impact
- **Suggest Skills**: Get relevant skill recommendations for your role
- **Project Descriptions**: Generate compelling project descriptions
- **ATS Optimization**: Receive tips to improve ATS compatibility

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- Google Gemini AI for powering the AI features
- React team for the amazing framework
- MongoDB for the database solution

## Support

For support, email your-email@example.com or open an issue in the repository.
