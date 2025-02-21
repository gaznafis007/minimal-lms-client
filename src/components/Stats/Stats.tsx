import React from 'react';
import { FaBook, FaGraduationCap, FaUsers } from 'react-icons/fa';

const Stats = () => {
    const stats =[
        { icon: FaBook, stat: "100+", label: "Courses" },
        { icon: FaUsers, stat: "1000+", label: "Students" },
        { icon: FaGraduationCap, stat: "50+", label: "Instructors" },
      ]
    return (
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm text-center">
                <item.icon className="h-12 w-12 text-slate-800 mx-auto text-primary" />
                <div className="mt-4">
                  <div className="text-2xl font-bold text-gray-900">{item.stat}</div>
                  <div className="text-sm text-gray-500">{item.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
    );
};

export default Stats;