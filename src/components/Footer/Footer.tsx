import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {

  faEnvelope,
  faPhone,
  faMapMarkerAlt,

} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import FooterLink from './FooterLink'

function Footer() {
  return (
    <>
      <footer className="bg-gray-800 text-white pt-20 pb-8 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 px-3">
          <div className="footer-section">
            <h3 className="text-xl mb-6 font-semibold relative inline-block after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-[3px] after:bg-indigo-600">StudyNotes</h3>
            <p className="text-gray-300 mb-6 text-base leading-relaxed">Your one-stop destination for quality study materials, notes, and past year questions.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 flex justify-center items-center rounded-full text-black transition-all hover:bg-indigo-600 hover:text-gray-100 hover:-translate-y-1 text-base">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 flex justify-center items-center rounded-full text-black transition-all hover:bg-indigo-600 hover:text-gray-100 hover:-translate-y-1 text-base">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 flex justify-center items-center rounded-full text-black transition-all hover:bg-indigo-600 hover:text-gray-100 hover:-translate-y-1 text-base">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href="#" className="w-10 h-10 bg-white bg-opacity-10 flex justify-center items-center rounded-full text-black transition-all hover:bg-indigo-600 hover:text-gray-100 hover:-translate-y-1 text-base">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="text-xl mb-6 font-semibold relative inline-block after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-[3px] after:bg-indigo-600">Quick Links</h3>
            <ul>
              <FooterLink text="Home" />
              <FooterLink text="Subjects" />
              <FooterLink text="Past Papers" />
              <FooterLink text="About Us" />
              <FooterLink text="Contact" />
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-xl mb-6 font-semibold relative inline-block after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-[3px] after:bg-indigo-600">Popular Subjects</h3>
            <ul>
              <FooterLink text="Mathematics" />
              <FooterLink text="Physics" />
              <FooterLink text="Chemistry" />
              <FooterLink text="Biology" />
              <FooterLink text="Computer Science" />
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-xl mb-6 font-semibold relative inline-block after:absolute after:bottom-[-10px] after:left-0 after:w-10 after:h-[3px] after:bg-indigo-600">Contact Us</h3>
            <ul className="contact-info">
              <li className="flex items-center mb-5 text-gray-300 text-base">
                <FontAwesomeIcon icon={faEnvelope} className="mr-4 text-indigo-500 text-lg" />
                support@studynotes.com
              </li>
              <li className="flex items-center mb-5 text-gray-300 text-base">
                <FontAwesomeIcon icon={faPhone} className="mr-4 text-indigo-500 text-lg" />
                +1 (555) 123-4567
              </li>
              <li className="flex items-center mb-5 text-gray-300 text-base">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-4 text-indigo-500 text-lg" />
                Butwal, Nepal
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center pt-8 border-t border-white border-opacity-10 text-gray-300 text-base">
          <p>&copy; 2025 StudyNotes. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

export default Footer