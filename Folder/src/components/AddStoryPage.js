import React, { useState } from 'react';



const AddStoryPage = ({ onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    link: '',
    fandom: '',
    relationship: '',
    summary: '',
    tags: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📖 Add New Story</h1>
        <p className="text-gray-600">Add a new fan fiction to your library</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title and Author row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Story Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
                Author *
              </label>
              <input
                type="text"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Link */}
          <div>
            <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
              Story Link *
            </label>
            <input
              type="url"
              id="link"
              name="link"
              value={formData.link}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>

          {/* Fandom and Relationship row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fandom" className="block text-sm font-medium text-gray-700 mb-2">
                Fandom
              </label>
              <input
                type="text"
                id="fandom"
                name="fandom"
                value={formData.fandom}
                onChange={handleChange}
                placeholder="e.g., Harry Potter, Marvel, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
            <div>
              <label htmlFor="relationship" className="block text-sm font-medium text-gray-700 mb-2">
                Relationship
              </label>
              <input
                type="text"
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                placeholder="e.g., Harry/Draco, Tony/Steve, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
              />
            </div>
          </div>

          {/* Summary */}
          <div>
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Story Summary
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Brief description of the story..."
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
            />
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
              Tags (comma-separated)
            </label>
            <textarea
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="romance, angst, hurt/comfort, fluff"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-vertical"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Add Story
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStoryPage;