import React, { useState } from 'react';
import './App.css';
import './index.css';
import LibraryPage from './components/LibraryPage';
import AddStoryPage from './components/AddStoryPage';
import EditStoryPage from './components/EditStoryPage';

function App() {
  const [stories, setStories] = useState([]);
  const [currentPage, setCurrentPage] = useState('library');
  const [editingStoryIndex, setEditingStoryIndex] = useState(-1);

  const addStory = (storyData) => {
    const tagArray = storyData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    const story = {
      ...storyData,
      tags: tagArray,
      rating: 0
    };

    setStories(prev => [...prev, story]);
    setCurrentPage('library');
  };

  const updateStory = (index, storyData) => {
    const tagArray = storyData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    setStories(prev => prev.map((story, i) => 
      i === index 
        ? { ...storyData, tags: tagArray, rating: story.rating }
        : story
    ));
    setCurrentPage('library');
  };

  const deleteStory = (index) => {
    if (window.confirm('Are you sure you want to delete this story?')) {
      setStories(prev => prev.filter((_, i) => i !== index));
    }
  };

  const setRating = (storyIndex, rating) => {
    setStories(prev => prev.map((story, i) => 
      i === storyIndex ? { ...story, rating } : story
    ));
  };

  const showEditPage = (index) => {
    setEditingStoryIndex(index);
    setCurrentPage('edit');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'add':
        return (
          <AddStoryPage 
            onSubmit={addStory}
            onCancel={() => setCurrentPage('library')}
          />
        );
      case 'edit':
        return (
          <EditStoryPage 
            story={stories[editingStoryIndex]}
            onSubmit={(storyData) => updateStory(editingStoryIndex, storyData)}
            onCancel={() => setCurrentPage('library')}
          />
        );
      default:
        return (
          <LibraryPage 
            stories={stories}
            onAddStory={() => setCurrentPage('add')}
            onEditStory={showEditPage}
            onDeleteStory={deleteStory}
            onSetRating={setRating}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {renderCurrentPage()}
      </div>
    </div>
  );
}

export default App;