import React, { useState, useEffect } from 'react';
import './App.css';


function App() {
  const [resources, setResources] = useState(() => {
    const savedData = localStorage.getItem('myLinks');
    return savedData ? JSON.parse(savedData) : [];
  });
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('None');


  useEffect(() => {
    localStorage.setItem('myLinks', JSON.stringify(resources));
  }, [resources]);

  // 2. Logic (Function)
  
  const handleAdd = (e) => {
    e.preventDefault();
    if (!title || !url) {
      alert("Please fill both Title and URL");
      return;
    }

    const newLink = {
      id: Date.now(),
      title: title,
      url: url,
      category: category
    };

    setResources([newLink, ...resources]);
    setTitle('');
    setUrl('');
  };
  

  const handleDelete = (id) => {
    const updatedResources = resources.filter(item => item.id !== id);
    setResources(updatedResources);
  };


  // 3. UI
  return (
    <div className="main-container">
      <nav className="navbar">
        <div className="logo">The Link-Hub</div>
        <input type="text" placeholder="Search your links..." className="search-input" />
        <div className="user-info">Archana</div>
      </nav>
      
      <div className="sec-main-container">
        <div className="form-section">
          <h3>Save New Resource</h3>

          <div className="imput-forms">
            <input 
              type="text" 
              placeholder="Site name (e.g Google)" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="form-placeholder1"
            />
            <input 
              type="text" 
              placeholder="URL (https://...)" 
              value={url} 
              onChange={(e) => setUrl(e.target.value)} 
              className="form-placeholder2"
            />

            <select className="select-clss" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="None">None</option>
              {/* <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option> */}
              <option value="Design">Design</option>
              <option value="Job">Job</option>
            </select>
            
            <button className="add-btn" onClick={handleAdd}>Add to Hub</button>
          </div>
        </div>

        <div className="resource-grid">
          {resources.map((item) => (
            <div key={item.id} className="card">
              <div className="card-header">
                {item.category !== 'None' && (
                <span className="category-tag">{item.category}</span>
              )}
                <button className="del-btn" onClick={() => handleDelete(item.id)}>🗑️</button>
              </div>
              <h3>{item.title}</h3>
              <p>Resource added successfully!</p>
              <a href={item.url} target="_blank" rel="noreferrer" className="visit-link">
                Visit Resource →
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;