import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 xl:bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-4">
            About NoteNest
          </h1>
          <p className="text-xl text-gray-700 dark:text-gray-300">
            Your ultimate resource for academic excellence
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            At StudyNotes, we believe that quality study resources should be accessible to everyone.
            Our platform was created to help students excel in their academic journey by providing
            comprehensive notes, homework solutions, and previous year question papers.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Whether you&apos;re cramming for finals or looking to deepen your understanding of course materials,
            we&apos;ve got you covered with high-quality, peer-reviewed content.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-indigo-500 dark:text-indigo-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Comprehensive Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Detailed lecture notes organized by subject, topic, and difficulty level.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-indigo-500 dark:text-indigo-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Homework Solutions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Step-by-step solutions to common homework problems with clear explanations.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="text-indigo-500 dark:text-indigo-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
              Previous Year Questions
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Archive of past exam questions with answer strategies to help you prepare effectively.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-300 mb-4">
            Our Story
          </h2>
          <p className="text-gray-700 dark:text-gray-200 mb-4">
            StudyNotes began as a small project by a group of university students who wanted to create
            a better way to share and access quality study materials. What started as shared Google Docs
            quickly evolved into a comprehensive platform serving thousands of students across multiple institutions.
          </p>
          <p className="text-gray-700 dark:text-gray-200">
            Today, we&apos;re proud to offer a growing library of resources contributed by both students and educators,
            all vetted for accuracy and educational value. Our community-driven approach ensures that our content
            remains relevant, up-to-date, and aligned with current curriculam.
          </p>
        </div>

        <div className="bg-indigo-600 dark:bg-indigo-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Join Our Community
          </h2>
          <p className="text-indigo-100 mb-6">
            Ready to elevate your academic performance? Create an account today to access all our resources,
            bookmark your favorite notes, and contribute to our growing knowledge base.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link href="/signup" className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-md font-medium">
              Sign Up Now
            </Link>
            <Link href="/contact" className="bg-indigo-700 text-white hover:bg-indigo-800 px-6 py-3 rounded-md font-medium">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

