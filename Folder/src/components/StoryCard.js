import React from 'react';
import StarRating from './StarRating';

const StoryCard = ({ story, index, onEdit, onDelete, onSetRating }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 story-card hover:shadow-xl border border-gray-100">
      {/* Action buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={() => onEdit(index)}
          className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-full transition-all duration-200"
          title="Edit story"
        >
          ✏️
        </button>
        <button
          onClick={() => onDelete(index)}
          className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
          title="Delete story"
        >
          ×
        </button>
      </div>

      {/* Story content */}
      <div className="space-y-4">
        <a
          href={story.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl font-bold text-gray-800 hover:text-purple-600 transition-colors duration-200 block"
        >
          {story.title}
        </a>

        <div className="text-gray-600">
          by <span className="font-medium">{story.author}</span>
        </div>

        {story.fandom && (
          <div className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
            📚 {story.fandom}
          </div>
        )}

        {story.relationship && (
          <div className="text-sm text-pink-600 bg-pink-50 px-3 py-1 rounded-full inline-block">
            💕 {story.relationship}
          </div>
        )}

        {story.summary && (
          <div className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-3 rounded-lg">
            {story.summary}
          </div>
        )}

        {/* Star rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Rating:</span>
          <StarRating 
            rating={story.rating} 
            onSetRating={(rating) => onSetRating(index, rating)} 
          />
        </div>

        {/* Tags */}
        {story.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {story.tags.map((tag, tagIndex) => (
              <span
                key={tagIndex}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full hover:bg-gray-200 transition-colors duration-200"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryCard;