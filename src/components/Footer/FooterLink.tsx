import React from 'react'

interface FooterLink  {
  text: string;
}

function FooterLink({text}: FooterLink) {
  return (
    <li className="mb-3">
    <a href="#" className="text-gray-300 text-base transition-all hover:text-white hover:translate-x-1 inline-block">{text}</a>
  </li>
  )
}

export default FooterLink