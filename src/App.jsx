import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CoursesPage from './CoursesPage';
import CourseDetailsPage from './CourseDetailsPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/courses" replace />} />
                <Route path="/courses" element={<CoursesPage />} />
                <Route path="/course/:courseId" element={<CourseDetailsPage />} />
            </Routes>
        </Router>
    );
}

export default App;