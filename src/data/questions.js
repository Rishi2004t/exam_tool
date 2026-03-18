import combinatorialStudiesQuestions from './combinatorialStudiesQuestions';
import mkt203Questions from './mkt203Questions';

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
          { id: 1, text: "Ethics in professional life primarily aims to:", options: ["Maximize profit", "Guide moral decision making", "Increase competition", "Control employee behavior"], answer: 1 },
          { id: 2, text: "Integrity in professional ethics is best defined as:", options: ["Obeying orders blindly", "Maintaining honesty and strong moral principles", "Achieving business success", "Following company rules only"], answer: 1 },
          { id: 3, text: "Which of the following best represents business ethics?", options: ["Increasing production output", "Following moral standards in business activities", "Expanding international trade", "Maximizing shareholder profits"], answer: 1 },
          { id: 4, text: "Corporate ethics programs are mainly implemented to:", options: ["Increase employee workload", "Promote ethical conduct in organizations", "Reduce company profits", "Limit business growth"], answer: 1 },
          { id: 5, text: "Which of the following is NOT a component of corporate ethics?", options: ["Transparency", "Accountability", "Manipulation", "Integrity"], answer: 2 },
          { id: 6, text: "An organization that promotes honesty, fairness, and respect among employees is creating:", options: ["Competitive environment", "Ethical work environment", "Corporate monopoly", "Administrative system"], answer: 1 },
          { id: 7, text: "The first step in ethical decision making is:", options: ["Evaluating results", "Implementing the decision", "Identifying the problem", "Monitoring outcomes"], answer: 2 },
          { id: 8, text: "Which of the following best describes ethical decision making?", options: ["Choosing the most profitable option", "Choosing the morally correct action", "Choosing the fastest solution", "Choosing the easiest method"], answer: 1 },
          { id: 9, text: "Ethics in information technology mainly focuses on:", options: ["Hardware manufacturing", "Responsible use of digital systems", "Programming languages", "Computer networking"], answer: 1 },
          { id: 10, text: "Which of the following is a major ethical concern in IT?", options: ["Data storage capacity", "Privacy and data security", "Software installation", "Computer maintenance"], answer: 1 },
          { id: 11, text: "Unauthorized access to confidential information is considered:", options: ["Data analysis", "Privacy violation", "Information sharing", "Ethical research"], answer: 1 },
          { id: 12, text: "Copying software without purchasing a license is called:", options: ["Digital innovation", "Software piracy", "Data sharing", "System backup"], answer: 1 },
          { id: 13, text: "Ethical behavior of IT professionals includes:", options: ["Protect user privacy", "Selling customer data", "Ignoring cybersecurity threats", "Hiding software defects"], answer: 0 },
          { id: 14, text: "Which organization is known for combating software piracy?", options: ["ISO", "BSA", "IEEE", "WTO"], answer: 1 },
          { id: 15, text: "BSA stands for:", options: ["Business Software Alliance", "Basic Software Authority", "Business Security Agency", "Binary Systems Association"], answer: 0 },
          { id: 16, text: "Misuse of IT resources occurs when:", options: ["Computers are used for official tasks", "Employees use office systems for personal activities", "Data is stored securely", "Software is updated regularly"], answer: 1 },
          { id: 17, text: "Which of the following actions supports ethical IT practices?", options: ["Ignoring security policies", "Implementing cybersecurity training", "Sharing confidential passwords", "Using pirated software"], answer: 1 },
          { id: 18, text: "Which of the following is an example of cybersecurity risk?", options: ["Strong encryption", "Weak password protection", "Data backup", "Antivirus installation"], answer: 1 },
          { id: 19, text: "Women empowerment in professional environments mainly promotes:", options: ["Gender discrimination", "Equal opportunities for women", "Reduction of female workforce", "Limited leadership roles"], answer: 1 },
          { id: 20, text: "Encouraging women participation in STEM fields is an example of:", options: ["Gender inequality", "Women empowerment", "Workforce reduction", "Technology misuse"], answer: 1 },
          { id: 21, text: "Which of the following policies supports women empowerment in organizations?", options: ["Equal pay for equal work", "Reducing maternity benefits", "Hiring only male employees", "Limiting leadership roles"], answer: 0 },
          { id: 22, text: "Engineering ethics mainly focuses on:", options: ["Profit maximization", "Safety and public welfare", "Production speed", "Advertising strategies"], answer: 1 },
          { id: 23, text: "An engineer discovering a serious defect in a product design must:", options: ["Ignore the defect", "Report and correct the defect", "Hide the issue", "Continue production"], answer: 1 },
          { id: 24, text: "Environmental responsibility in engineering includes:", options: ["Increasing industrial waste", "Reducing environmental impact", "Ignoring pollution", "Maximizing production"], answer: 1 },
          { id: 25, text: "Which principle requires engineers to protect public safety?", options: ["Corporate loyalty", "Professional responsibility", "Profit maximization", "Market competition"], answer: 1 },
          { id: 26, text: "Which of the following is an example of ethical behavior in engineering?", options: ["Falsifying test results", "Reporting safety hazards", "Ignoring environmental laws", "Copying designs illegally"], answer: 1 },
          { id: 27, text: "Ethical decision making in engineering helps to:", options: ["Increase corruption", "Prevent technological misuse", "Reduce safety standards", "Increase production costs"], answer: 1 },
          { id: 28, text: "A professional engineer must prioritize:", options: ["Personal benefits", "Public safety and welfare", "Company profits", "Market competition"], answer: 1 },
          { id: 29, text: "Ethical organizations usually encourage employees to:", options: ["Hide mistakes", "Report unethical behavior", "Ignore company policies", "Focus only on profits"], answer: 1 },
          { id: 30, text: "The ultimate goal of ethics in professional practice is to:", options: ["Maximize revenue", "Ensure responsible and fair behavior", "Increase competition", "Reduce innovation"], answer: 1 }
        ]
      },
      {
        id: 'unit2',
        title: 'Unit 2 – Professional Ethics',
        estimatedTime: 20,
        questions: [
          { id: 1, text: "Intellectual Property refers to:", options: ["Physical assets of a company", "Creations of the human mind", "Government property", "Financial investments"], answer: 1 },
          { id: 2, text: "Intellectual Property Rights mainly protect:", options: ["Buildings and land", "Creative and innovative ideas", "Natural resources", "Company profits"], answer: 1 },
          { id: 3, text: "Which of the following is NOT a type of Intellectual Property?", options: ["Patent", "Trademark", "Copyright", "Salary"], answer: 3 },
          { id: 4, text: "Copyright law mainly protects:", options: ["Scientific inventions", "Creative works", "Product designs", "Trade secrets"], answer: 1 },
          { id: 5, text: "Which of the following is protected by copyright?", options: ["Software code", "Company logo", "Machine invention", "Brand symbol"], answer: 0 },
          { id: 6, text: "Unauthorized reproduction of a movie is called:", options: ["Patent infringement", "Trademark violation", "Copyright infringement", "Software licensing"], answer: 2 },
          { id: 7, text: "A trademark helps to:", options: ["Protect inventions", "Identify the source of goods or services", "Protect scientific research", "Prevent product manufacturing"], answer: 1 },
          { id: 8, text: "Which symbol indicates a registered trademark?", options: ["TM", "®", "©", "$"], answer: 1 },
          { id: 9, text: "The symbol TM indicates:", options: ["Registered trademark", "Unregistered trademark claim", "Patent registration", "Copyright protection"], answer: 1 },
          { id: 10, text: "A service mark is used to identify:", options: ["Manufactured products", "Business services", "Engineering inventions", "Agricultural products"], answer: 1 },
          { id: 11, text: "A collective mark is mainly used by:", options: ["Government agencies", "Members of an organization", "Individual entrepreneurs", "International companies"], answer: 1 },
          { id: 12, text: "Which of the following is an example of a certification mark?", options: ["Apple logo", "ISI mark", "Nike logo", "Microsoft symbol"], answer: 1 },
          { id: 13, text: "A shape mark protects:", options: ["Product sound", "Product color", "Three-dimensional shape of a product", "Product packaging"], answer: 2 },
          { id: 14, text: "A pattern mark protects:", options: ["Unique decorative patterns", "Company names", "Product price", "Product functions"], answer: 0 },
          { id: 15, text: "A sound mark protects:", options: ["Unique sound associated with a brand", "Product design", "Product packaging", "Manufacturing process"], answer: 0 },
          { id: 16, text: "A patent is granted to protect:", options: ["Creative works", "Inventions", "Brand identity", "Trade secrets"], answer: 1 },
          { id: 17, text: "The standard duration of a patent is:", options: ["10 years", "15 years", "20 years", "30 years"], answer: 2 },
          { id: 18, text: "Patent protection provides the inventor with:", options: ["Shared ownership", "Exclusive rights to use the invention", "Government ownership", "Public access"], answer: 1 },
          { id: 19, text: "Which of the following can be patented?", options: ["Scientific invention", "Movie script", "Music composition", "Brand logo"], answer: 0 },
          { id: 20, text: "Patent information is important for businesses because it:", options: ["Eliminate competition", "Helps develop new innovations", "Reduces technological development", "Prevents research activities"], answer: 1 },
          { id: 21, text: "Patent databases help companies to:", options: ["Copy inventions", "Avoid patent infringement", "Eliminate competitors", "Stop innovation"], answer: 1 },
          { id: 22, text: "Studying patent information helps businesses to:", options: ["Understand competitor technologies", "Reduce product quality", "Eliminate research", "Avoid innovation"], answer: 0 },
          { id: 23, text: "Social issues related to technology mainly include:", options: ["Technical system failures", "Impact of technology on society", "Machine design problems", "Software coding errors"], answer: 1 },
          { id: 24, text: "Engineering issues mainly involve:", options: ["Technical challenges in development", "Social conflicts", "Financial management", "Marketing strategies"], answer: 0 },
          { id: 25, text: "Privacy concerns in digital systems are considered:", options: ["Engineering issue", "Social issue", "Financial issue", "Marketing issue"], answer: 1 },
          { id: 26, text: "The first step in developing a technological solution is:", options: ["Patent registration", "Problem identification", "Product marketing", "Investor funding"], answer: 1 },
          { id: 27, text: "Registering intellectual property rights mainly helps to:", options: ["Increase competition", "Protect innovations from unauthorized use", "Reduce research activities", "Eliminate new inventions"], answer: 1 },
          { id: 28, text: "Which intellectual property right protects brand identity?", options: ["Patent", "Trademark", "Copyright", "Trade secret"], answer: 1 },
          { id: 29, text: "Which intellectual property right protects creative works?", options: ["Patent", "Copyright", "Trademark", "Trade secret"], answer: 1 },
          { id: 30, text: "The main objective of intellectual property protection is to:", options: ["Reduce innovation", "Encourage creativity and technological development", "Limit business competition", "Increase government control"], answer: 1 }
        ]
      },
      {
        id: 'unit3',
        title: 'Unit 3 – Corporate Social Responsibility',
        estimatedTime: 20,
        questions: [
          { id: 1, text: "A startup in India is generally recognized if its age is less than:", options: ["5 years", "7 years", "10 years", "15 years"], answer: 2 },
          { id: 2, text: "The maximum annual turnover for a startup under Startup India is approximately:", options: ["₹10 crore", "₹25 crore", "₹50 crore", "₹100 crore"], answer: 1 },
          { id: 3, text: "Startup India initiative was launched by the Government of India in:", options: ["2014", "2015", "2016", "2018"], answer: 2 },
          { id: 4, text: "The Fund of Funds for Startups is managed by:", options: ["RBI", "SIDBI", "SEBI", "NASSCOM"], answer: 1 },
          { id: 5, text: "Startup India provides tax exemption for startups for:", options: ["1 year", "2 years", "3 years", "5 years"], answer: 2 },
          { id: 6, text: "Startup India allows startups to self-certify compliance with:", options: ["Labour and environmental laws", "Banking laws", "Export laws", "Import regulations"], answer: 0 },
          { id: 7, text: "Which of the following is a major startup resource?", options: ["Knowledge bank", "Agricultural subsidy", "Mining license", "Trade tariff"], answer: 0 },
          { id: 8, text: "Pro-bono services in startup ecosystems provide:", options: ["Paid legal services", "Free professional assistance", "Bank loans", "Government taxes"], answer: 1 },
          { id: 9, text: "Market research reports help startups to:", options: ["Identify market trends", "Increase taxes", "Avoid competition", "Reduce innovation"], answer: 0 },
          { id: 10, text: "Startup networking mainly helps entrepreneurs to:", options: ["Avoid investors", "Build partnerships and funding opportunities", "Reduce collaboration", "Limit market expansion"], answer: 1 },
          { id: 11, text: "A working capital loan is mainly used for:", options: ["Purchasing machinery", "Daily operational expenses", "International trade", "Government taxes"], answer: 1 },
          { id: 12, text: "A term loan is generally used for:", options: ["Business expansion or equipment purchase", "Paying salaries only", "Importing products", "Export licensing"], answer: 0 },
          { id: 13, text: "The MUDRA loan scheme mainly supports:", options: ["Large industries", "Small businesses and micro enterprises", "Multinational corporations", "Government companies"], answer: 1 },
          { id: 14, text: "Under MUDRA scheme, the smallest loan category is:", options: ["Tarun", "Shishu", "Kishore", "Udyam"], answer: 1 },
          { id: 15, text: "The Stand Up India scheme mainly supports:", options: ["Export companies", "SC/ST and women entrepreneurs", "Large industries", "International startups"], answer: 1 },
          { id: 16, text: "The 10,000 Startups initiative was launched by:", options: ["RBI", "NASSCOM", "SEBI", "STPI"], answer: 1 },
          { id: 17, text: "The main goal of the 10,000 Startups initiative is to:", options: ["Increase imports", "Support technology startups", "Reduce entrepreneurship", "Limit innovation"], answer: 1 },
          { id: 18, text: "In the FAME model, the letter “F” stands for:", options: ["Finance", "Fund", "Function", "Framework"], answer: 1 },
          { id: 19, text: "In the FAME model, “M” represents:", options: ["Marketing", "Mentoring", "Management", "Manufacturing"], answer: 1 },
          { id: 20, text: "The Software Technology Parks (STP) scheme promotes:", options: ["Textile exports", "Agricultural production", "Software and IT service exports", "Automobile manufacturing"], answer: 2 },
          { id: 21, text: "The STP scheme is managed by:", options: ["STPI", "RBI", "SEBI", "NASSCOM"], answer: 0 },
          { id: 22, text: "One important benefit of the STP scheme is:", options: ["Duty-free import of equipment", "Export taxes", "Restricted foreign investment", "Limited infrastructure"], answer: 0 },
          { id: 23, text: "A Special Economic Zone (SEZ) is mainly established to:", options: ["Reduce exports", "Promote exports and investment", "Increase import duties", "Limit industrial growth"], answer: 1 },
          { id: 24, text: "Businesses operating in SEZs usually receive:", options: ["High taxes", "Strict regulations", "Tax incentives and better infrastructure", "Limited export opportunities"], answer: 2 },
          { id: 25, text: "The Companies Act 2013 mainly regulates:", options: ["Export promotion", "Company formation and management", "Patent registration", "Environmental protection"], answer: 1 },
          { id: 26, text: "Intellectual property laws help startups to:", options: ["Increase taxes", "Protect innovations and ideas", "Limit business growth", "Reduce technology development"], answer: 1 },
          { id: 27, text: "The SBIR program mainly supports:", options: ["Agricultural development", "Research and innovation in small businesses", "Banking reforms", "Export promotion"], answer: 1 },
          { id: 28, text: "The STTR program focuses on collaboration between:", options: ["Banks and companies", "Startups and research institutions", "Government and exporters", "Manufacturers and traders"], answer: 1 },
          { id: 29, text: "NSF grants mainly support:", options: ["Banking operations", "Scientific research and technological innovation", "Trade regulation", "Import control"], answer: 1 },
          { id: 30, text: "The main objective of research funding programs like SBIR and STTR is to:", options: ["Reduce innovation", "Promote commercialization of research", "Increase taxes", "Eliminate startups"], answer: 1 }
        ]
      }
    ],
    studyMaterials: [
      { id: 'ie-n1', title: 'Unit 1: Ethics Notes', description: 'Comprehensive notes on professional ethics and moral decision making.', fileUrl: '/resources/industrial-ethics/Unit 1.pdf' },
      { id: 'ie-n2', title: 'Unit 2: Professional Ethics', description: 'Detailed guide on intellectual property and corporate ethics.', fileUrl: '/resources/industrial-ethics/Unit 2.pdf' },
      { id: 'ie-n3', title: 'Unit 3: CSR & Startups', description: 'Notes on corporate social responsibility and startup policies in India.', fileUrl: '/resources/industrial-ethics/Unit 3.pdf' }
    ]
  },
  {
    id: 'combinatorial-studies',
    title: 'CSE357: COMBINATORIAL STUDIES',
    locked: false,
    units: [
      {
        id: 'unit-os',
        title: 'Unit 1 – Operating Systems',
        estimatedTime: 20,
        questions: combinatorialStudiesQuestions['unit-os']
      },
      {
        id: 'unit-dbms',
        title: 'Unit 2 – Database Management Systems (DBMS)',
        estimatedTime: 20,
        questions: combinatorialStudiesQuestions['unit-dbms']
      },
      {
        id: 'unit-networking',
        title: 'Unit 3 – Computer Networking',
        estimatedTime: 20,
        questions: combinatorialStudiesQuestions['unit-networking']
      }
    ],
    studyMaterials: [
      { id: 'cs-n1', title: 'Unit 1: Operating Systems', description: 'Fundamental concepts of OS, kernels, and process management.', fileUrl: '/resources/combinatorial/Operating-System-Handwritten-Notes.pdf.pdf' },
      { id: 'cs-n2', title: 'Unit 2: DBMS Notes', description: 'Relational databases, SQL, and normalization techniques.', fileUrl: '/resources/combinatorial/DBMS Handwritten Notes.pdf.pdf' },
      { id: 'cs-n3', title: 'Unit 3: Networking', description: 'OSI model, TCP/IP, and network security essentials.', fileUrl: '/resources/combinatorial/computer network handwritten notes.pdf' }
    ]
  },
  { id: 'data-structures', title: 'Data Structures', locked: true, units: [] },
  { id: 'computer-networks', title: 'Computer Networks', locked: true, units: [] },
  { id: 'operating-systems', title: 'Operating Systems', locked: true, units: [] },
  {
    id: 'mkt-203',
    title: 'MKT 203',
    locked: false,
    type: 'theory',
    units: [
      {
        id: 'mkt203-unit1',
        title: 'Unit I – Introduction to Product Management',
        questions: mkt203Questions['unit1']
      },
      {
        id: 'mkt203-unit2',
        title: 'Unit II – Product Management Decisions',
        questions: mkt203Questions['unit2']
      },
      {
        id: 'mkt203-unit3',
        title: 'Unit III – Marketing Metrics',
        questions: mkt203Questions['unit3']
      }
    ]
  }
];

