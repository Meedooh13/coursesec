import React, { useState } from "react";
import "./CoursesPage.css";

import cover1 from "./assets/Ai.jpg";
import cover2 from "./assets/Ai.jpg";
import cover3 from "./assets/Ai.jpg";
import cover4 from "./assets/Ai.jpg";
import cover5 from "./assets/Ai.jpg";
import cover6 from "./assets/Ai.jpg";
import cover7 from "./assets/Ai.jpg";
import cover8 from "./assets/Ai.jpg";

const initialCourses = [
    {
        id: 1,
        code: "MA112",
        title: "Discrete Math",
        instructor: "Dr. Mostafa",
        students: 45678,
        enrollment: 842,
        image: cover1,
        category: "Math",
        description: "Master Discrete Math from basics to advanced concepts",
    },
    {
        id: 2,
        code: "IT222",
        title: "Computer Networks",
        instructor: "Dr. Khaled",
        students: 98234,
        enrollment: 1150,
        image: cover2,
        category: "Networking",
        description: "Learn networks from scratch with real-world projects",
    },
    {
        id: 3,
        code: "IT301",
        title: "Computer Security",
        instructor: "Dr. Salma",
        students: 34567,
        enrollment: 763,
        image: cover3,
        category: "cybersecurity",
        description: "Learn how to secure your websites and applications",
    },
    {
        id: 4,
        code: "CS102",
        title: "Introduction Web Development",
        instructor: "Dr. Osama",
        students: 23456,
        enrollment: 920,
        image: cover4,
        category: "Web Development",
        description: "Learn design principles and website building",
    },
    {
        id: 5,
        code: "IS202",
        title: "Data Science",
        instructor: "Dr. Mariam",
        students: 56789,
        enrollment: 1050,
        image: cover5,
        category: "Data Science",
        description: "Master Python, NumPy, Pandas, Matplotlib, and machine learning basics",
    },
    {
        id: 6,
        code: "MA103",
        title: "Linear Algebra",
        instructor: "Dr. Ahmed",
        students: 41234,
        enrollment: 678,
        image: cover6,
        category: "Math",
        description: "Master Linear Algebra from basics",
    },
    {
        id: 7,
        code: "AI204",
        title: "Artificial Intelligence",
        instructor: "Dr. Mayar",
        students: 38901,
        enrollment: 1123,
        image: cover7,
        category: "Data Science",
        description: "Introduction to AI concepts and applications",
    },
    {
        id: 8,
        code: "AI330",
        title: "Machine Learning",
        instructor: "Dr. Anna",
        students: 87654,
        enrollment: 599,
        image: cover8,
        category: "Data Science",
        description: "Complete ML course covering supervised and unsupervised learning algorithms",
    },
];

const initialCategories = [
    "Web Development",
    "Math",
    "Networking",
    "Data Science",
    "cybersecurity",
];

