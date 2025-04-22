import React from 'react'
import Link from 'next/link';

interface FooterLink {
  text: string;
  link: string;
}

function FooterLink({ text, link }: FooterLink) {
  return (
    <li className="mb-3">
      <Link href={link} className="text-gray-300 text-base transition-all hover:text-white hover:translate-x-1 inline-block">{text}</Link>
    </li>
  )
}

export default FooterLink