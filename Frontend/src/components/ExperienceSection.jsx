import React, { useState } from 'react';

const ExperienceSection = ({experience,setExperience}) => {

  const [input, setInput] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: ''
  });

  const handleChange = e => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (input.company && input.role && input.startDate && input.endDate) {
      setExperience([...experience, input]);
 
      setInput({ company: '', role: '', startDate: '', endDate: '' });
    }
  };

  const handleRemove = idx => {
    setExperience(experience.filter((_, i) => i !== idx));

  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={input.company}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/4"
        />
        <input
          type="text"
          name="role"
          placeholder="Role"
          value={input.role}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/4"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={input.startDate}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/5"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={input.endDate}
          onChange={handleChange}
          className="border-1 border-gray-300 rounded-lg p-1 pl-3 w-1/5"
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
        {experience.map((exp, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm bg-gray-100 rounded px-2 py-1 mt-1">
            <span>
              {exp.company} - {exp.role} ({exp.startDate} to {exp.endDate})
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

export default ExperienceSection;