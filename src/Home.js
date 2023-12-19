import React from 'react';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <p>This is a collection of my projects and accomplishments.</p>
      
      <div className="projects">
        <h2>My Projects</h2>
        {/* Example project list */}
        <ul>
          <li>
            <a href="https://github.com/example/project1" target="_blank" rel="noopener noreferrer">
              Project 1
            </a>
            - Brief description of Project 1.
          </li>
          <li>
            <a href="https://youtube.com/example/project2" target="_blank" rel="noopener noreferrer">
              Project 2
            </a>
            - Brief description of Project 2.
          </li>
          {/* Add more projects as needed */}
        </ul>
      </div>
    </div>
  );
};

export default Home;