export default function Courses() {
    const [courses, setCourses] = useState(initialCourses);
    const [categories, setCategories] = useState(initialCategories);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form, setForm] = useState({
        code: "",
        title: "",
        instructor: "",
        category: "",
        description: "",
        enrollment: "",
        imageUrl: "",
        imageFile: null,
    });

    const capitalizeWords = (str) => {
        if (!str) return "";
        return str
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(' ');
    };

    const filteredCourses = courses.filter((course) => {
        const matchesCategory =
            selectedCategory === "All" || course.category === selectedCategory;
        const q = searchTerm.trim().toLowerCase();
        const matchesSearch =
            !q ||
            course.title.toLowerCase().includes(q) ||
            course.instructor.toLowerCase().includes(q) ||
            course.description.toLowerCase().includes(q) ||
            (course.code && course.code.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
    });

    const fileToDataUrl = (file) =>
        new Promise((resolve, reject) => {
            if (!file) return resolve(null);
            const reader = new FileReader();
            reader.onerror = () => reject(new Error("Failed to read file"));
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
        });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setForm((f) => ({ ...f, imageFile: file }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.code || !form.title || !form.instructor) {
            alert("Please fill in course code, title and instructor.");
            return;
        }

        let image = cover1;
        if (form.imageFile) {
            try {
                const dataUrl = await fileToDataUrl(form.imageFile);
                image = dataUrl;
            } catch (err) {
                console.error("file read error", err);
            }
        } else if (form.imageUrl) {
            image = form.imageUrl;
        }

        let enrollment = parseInt(form.enrollment, 10);
        if (!Number.isFinite(enrollment) || enrollment <= 0) {
            enrollment = Math.floor(500 + Math.random() * (1200 - 500 + 1));
        }

        const courseCategory = form.category || "Uncategorized";

        if (courseCategory && !categories.includes(courseCategory)) {
            setCategories((prev) => [...prev, courseCategory]);
        }

        const maxId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) : 0;

        const newCourse = {
            id: maxId + 1,
            code: form.code.toUpperCase(),
            title: capitalizeWords(form.title),
            instructor: capitalizeWords(form.instructor),
            students: 0,
            enrollment,
            image,
            category: courseCategory,
            description: form.description ? form.description.charAt(0).toUpperCase() + form.description.slice(1) : "",
        };

        setCourses((prev) => [newCourse, ...prev]);

        setForm({
            code: "",
            title: "",
            instructor: "",
            category: "",
            description: "",
            enrollment: "",
            imageUrl: "",
            imageFile: null,
        });
        setShowModal(false);
    };

    const closeModal = () => {
        setShowModal(false);
        setForm({
            code: "",
            title: "",
            instructor: "",
            category: "",
            description: "",
            enrollment: "",
            imageUrl: "",
            imageFile: null,
        });
    };

    const handleViewDetails = (courseId) => {
        console.log("View details for course:", courseId);
    };

    const handleDeleteCourse = (courseId, courseTitle) => {
        if (window.confirm(`Are you sure you want to delete "${courseTitle}"?`)) {
            setCourses((prev) => prev.filter((course) => course.id !== courseId));
        }
    };

    return (
        <div className='courses-page'>
            <div className='hero-section'>
                <div className='hero-content'>
                    <h1>Learn Without Limits</h1>
                    <p>
                        Start, switch, or advance your career with university-level courses
                        taught by our faculty
                    </p>
                    <div className='search-bar'>
                        <input
                            type='text'
                            placeholder='Search for courses, codes or doctors'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className='search-btn' aria-label='Search'>
                            <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                                <path
                                    d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
                                    stroke='white'
                                    strokeWidth='2'
                                    strokeLinecap='round'
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className='container course_container'>
                <div className='category-filter d-flex align-items-center justify-content-center'>
                    <button
                        className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
                        onClick={() => setSelectedCategory("All")}>
                        All
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`category-btn ${
                                selectedCategory === category ? "active" : ""
                            }`}
                            onClick={() => setSelectedCategory(category)}>
                            {category}
                        </button>
                    ))}
                </div>

                <div className='add-course-btn-container'>
                    <button className='add-course-btn' onClick={() => setShowModal(true)}>
                        <svg width='20' height='20' viewBox='0 0 24 24' fill='none' style={{ marginRight: '8px' }}>
                            <path d='M12 5V19M5 12H19' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                        </svg>
                        Add New Course
                    </button>
                </div>

                <div className='results-header'>
                    <h2>{selectedCategory} Courses</h2>
                    <p>
                        {filteredCourses.length}{" "}
                        {filteredCourses.length === 1 ? "course" : "courses"}
                    </p>
                </div>

                <div className='courses-grid'>
                    {filteredCourses.map((course) => (
                        <div key={course.id} className='course-card'>
                            <div className='course-image'>
                                <img src={course.image} alt={course.title} />
                                <button
                                    className='delete-course-btn'
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteCourse(course.id, course.title);
                                    }}
                                    aria-label='Delete course'
                                    title='Delete course'
                                >
                                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none'>
                                        <path d='M3 6H5H21' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                                        <path d='M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'/>
                                    </svg>
                                </button>
                            </div>

                            <div className='course-content'>
                                <div className='title-row'>
                                    <h3>{course.title}</h3>
                                    <span className='course-code'>{course.code}</span>
                                </div>

                                <p className='course-description'>{course.description}</p>
                                <p className='instructor'>Instructor: {course.instructor}</p>

                                <div className='course-meta'>
                                    <span className='enrollment'>
                                        Enrollment: {course.enrollment.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    className='view-details-btn'
                                    onClick={() => handleViewDetails(course.id)}
                                >
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className='no-results'>
                        <h3>No courses found</h3>
                        <p>Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            {showModal && (
                <div className='modal-overlay' onClick={closeModal}>
                    <div className='modal-content' onClick={(e) => e.stopPropagation()}>
                        <div className='modal-header'>
                            <h2>Add New Course</h2>
                            <button className='modal-close' onClick={closeModal}>
                                <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                    <path d='M18 6L6 18M6 6L18 18' stroke='currentColor' strokeWidth='2' strokeLinecap='round'/>
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className='modal-form'>
                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='code'>Course Code *</label>
                                    <input
                                        id='code'
                                        name='code'
                                        value={form.code}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='title'>Course Title *</label>
                                    <input
                                        id='title'
                                        name='title'
                                        value={form.title}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='instructor'>Instructor Name *</label>
                                    <input
                                        id='instructor'
                                        name='instructor'
                                        value={form.instructor}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='category'>Category</label>
                                    <input
                                        id='category'
                                        name='category'
                                        value={form.category}
                                        onChange={handleInputChange}
                                        list='category-suggestions'
                                    />
                                    <datalist id='category-suggestions'>
                                        {categories.map((cat) => (
                                            <option key={cat} value={cat} />
                                        ))}
                                    </datalist>
                                </div>
                            </div>

                            <div className='form-row'>
                                <div className='form-group'>
                                    <label htmlFor='enrollment'>Enrollment</label>
                                    <input
                                        id='enrollment'
                                        name='enrollment'
                                        type='number'
                                        value={form.enrollment}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='imageFile'>Course Image</label>
                                    <input
                                        id='imageFile'
                                        type='file'
                                        accept='image/*'
                                        onChange={handleFileChange}
                                    />
                                </div>
                            </div>

                            <div className='form-group'>
                                <label htmlFor='imageUrl'>Or Image URL</label>
                                <input
                                    id='imageUrl'
                                    name='imageUrl'
                                    value={form.imageUrl}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='description'>Description</label>
                                <textarea
                                    id='description'
                                    name='description'
                                    value={form.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                />
                            </div>

                            <div className='modal-actions'>
                                <button type='button' className='btn-cancel' onClick={closeModal}>
                                    Cancel
                                </button>
                                <button type='submit' className='btn-submit'>
                                    Create Course
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
