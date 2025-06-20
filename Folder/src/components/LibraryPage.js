import React, { useState, useMemo } from 'react';
import StoryCard from './StoryCard';

const LibraryPage = ({ stories, onAddStory, onEditStory, onDeleteStory, onSetRating }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFandomFilters, setActiveFandomFilters] = useState(new Set());
  const [activeRelationshipFilters, setActiveRelationshipFilters] = useState(new Set());
  const [activeTagFilters, setActiveTagFilters] = useState(new Set());

  // Get unique values for filters
  const { allFandoms, allRelationships, allTags } = useMemo(() => {
    const fandoms = new Set();
    const relationships = new Set();
    const tags = new Set();

    stories.forEach(story => {
      if (story.fandom) fandoms.add(story.fandom);
      if (story.relationship) relationships.add(story.relationship);
      story.tags.forEach(tag => tags.add(tag));
    });

    return {
      allFandoms: Array.from(fandoms).sort(),
      allRelationships: Array.from(relationships).sort(),
      allTags: Array.from(tags).sort()
    };
  }, [stories]);

  // Filter stories based on search and filters
  const filteredStories = useMemo(() => {
    return stories.filter(story => {
      // Search term matching
      const matchesSearch = !searchTerm || 
        story.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        story.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (story.fandom && story.fandom.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (story.relationship && story.relationship.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (story.summary && story.summary.toLowerCase().includes(searchTerm.toLowerCase())) ||
        story.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

      // Filter matching
      const matchesFandom = activeFandomFilters.size === 0 || 
        (story.fandom && activeFandomFilters.has(story.fandom));
      const matchesRelationship = activeRelationshipFilters.size === 0 || 
        (story.relationship && activeRelationshipFilters.has(story.relationship));
      const matchesTags = activeTagFilters.size === 0 || 
        story.tags.some(tag => activeTagFilters.has(tag));

      return matchesSearch && matchesFandom && matchesRelationship && matchesTags;
    });
  }, [stories, searchTerm, activeFandomFilters, activeRelationshipFilters, activeTagFilters]);

  const toggleFilter = (filterSet, setFilterSet, value) => {
    const newSet = new Set(filterSet);
    if (newSet.has(value)) {
      newSet.delete(value);
    } else {
      newSet.add(value);
    }
    setFilterSet(newSet);
  };

  const renderFilterSection = (title, emoji, items, activeFilters, toggleFunction) => {
    if (items.length === 0) return null;

    return (
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <span className="text-sm font-medium text-gray-700 flex items-center gap-1">
          <span>{emoji}</span>
          {title}:
        </span>
        <div className="flex flex-wrap gap-2">
          {items.map(item => (
            <button
              key={item}
              onClick={() => toggleFunction(item)}
              className={`px-3 py-1 rounded-full text-sm transition-all duration-200 tag-filter ${
                activeFilters.has(item)
                  ? 'bg-purple-500 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-300 hover:bg-purple-50'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">📚 My Fan Fiction Library</h1>
        <p className="text-gray-600">Organize and rate your favorite stories</p>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <button
            onClick={onAddStory}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            + Add New Story
          </button>
          
          <div className="w-full md:w-96">
            <input
              type="text"
              placeholder="Search stories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {renderFilterSection(
            'Fandoms', '📚', allFandoms, activeFandomFilters,
            (value) => toggleFilter(activeFandomFilters, setActiveFandomFilters, value)
          )}
          {renderFilterSection(
            'Relationships', '💕', allRelationships, activeRelationshipFilters,
            (value) => toggleFilter(activeRelationshipFilters, setActiveRelationshipFilters, value)
          )}
          {renderFilterSection(
            'Tags', '🏷️', allTags, activeTagFilters,
            (value) => toggleFilter(activeTagFilters, setActiveTagFilters, value)
          )}
        </div>
      </div>

      {/* Stories Grid */}
      {filteredStories.length === 0 ? (
        <div className="text-center py-16">
          <div className="bg-white rounded-lg shadow-lg p-12 max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              {stories.length === 0 ? 'No stories yet!' : 'No matching stories'}
            </h3>
            <p className="text-gray-500 mb-6">
              {stories.length === 0 
                ? 'Click "Add New Story" to get started!' 
                : 'Try adjusting your search or filters'
              }
            </p>
            {stories.length === 0 && (
              <button
                onClick={onAddStory}
                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                Add Your First Story
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map((story, index) => (
            <StoryCard
              key={stories.indexOf(story)}
              story={story}
              index={stories.indexOf(story)}
              onEdit={onEditStory}
              onDelete={onDeleteStory}
              onSetRating={onSetRating}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default LibraryPage;