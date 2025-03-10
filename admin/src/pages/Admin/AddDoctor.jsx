import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

const AddDoctor = () => {
  const [previewImage, setPreviewImage] = useState(null);

  const [docImg, setDocImg] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fee, setFee] = useState("");
  const [about, setAbout] = useState("");
  const [specialization, setSpecialization] = useState("General Physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");

  const { aToken, backendUrl } = useContext(AdminContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (
        !docImg ||
        !name ||
        !email ||
        !password ||
        !experience ||
        !fee ||
        !about ||
        !specialization ||
        !degree ||
        !address1
      ) {
        toast.error("Please fill all the fields");
        return;
      }

      const formData = new FormData();
      formData.append("image", docImg);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("experience", experience);
      formData.append("fees", Number(fee));
      formData.append("about", about);
      formData.append("specialization", specialization);
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1, line2: address2 })
      );

      //  console.log(formData);
      // formData.forEach((value, key) => {
      //   console.log(`${key}: ${value}`);
      // });

      // aToken gets converted to lowercase when passed as this
      const { data } = await axios.post(
        `${backendUrl}/api/v1/admin/add-doctor`,
        formData,
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        setPreviewImage(null);
        setDocImg(false);
        setName("");
        setEmail("");
        setPassword("");
        setExperience("1 Year");
        setFee("");
        setAbout("");
        setSpecialization("General Physician");
        setDegree("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      // console.log(error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);

      setDocImg(e.target.files[0]);
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#A31D1D] mb-4 md:mb-6 border-b border-[#ECDCBF] pb-3">
          Add New Doctor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
          {/* Image Upload Section */}
          <div className="flex flex-col items-center mb-6">
            <label
              htmlFor="doc-img"
              className="cursor-pointer w-28 h-28 md:w-32 md:h-32 rounded-full border-2 border-dashed border-[#ECDCBF] flex flex-col items-center justify-center bg-[#F8F2DE] overflow-hidden"
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Doctor preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <img
                    src={assets.upload_area}
                    alt="Upload"
                    className="w-10 h-10 mb-2"
                  />
                  <p className="text-xs text-[#A31D1D]">
                    Upload Doctor Picture
                  </p>
                </>
              )}
            </label>
            <input
              type="file"
              id="doc-img"
              hidden
              accept="image/*"
              onChange={handleImageChange}
              // onChange={(e) => {
              //   setDocImg(e.target.files[0]);
              // }}
            />
          </div>

          {/* Doctor Information Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Left Column */}
            <div className="space-y-3 md:space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Doctor Name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Doctor Email
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Experience
                </label>
                <select
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setExperience(e.target.value)}
                  value={experience}
                >
                  <option value="">Select Experience</option>
                  <option value="1">1 Year</option>
                  <option value="2">2 Years</option>
                  <option value="3">3 Years</option>
                  <option value="4">4 Years</option>
                  <option value="5">5 Years</option>
                  <option value="6">6 Years</option>
                  <option value="7">7 Years</option>
                  <option value="8">8 Years</option>
                  <option value="9">9 Years</option>
                  <option value="10">10+ Years</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Consultation Fee
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    $
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 pr-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                    onChange={(e) => setFee(e.target.value)}
                    value={fee}
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-3 md:space-y-4">
              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Specialization
                </label>
                <select
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setSpecialization(e.target.value)}
                  value={specialization}
                >
                  <option value="">Select Specialization</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Pediatrician">Pediatrician</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>

              <div className="form-group">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Education
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  placeholder="e.g., MD, Harvard Medical School"
                  onChange={(e) => setDegree(e.target.value)}
                  value={degree}
                />
              </div>

              <div className="form-group space-y-2">
                <label className="block text-sm font-medium text-[#A31D1D] mb-1">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Address Line 1"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setAddress1(e.target.value)}
                  value={address1}
                />
                <input
                  type="text"
                  placeholder="Address Line 2 (Optional)"
                  className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE]"
                  onChange={(e) => setAddress2(e.target.value)}
                  value={address2}
                />
              </div>
            </div>
          </div>

          {/* About Doctor - Full Width */}
          <div className="form-group">
            <label className="block text-sm font-medium text-[#A31D1D] mb-1">
              About Doctor
            </label>
            <textarea
              className="w-full px-3 py-2 border border-[#ECDCBF] rounded-md focus:outline-none focus:ring-1 focus:ring-[#D84040] bg-[#F8F2DE] h-20 md:h-24"
              placeholder="Enter doctor's bio, experience, and other relevant information..."
              onChange={(e) => setAbout(e.target.value)}
              value={about}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-4 py-2 md:px-5 md:py-2 bg-[#D84040] hover:bg-[#A31D1D] text-white font-medium rounded-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#A31D1D] text-sm md:text-base"
              onClick={handleSubmit}
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;
