import { useState } from 'react'
import './index.css';
import './styles.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Api from './Api';

function App() {
  return (
    <div class="container min-w-full">
    <header>
        <div class="logo">
            <h1>StudyNotes</h1>
        </div>
        <nav>
            <ul class="nav-menu">
                <li><a href="#" class="active">Home</a></li>
                <li><a href="#">Subjects</a></li>
                <li><a href="#">Past Papers</a></li>
                <li><a href="#">Resources</a></li>
                <li><a href="#">About</a></li>
            </ul>
        </nav>
        <div class="nav-actions">
            <div class="search-bar">
                <input type="text" placeholder="Search for notes, subjects..."/>
                <button><i class="fas fa-search"></i></button>
            </div>
            <div class="user-actions">
                <a href="#" class="btn btn-secondary">Sign Up</a>
                <a href="#" class="btn btn-primary">Login</a>
            </div>
        </div>
        <div class="mobile-toggle">
            <i class="fas fa-bars"></i>
        </div>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h2>Ace Your Exams With Quality Study Materials</h2>
            <p>Find comprehensive notes, past year questions, and study resources for all subjects.</p>
            <div class="hero-buttons">
                <a href="#" class="btn btn-primary">Browse Subjects</a>
                <a href="#" class="btn btn-secondary">View Past Papers</a>
            </div>
        </div>
        <div class="hero-image">
            <img src="hero.webp" alt="Students studying"/>
        </div>
    </section>

    <section class="subjects">
        <div class="section-header">
            <h2>Popular Subjects</h2>
            <a href="#" class="view-all">View All Subjects <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="subject-cards">
            <div class="subject-card">
                <div class="subject-icon">
                    <i class="fas fa-calculator"></i>
                </div>
                <h3>Mathematics</h3>
                <p>Calculus, Algebra, Statistics and more</p>
                <span class="note-count">240 Notes</span>
                <a href="#" class="card-link">Explore <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="subject-card">
                <div class="subject-icon">
                    <i class="fas fa-flask"></i>
                </div>
                <h3>Physics</h3>
                <p>Mechanics, Electromagnetism, Thermodynamics</p>
                <span class="note-count">185 Notes</span>
                <a href="#" class="card-link">Explore <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="subject-card">
                <div class="subject-icon">
                    <i class="fas fa-dna"></i>
                </div>
                <h3>Biology</h3>
                <p>Cell Biology, Genetics, Human Anatomy</p>
                <span class="note-count">210 Notes</span>
                <a href="#" class="card-link">Explore <i class="fas fa-arrow-right"></i></a>
            </div>
            <div class="subject-card">
                <div class="subject-icon">
                    <i class="fas fa-atom"></i>
                </div>
                <h3>Chemistry</h3>
                <p>Organic Chemistry, Inorganic Chemistry</p>
                <span class="note-count">195 Notes</span>
                <a href="#" class="card-link">Explore <i class="fas fa-arrow-right"></i></a>
            </div>
        </div>
    </section>

    <section class="past-papers">
        <div class="section-header">
            <h2>Past Year Questions</h2>
            <a href="#" class="view-all">View All Papers <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="paper-filters">
            <select>
                <option>Select Subject</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
            </select>
            <select>
                <option>Select Year</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
                <option>2021</option>
            </select>
            <select>
                <option>Select Exam</option>
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
            </select>
            <button class="btn btn-primary">Apply Filters</button>
        </div>
        <div class="papers-list">
            <div class="paper-item">
                <div class="paper-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="paper-details">
                    <h3>Mathematics Final Exam 2023</h3>
                    <div class="paper-meta">
                        <span><i class="fas fa-download"></i> 2.4k Downloads</span>
                        <span><i class="fas fa-star"></i> 4.8/5</span>
                    </div>
                </div>
                <a href="#" class="btn btn-secondary">Download</a>
            </div>
            <div class="paper-item">
                <div class="paper-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="paper-details">
                    <h3>Physics Midterm 2023</h3>
                    <div class="paper-meta">
                        <span><i class="fas fa-download"></i> 1.8k Downloads</span>
                        <span><i class="fas fa-star"></i> 4.6/5</span>
                    </div>
                </div>
                <a href="#" class="btn btn-secondary">Download</a>
            </div>
            <div class="paper-item">
                <div class="paper-icon">
                    <i class="fas fa-file-pdf"></i>
                </div>
                <div class="paper-details">
                    <h3>Biology Final Exam 2023</h3>
                    <div class="paper-meta">
                        <span><i class="fas fa-download"></i> 2.1k Downloads</span>
                        <span><i class="fas fa-star"></i> 4.7/5</span>
                    </div>
                </div>
                <a href="#" class="btn btn-secondary">Download</a>
            </div>
        </div>
    </section>

    <section class="features">
        <div class="section-header">
            <h2>Why Choose StudyNotes</h2>
        </div>
        <div class="feature-cards">
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <h3>Verified Content</h3>
                <p>All notes and papers are verified by subject experts for accuracy.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-bolt"></i>
                </div>
                <h3>Easy Access</h3>
                <p>Download or view notes instantly without any hassle.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-users"></i>
                </div>
                <h3>Community Contributions</h3>
                <p>Notes shared by top students and verified professors.</p>
            </div>
            <div class="feature-card">
                <div class="feature-icon">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <h3>Mobile Friendly</h3>
                <p>Access your study materials on any device, anywhere.</p>
            </div>
        </div>
    </section>

    <section class="testimonials">
        <div class="section-header">
            <h2>What Students Say</h2>
        </div>
        <div class="testimonial-cards">
            <div class="testimonial-card">
                <div class="testimonial-profile">
                    <img src="testimonials-3.jpg" alt="Student"/>
                    <div>
                        <h4>Alex Johnson</h4>
                        <p>Engineering Student</p>
                    </div>
                </div>
                <p class="testimonial-text">"StudyNotes helped me ace my calculus exam. The notes were comprehensive and easy to understand."</p>
                <div class="testimonial-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
            <div class="testimonial-card">
                <div class="testimonial-profile">
                    <img src="testimonials-5.jpg" alt="Student"/>
                    <div>
                        <h4>Sarah Miller</h4>
                        <p>Medicine Student</p>
                    </div>
                </div>
                <p class="testimonial-text">"The biology past papers helped me understand the exam pattern. I wouldn't have scored an A without StudyNotes!"</p>
                <div class="testimonial-rating">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
            </div>
        </div>
    </section>

    <section class="newsletter">
        <div class="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter to get notifications about new notes and past papers.</p>
            <div class="newsletter-form">
                <input type="email" placeholder="Enter your email"/>
                <button class="btn btn-primary">Subscribe</button>
            </div>
        </div>
    </section>

    <footer>
        <div class="footer-content">
            <div class="footer-section">
                <h3>StudyNotes</h3>
                <p>Your one-stop destination for quality study materials, notes, and past year questions.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin"></i></a>
                </div>
            </div>
            <div class="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Subjects</a></li>
                    <li><a href="#">Past Papers</a></li>
                    <li><a href="#">About Us</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Popular Subjects</h3>
                <ul>
                    <li><a href="#">Mathematics</a></li>
                    <li><a href="#">Physics</a></li>
                    <li><a href="#">Chemistry</a></li>
                    <li><a href="#">Biology</a></li>
                    <li><a href="#">Computer Science</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h3>Contact Us</h3>
                <ul class="contact-info">
                    <li><i class="fas fa-envelope"></i> support@studynotes.com</li>
                    <li><i class="fas fa-phone"></i> +1 (555) 123-4567</li>
                    <li><i class="fas fa-map-marker-alt"></i> 123 Education St, Academic City</li>
                </ul>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 StudyNotes. All rights reserved.</p>
        </div>
    </footer>
   
</div>
  );
}

export default App;
