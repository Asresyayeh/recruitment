import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios"; // your axios instance

const JobsSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories"); // Laravel endpoint
        setCategories(res.data); // assumes data = [{id, name}, ...]
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <>
      <section
        id="jobs"
        className="w-full py-20 bg-gradient-to-br from-green-900 via-green-850 to-black text-white"
      >
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="text-center space-y-12">
            <h3 className="text-4xl font-bold">
              Explore <span className="text-green-400">Job Categories</span>
            </h3>

            <div className="grid md:grid-cols-3 gap-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white/5 border border-green-500/20 rounded-2xl hover:border-green-400 hover:shadow-green-500/30 hover:shadow-xl transition p-8 space-y-4"
                >
                  <h4 className="text-2xl font-semibold text-green-400">
                    {category.name}
                  </h4>

                  <p className="text-gray-200">
                    Browse top {category.name.toLowerCase()} roles from leading
                    companies.
                  </p>
                  <Link
                    to={`/jobs/category/${category.id}`} // pass ID, not name
                    className="border border-green-500 text-green-400 px-5 py-2 rounded-2xl hover:bg-green-500 hover:text-black transition inline-block"
                  >
                    View Jobs
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-20 bg-gradient-to-br from-green-900 via-green-850 to-black text-white">
        <div className="w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-24">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-4xl font-bold mb-4">Are You Hiring?</h3>
            <p className="text-lg mb-6 text-gray-200">
              Post your job openings and connect with thousands of qualified
              candidates.
            </p>

            <Link to="/post">
              <button className="bg-green-500 hover:bg-green-400 text-black rounded-2xl px-10 py-3 transition">
                Post a Job
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobsSection;
