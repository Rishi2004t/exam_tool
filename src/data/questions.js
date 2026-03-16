import combinatorialStudiesQuestions from './combinatorialStudiesQuestions';

export const subjectsData = [
  {
    id: 'industrial-ethics',
    title: 'Industrial Ethics',
    locked: false,
    units: [
      {
        id: 'unit1',
        title: 'Unit 1 – Introduction to Ethics',
        estimatedTime: 20,
        questions: [
          /* ... questions ... */
        ]
      },
      /* ... other units ... */
    ],
    studyMaterials: [
      { id: 'ie-n1', title: 'Unit 1: Ethics Notes', description: 'Comprehensive notes on professional ethics and moral decision making.', fileUrl: '/resources/industrial-ethics/unit1-notes.pdf' },
      { id: 'ie-n2', title: 'Unit 2: Professional Ethics', description: 'Detailed guide on intellectual property and corporate ethics.', fileUrl: '/resources/industrial-ethics/unit2-notes.pdf' },
      { id: 'ie-n3', title: 'Unit 3: CSR & Startups', description: 'Notes on corporate social responsibility and startup policies in India.', fileUrl: '/resources/industrial-ethics/unit3-notes.pdf' }
    ]
  },
  {
    id: 'combinatorial-studies',
    title: 'CSE357: COMBINATORIAL STUDIES',
    locked: false,
    units: [
      /* ... units ... */
    ],
    studyMaterials: [
      { id: 'cs-n1', title: 'Unit 1: Operating Systems', description: 'Fundamental concepts of OS, kernels, and process management.', fileUrl: '/resources/combinatorial/unit1-os.pdf' },
      { id: 'cs-n2', title: 'Unit 2: DBMS Notes', description: 'Relational databases, SQL, and normalization techniques.', fileUrl: '/resources/combinatorial/unit2-dbms.pdf' },
      { id: 'cs-n3', title: 'Unit 3: Networking', description: 'OSI model, TCP/IP, and network security essentials.', fileUrl: '/resources/combinatorial/unit3-networking.pdf' }
    ]
  },
  { id: 'data-structures', title: 'Data Structures', locked: true, units: [] },
  { id: 'computer-networks', title: 'Computer Networks', locked: true, units: [] },
  { id: 'operating-systems', title: 'Operating Systems', locked: true, units: [] }
];

