import Link from 'next/link';
import React from 'react';
import { FaGraduationCap } from 'react-icons/fa';

const Navbar = () => {
    return (
        <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <Link href={'/'} className="flex items-center">
              <FaGraduationCap className="h-8 w-8 text-primary text-slate-800" />
              <span className="ml-2 text-xl text-slate-800 font-bold">EduLearn</span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/classes" className="text-gray-600 hover:text-primary">
                My Classes
              </Link>
              <Link href="/dashboard/courses" className="text-gray-600 hover:text-primary">
                Dashboard
              </Link>
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