import React, { useState } from 'react';
import { Layout } from './Home';

const SyllabusCard = ({ subject, onView }) => {
  return (
    <div className="syllabus-card animate-in">
      <div className="syllabus-icon">📄</div>
      <div className="syllabus-info">
        <h3>{subject.title}</h3>
        <p>{subject.description}</p>
      </div>
      <div className="syllabus-actions">
        <button className="btn-view" onClick={() => onView(subject)}>
          <span>👁️</span> View Syllabus
        </button>
        <a 
          href={subject.pdfUrl} 
          download 
          className="btn-download"
        >
          <span>📥</span> Download PDF
        </a>
      </div>
    </div>
  );
};

const Syllabus = () => {
  const [selectedSyllabus, setSelectedSyllabus] = useState(null);

  const subjects = [
    {
      id: 'industrial-ethics',
      title: 'Industrial Ethics',
      description: 'Human values, professional ethics, and social responsibility in engineering.',
      pdfUrl: '/resources/syllabus/industrial-ethics-syllabus.pdf'
    },
    {
      id: 'combinatorial-studies',
      title: 'CSE357: Combinatorial Studies',
      description: 'Advanced topics in discrete mathematics, counting, and graph theory.',
      pdfUrl: '/resources/syllabus/combinatorial-studies-syllabus.pdf'
    },
    {
      id: 'operating-systems',
      title: 'Operating Systems',
      description: 'Core concepts of process management, memory, and file systems.',
      pdfUrl: '/resources/syllabus/operating-systems-syllabus.pdf'
    },
    {
      id: 'data-structures',
      title: 'Data Structures',
      description: 'Understanding fundamental data organization and algorithm efficiency.',
      pdfUrl: '/resources/syllabus/data-structures-syllabus.pdf'
    },
    {
      id: 'computer-networks',
      title: 'Computer Networks',
      description: 'Principles of data communication, protocols, and network architecture.',
      pdfUrl: '/resources/syllabus/computer-networks-syllabus.pdf'
    }
  ];

  return (
    <Layout>
      <div className="syllabus-container">
        <div className="page-header">
          <h1 className="page-title">Subject Syllabus</h1>
          <p className="page-subtitle">View and download official curriculum documents for your courses.</p>
        </div>

        <div className="syllabus-grid">
          {subjects.map((subject) => (
            <SyllabusCard 
              key={subject.id} 
              subject={subject} 
              onView={(s) => setSelectedSyllabus(s)}
            />
          ))}
        </div>

        {selectedSyllabus && (
          <div className="pdf-viewer-overlay" onClick={() => setSelectedSyllabus(null)}>
            <div className="pdf-viewer-content" onClick={e => e.stopPropagation()}>
              <div className="viewer-header">
                <h3>{selectedSyllabus.title} - Syllabus</h3>
                <button className="close-viewer" onClick={() => setSelectedSyllabus(null)}>✕</button>
              </div>
              <div className="iframe-container">
                <iframe 
                  src={`${selectedSyllabus.pdfUrl}#toolbar=0`} 
                  title="Syllabus Viewer"
                  width="100%" 
                  height="100%"
                ></iframe>
              </div>
              <div className="viewer-footer">
                <a href={selectedSyllabus.pdfUrl} download className="btn btn-primary">
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Syllabus;
