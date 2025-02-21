import Image from 'next/image';
import React from 'react';

const FeaturedCourses = () => {
    const featuredCourses = [
        {
          title: "Web Development Fundamentals",
          description: "Learn HTML, CSS, and JavaScript basics",
          lessons: 12,
          duration: "6 hours",
          image: "https://plus.unsplash.com/premium_vector-1734127305687-4440bad6d7a7?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "UI/UX Design Principles",
          description: "Master the art of user interface design",
          lessons: 8,
          duration: "4 hours",
          image: "https://images.unsplash.com/vector-1738220730338-6024c9501a14?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          title: "React.js for Beginners",
          description: "Build modern web applications",
          lessons: 15,
          duration: "8 hours",
          image: "https://plus.unsplash.com/premium_vector-1733712607733-986d23ee4753?q=80&w=1800&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
      ]
      
    return (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCourses.map((course, index) => (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Image src={course.image || "/placeholder.svg"} width={400} height={200} alt={course.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-sm text-gray-500">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default FeaturedCourses;