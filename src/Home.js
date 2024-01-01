import React from 'react';
import Project from './Project';
import './Home.css'

export default function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <h2>This is a collection of the projects I have done so far.</h2>

      <div className="projects">
        <Project name="Enhancing K-Means Clustering Algorithm with Improved Initial Centers" date="12/2023"
          description="This repository implements the improved K-Means algorithm presented in the paper 
          'Enhancing K-Means Clustering Algorithm with Improved Initial Center'. It showcases a method 
          for systematic initial centroid calculation, resulting in more consistent and efficient clustering."
          links={{
            'GitHub Repository': 'https://github.com/apricityyyy/Enhancing-K-means-Clustering-Algorithm-with-Improved-Initial-Center',
            'Blog Post': 'https://www.linkedin.com/pulse/from-theory-practice-implementing-k-means-clustering-center-ilhama-6hk2e%3FtrackingId=cfDn1DHdQDSLP7K8Pz1nqQ%253D%253D/?trackingId=cfDn1DHdQDSLP7K8Pz1nqQ%3D%3D'
          }} />
        <Project name="MentorMe" date="12/2023"
          description="MentorMe is an IT mentorship marketplace connecting job seekers with mentors."
          links={{ 'GitHub Repository': 'https://github.com/ISE-Career-Navigators/MentorMe' }} />
        <Project name="Weekly Exercises" date="10/2023-12/2023"
          description="Tasks that were assigned weekly during 'Web & Mobile I' class regarding learning objectives. Most of them can be found under
          their corresponding week. Tasks start from week 5 that contain JavaScript, too. Previous weeks have been completed during Assignment 1."
          links={{ 'GitHub Repository': 'https://github.com/apricityyyy/WM1_Weekly' }} />
        <Project name="Google Keep App Analogue" date="11/2023"
          description="Small project that uses different functionalities of React."
          links={{
            'GitHub Repository': 'https://github.com/apricityyyy/google-keep-app',
            'GitHub Page': 'https://apricityyyy.github.io/google-keep-app/'
          }} />
        <Project name="Either AI or Back-end" date=""
          description=""
          links={{ "": "" }} />
      </div>
    </div>
  );
};