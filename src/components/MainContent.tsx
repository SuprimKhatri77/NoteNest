
import heroImg from '../../public/hero.avif'
import Image from 'next/image';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFlask,
  faDna,
  faAtom,
  faCheckCircle,
  faBolt,
  faUsers,
  faMobileAlt,

  faArrowRight,

} from "@fortawesome/free-solid-svg-icons";

import TestimonialCard from "./TestimonialCards";
import FeatureCard from "./FeaturedCards";
import SubjectCard from "./SubjectCard";
import PastPaperItems from './PastPaperItems'

function MainContent() {
  return (
    <>
    <section className="flex flex-col md:flex-row items-center py-10 px-3 md:px-10 mt-5 bg-white dark:bg-gray-800 mx-3 mb-8 rounded-2xl  md:mt-28 shadow relative  justify-center overflow-x-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-400 opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/2"></div>
            
            <div className="flex-1 pr-0 md:pr-16 relative z-10 mb-10 md:mb-0 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-800 leading-tight dark:text-gray-100">Ace Your Exams With Quality Study Materials</h2>
              <p className="text-sm md:text-lg text-gray-700 mb-9 max-w-lg mx-auto md:mx-0 dark:text-gray-300">Find comprehensive notes, past year questions, and study resources for all subjects.</p>
              <div className="flex gap-5 justify-center md:justify-start">
                <a href="#" className="py-3 px-5 text-xs md:text-[1rem] md:py-3 md:px-6 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 hover:translate-y-[-2px] transition-all hover:shadow">Browse Subjects</a>
                <a href="#" className="py-3 px-5 text-xs md:text-[1rem] md:py-3 md:px-6 border-2 border-indigo-600 text-indigo-600 rounded-lg font-semibold hover:bg-indigo-400 hover:text-white hover:translate-y-[-2px] transition-all hover:shadow dark:text-gray-300">View Past Papers</a>
              </div>
            </div>
            
            <div className="flex-1 text-center relative z-10">
              <Image src={heroImg} alt="Students studying" className="max-w-full rounded-xl shadow-lg transition-transform hover:scale-[1.02] hidden md:block" />
            </div>
          </section>
    
          {/* Popular Subjects Section */}
          <section className="my-16">
            <div className="flex justify-between items-center mb-9 px-3">
              <h2 className=" text-lg md:text-2xl font-semibold text-gray-800 relative after:absolute after:bottom-[-10px] after:left-0 after:w-[60px] after:h-1 after:bg-indigo-600 after:rounded-md dark:text-gray-100">Popular Subjects</h2>
              <a href="#" className="text-sm md:text-[1rem] text-indigo-600 font-medium flex items-center py-2 px-4 rounded-lg hover:bg-indigo-400 hover:text-white transition-all">
                View All Subjects <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mx-3">
              <SubjectCard 
                icon={faCalculator} 
                title="Mathematics" 
                description="Calculus, Algebra, Statistics and more" 
                noteCount="240 Notes" 
              />
              <SubjectCard 
                icon={faFlask} 
                title="Physics" 
                description="Mechanics, Electromagnetism, Thermodynamics" 
                noteCount="185 Notes" 
              />
              <SubjectCard 
                icon={faDna} 
                title="Biology" 
                description="Cell Biology, Genetics, Human Anatomy" 
                noteCount="210 Notes" 
              />
              <SubjectCard 
                icon={faAtom} 
                title="Chemistry" 
                description="Organic Chemistry, Inorganic Chemistry" 
                noteCount="195 Notes" 
              />
            </div>
          </section>
    
          {/* Past Papers Section */}
          <section className="bg-white rounded-2xl py-5 px-2 md:p-10 shadow border border-gray-200 mx-3 my-16 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-[16px] md:text-2xl font-semibold text-gray-800 relative after:absolute after:bottom-[-10px] after:left-0 after:w-[60px] after:h-1 after:bg-indigo-600 after:rounded-md dark:text-gray-100">Past Year Questions</h2>
              <a href="#" className="text-xs md:text-[1rem] text-indigo-600 font-medium flex items-center py-2 px-4 rounded-lg hover:bg-indigo-400 hover:text-white transition-all">
                View All Papers <FontAwesomeIcon icon={faArrowRight} className="ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <select className="py-3 px-5 border border-gray-200 rounded-lg bg-white min-w-[180px] font-['Poppins'] text-sm transition-all cursor-pointer text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100
              dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                <option>Select Subject</option>
                <option>Mathematics</option>
                <option>Physics</option>
                <option>Chemistry</option>
                <option>Biology</option>
              </select>
              <select className="py-3 px-5 border border-gray-200 rounded-lg bg-white min-w-[180px] font-['Poppins'] text-sm transition-all cursor-pointer text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                <option>Select Year</option>
                <option>2025</option>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <select className="py-3 px-5 border border-gray-200 rounded-lg bg-white min-w-[180px] font-['Poppins'] text-sm transition-all cursor-pointer text-gray-800 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 dark:bg-gray-600 dark:border-gray-500 dark:text-gray-200">
                <option>Select Exam</option>
                <option>Midterm</option>
                <option>Final</option>
                <option>Quiz</option>
              </select>
              <button className="py-3 px-6 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-all">Apply Filters</button>
            </div>
            
            <div className="flex flex-col gap-5">
              <PastPaperItems 
                title="Mathematics Final Exam 2023" 
                downloads="2.4k Downloads" 
                rating="4.8/5" 
              />
              <PastPaperItems 
                title="Physics Midterm 2023" 
                downloads="1.8k Downloads" 
                rating="4.6/5" 
              />
              <PastPaperItems 
                title="Biology Final Exam 2023" 
                downloads="2.1k Downloads" 
                rating="4.7/5" 
              />
            </div>
          </section>
    
          {/* Features Section */}
          <section className="py-10 mx-3 my-16">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-2xl font-semibold text-gray-800 relative after:absolute after:bottom-[-10px] after:left-0 after:w-[60px] after:h-1 after:bg-indigo-600 after:rounded-md dark:text-gray-100">Why Choose StudyNotes</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <FeatureCard 
                icon={faCheckCircle} 
                title="Verified Content" 
                description="All notes and papers are verified by subject experts for accuracy." 
              />
              <FeatureCard 
                icon={faBolt} 
                title="Easy Access" 
                description="Download or view notes instantly without any hassle." 
              />
              <FeatureCard 
                icon={faUsers} 
                title="Community Contributions" 
                description="Notes shared by top students and verified professors." 
              />
              <FeatureCard 
                icon={faMobileAlt} 
                title="Mobile Friendly" 
                description="Access your study materials on any device, anywhere." 
              />
            </div>
          </section>
    
          {/* Testimonials Section */}
          <section className="py-10 mx-3 my-16">
            <div className="flex justify-between items-center mb-9">
              <h2 className="text-2xl font-semibold text-gray-800 relative after:absolute after:bottom-[-10px] after:left-0 after:w-[60px] after:h-1 after:bg-indigo-600 after:rounded-md dark:text-gray-100">What Students Say</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <TestimonialCard 
                name="Alex Johnson" 
                role="Engineering Student" 
                testimonial="StudyNotes helped me ace my calculus exam. The notes were comprehensive and easy to understand." 
              />
              <TestimonialCard 
                name="Sarah Miller" 
                role="Medicine Student" 
                testimonial="The biology past papers helped me understand the exam pattern. I wouldn't have scored an A without StudyNotes!" 
              />
            </div>
          </section>
    
          {/* Newsletter Section */}
          <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 py-16 px-10 rounded-2xl mx-3 my-20 relative overflow-hidden dark:from-gray-600 dark:to-gray-700">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.08\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            
            <div className="text-center max-w-xl mx-auto relative z-10">
              <h2 className="text-white mb-5 text-3xl font-bold">Stay Updated</h2>
              <p className="text-white opacity-90 mb-8 text-base">Subscribe to our newsletter to get notifications about new notes and past papers.</p>
              <div className="flex flex-col md:flex-row max-w-lg mx-auto shadow rounded-lg overflow-hidden p-1 gap-1">
                <input type="email" placeholder="Enter your email" className="flex-1 py-4 px-6 border-none font-['Poppins'] text-base rounded-lg  bg-white dark:bg-gray-700 dark:focus:border-gray-400 dark:focus:ring-gray-300" />
                <button className="py-4 px-8 bg-emerald-500 text-white border-none font-semibold text-base cursor-pointer transition-all hover:bg-emerald-600 hover:-translate-y-1 rounded-lg">Subscribe</button>
              </div>
            </div>
          </section>
          </>
  );
}

export default MainContent;
