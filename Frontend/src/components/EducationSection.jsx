import React, { useState, useEffect } from 'react';

const EducationSection = ({ education, setEducation }) => {
  const [input, setInput] = useState({
    nameofCollege: '',
    class: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (input.nameofCollege && input.class && input.startDate && input.endDate) {
      const updated = [...education, input];
      setEducation(updated);
      setInput({ nameofCollege: '', class: '', startDate: '', endDate: '' });
    }
  };

  const handleRemove = idx => {
    const updated = education.filter((_, i) => i !== idx);
    setEducation(updated);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          name="nameofCollege"
          placeholder="nameofCollege/College"
          value={input.nameofCollege}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/4"
        />
        <input
          type="text"
          name="class"
          placeholder="class"
          value={input.class}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/4"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={input.startDate}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/6"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={input.endDate}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/6"
        />
        <button
          type="button"
          className="bg-[#4C4EE7] text-white px-3 py-1 rounded"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>
      <ul className="mt-2">
        {education.map((edu, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm bg-gray-100 rounded px-2 py-1 mt-1">
            <span>
              {edu.nameofCollege} - {edu.class} ({edu.startDate} to {edu.endDate})
            </span>
            <button
              type="button"
              className="text-red-500 ml-2"
              onClick={() => handleRemove(idx)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EducationSection;