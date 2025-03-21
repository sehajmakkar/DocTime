import React from 'react';
import {assets} from '../assets/assets';
const About = () => {
  return (
    <div className="min-h-screen bg-[#F8F2DE] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-[#D84040] p-6 text-white">
            <h1 className="text-2xl font-bold text-center">About Us</h1>
          </div>

          <div className="p-6 md:p-8">
            {/* Mission Statement */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#A31D1D] mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At DocTime, we're committed to making healthcare accessible to everyone. Our platform connects patients with qualified healthcare professionals, streamlining the appointment booking process and ensuring you receive timely care when you need it most.
              </p>
            </div>

            {/* How It Works */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#A31D1D] mb-4">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-[#F8F2DE] p-4 rounded-lg">
                  <div className="w-12 h-12 bg-[#D84040] rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">1</div>
                  <h3 className="font-bold text-lg mb-2">Search Doctors</h3>
                  <p className="text-gray-700">Find the right specialist for your needs based on specialty, location, and availability.</p>
                </div>
                
                <div className="bg-[#F8F2DE] p-4 rounded-lg">
                  <div className="w-12 h-12 bg-[#D84040] rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">2</div>
                  <h3 className="font-bold text-lg mb-2">Book Appointment</h3>
                  <p className="text-gray-700">Select your preferred date and time from available slots and confirm your appointment.</p>
                </div>
                
                <div className="bg-[#F8F2DE] p-4 rounded-lg">
                  <div className="w-12 h-12 bg-[#D84040] rounded-full flex items-center justify-center text-white font-bold text-xl mb-3">3</div>
                  <h3 className="font-bold text-lg mb-2">Visit Doctor</h3>
                  <p className="text-gray-700">Receive care from your doctor at their clinic or through our video consultation option.</p>
                </div>
              </div>
            </div>

            {/* Our Team */}
            <div className="mb-10">
              <h2 className="text-xl font-bold text-[#A31D1D] mb-4">Our Team</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                DocTime was founded by a team of healthcare professionals and technology experts who understand the challenges patients face when seeking medical care. Our diverse team works tirelessly to improve the healthcare experience.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#ECDCBF]">
                    <img src={assets.doc2} alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold">Dr. Sarah Johnson</h3>
                  <p className="text-gray-600">Co-Founder, Medical Director</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#ECDCBF]">
                    <img src={assets.doc1} alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold">Michael Chen</h3>
                  <p className="text-gray-600">Co-Founder, Tech Lead</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 border-2 border-[#ECDCBF]">
                    <img src={assets.doc2} alt="Team Member" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="font-bold">Lisa Rodriguez</h3>
                  <p className="text-gray-600">Head of Operations</p>
                </div>
              </div>
            </div>

            {/* Testimonials */}
            <div>
              <h2 className="text-xl font-bold text-[#A31D1D] mb-4">What Our Users Say</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-[#F8F2DE] p-4 rounded-lg italic">
                  <p className="text-gray-700 mb-3">"DocTime made it so easy to find a specialist and book an appointment. I was seen within two days of booking!"</p>
                  <p className="text-right font-bold">- James T.</p>
                </div>
                
                <div className="bg-[#F8F2DE] p-4 rounded-lg italic">
                  <p className="text-gray-700 mb-3">"As someone with a busy schedule, being able to book appointments online has been a game-changer. Highly recommend!"</p>
                  <p className="text-right font-bold">- Maria P.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;