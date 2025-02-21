import React from 'react';
import FeaturedCourses from '../FeaturedCourses/FeaturedCourses';
import Stats from '../Stats/Stats';

const Hero = () => {
    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">Learn at your own pace</h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl">
            Access quality education from anywhere in the world. Start your learning journey today.
          </p>
        </div>

        {/* Featured Courses */}
        <FeaturedCourses/>

        {/* Stats */}
        <Stats/>
      </section>
    );
};

export default Hero;