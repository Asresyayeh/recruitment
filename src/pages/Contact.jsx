import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Message sent successfully!");
  };

  return (
    <div
      id="contact"
      className="bg-gradient-to-br from-green-950 via-green-900 to-black text-white px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-400">Contact Us</h1>
          <p className="text-gray-300 mt-3">
            Have questions or need support? We’re here to help.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="mb-8 px-6 py-6 rounded-2xl shadow-lg bg-gradient-to-br from-green-900 via-green-850 to-black text-white"
          >
            <div className="mb-3">
              <label className="block mb-1 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/40 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm">Email Address</label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/40 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm">Subject</label>
              <input
                type="text"
                name="subject"
                required
                value={form.subject}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/40 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="mb-3">
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                name="message"
                rows="3"
                required
                value={form.message}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-black/40 border border-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-semibold py-2 rounded-lg transition"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="flex flex-col justify-center space-y-4 bg-gradient-to-br from-green-900 via-green-850 to-black text-white p-6 rounded-2xl shadow-lg">
            <div>
              <h2 className="text-2xl font-semibold text-green-400 mb-2">
                Get In Touch
              </h2>
              <p className="text-gray-200 text-sm">
                Our recruitment platform connects job seekers with employers.
                Feel free to reach out for support, partnerships, or inquiries.
              </p>
            </div>

            <div className="text-gray-200 text-sm space-y-1">
              <p>
                <span className="text-green-400 font-semibold">Email:</span>{" "}
                support@recruitment.com
              </p>
              <p>
                <span className="text-green-400 font-semibold">Phone:</span>{" "}
                +251 900 000 000
              </p>
              <p>
                <span className="text-green-400 font-semibold">Location:</span>{" "}
                Addis Ababa, Ethiopia
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
