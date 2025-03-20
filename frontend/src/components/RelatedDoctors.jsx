import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);
  const [relDoc, setRelDoc] = useState([]);

  useEffect(() => {
    if (doctors && speciality) {
      const filteredDoctors = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(filteredDoctors);
    }
  }, [doctors, speciality, docId]);

  if (relDoc.length === 0) {
    return <p className="text-gray-500 italic">No related doctors found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {relDoc.slice(0, 5).map((doc, index) => (
        <div
          onClick={() => {
            navigate(`/appointment/${doc._id}`);
            scrollTo(0, 0);
          }}
          key={index}
          className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden cursor-pointer group"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={doc.image}
              alt={doc.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-2 right-2">
              <span className="bg-[#ECDCBF] text-[#D84040] text-xs px-2 py-1 rounded-full">
                Available
              </span>
            </div>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold group-hover:text-[#D84040] transition-colors duration-200">
              {doc.name}
            </h2>
            <p className="text-gray-600 text-sm">{doc.speciality}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-sm text-gray-500">⭐ 4.8</span>
              <span className="text-[#D84040] text-sm font-medium">
                ${doc.fee || "50"}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedDoctors;