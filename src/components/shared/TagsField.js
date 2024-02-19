import React, { useState } from "react";

const TagsField = ({ initialTags = [], onTagsChange }) => {
  const [tags, setTags] = useState(initialTags);
  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    if (tagInput.trim() !== "") {
      const newTags = [...tags, tagInput];
      setTags(newTags);
      onTagsChange(newTags);
      setTagInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === "Done" || e.key === "Go") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <div className="relative">
      <input
        className="shad-post-input"
        placeholder="Enter some tags"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="hidden">
        <div className="absolute z-40 left-0 mt-2 w-full">
          <div className="py-1 text-sm bg-white rounded shadow-lg border border-gray-300">
            <a
              className="block py-1 px-5 cursor-pointer hover:bg-indigo-600 hover:text-white"
              onClick={handleAddTag}
            >
              Add tag "<span className="font-semibold">{tagInput}</span>"
            </a>
          </div>
        </div>
      </div>
      {/* <!-- selections --> */}
      <div>
        {tags.map((tag, index) => (
          <div
            key={index}
            className="inline-flex items-center text-sm rounded mr-1 overflow-hidden bg-dark-4 border-none py-1 px-1 placeholder:text-light-4 focus-visible:ring-1 mt-3"
          >
            <span className="ml-2 mr-1 leading-relaxed truncate max-w-xs px-1">
              {tag}
            </span>
            <button
              className="w-6 h-8 inline-block align-middle text-gray-500 focus:outline-none"
              onClick={() => handleRemoveTag(index)}
            >
              <svg
                className="w-6 h-6 fill-current mx-auto"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsField;
