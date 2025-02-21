import Link from 'next/link';
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <FaGraduationCap className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">EduLearn</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-primary">
                Login
              </Link>
              <Link href="/register" className="bg-slate-800 text-white px-4 py-2 rounded-md hover:bg-primary/90">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
};

export default Navbar;