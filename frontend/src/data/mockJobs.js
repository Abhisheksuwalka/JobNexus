// Mock job data for frontend testing
// This simulates what would come from the backend API

const companies = [
  { _id: "c1", name: "Google", logo: "https://logo.clearbit.com/google.com", location: "Bangalore" },
  { _id: "c2", name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", location: "Hyderabad" },
  { _id: "c3", name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", location: "Bangalore" },
  { _id: "c4", name: "Meta", logo: "https://logo.clearbit.com/meta.com", location: "Gurgaon" },
  { _id: "c5", name: "Apple", logo: "https://logo.clearbit.com/apple.com", location: "Hyderabad" },
  { _id: "c6", name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", location: "Mumbai" },
  { _id: "c7", name: "Flipkart", logo: "https://logo.clearbit.com/flipkart.com", location: "Bangalore" },
  { _id: "c8", name: "Swiggy", logo: "https://logo.clearbit.com/swiggy.com", location: "Bangalore" },
  { _id: "c9", name: "Zomato", logo: "https://logo.clearbit.com/zomato.com", location: "Gurgaon" },
  { _id: "c10", name: "Paytm", logo: "https://logo.clearbit.com/paytm.com", location: "Noida" },
  { _id: "c11", name: "Uber", logo: "https://logo.clearbit.com/uber.com", location: "Bangalore" },
  { _id: "c12", name: "Ola", logo: "https://logo.clearbit.com/olacabs.com", location: "Bangalore" },
  { _id: "c13", name: "Razorpay", logo: "https://logo.clearbit.com/razorpay.com", location: "Bangalore" },
  { _id: "c14", name: "PhonePe", logo: "https://logo.clearbit.com/phonepe.com", location: "Bangalore" },
  { _id: "c15", name: "Atlassian", logo: "https://logo.clearbit.com/atlassian.com", location: "Bangalore" },
  { _id: "c16", name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", location: "Noida" },
  { _id: "c17", name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", location: "Hyderabad" },
  { _id: "c18", name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", location: "Bangalore" },
  { _id: "c19", name: "Infosys", logo: "https://logo.clearbit.com/infosys.com", location: "Bangalore" },
  { _id: "c20", name: "TCS", logo: "https://logo.clearbit.com/tcs.com", location: "Mumbai" },
  { _id: "c21", name: "Wipro", logo: "https://logo.clearbit.com/wipro.com", location: "Bangalore" },
  { _id: "c22", name: "Accenture", logo: "https://logo.clearbit.com/accenture.com", location: "Bangalore" },
  { _id: "c23", name: "Deloitte", logo: "https://logo.clearbit.com/deloitte.com", location: "Mumbai" },
  { _id: "c24", name: "McKinsey", logo: "https://logo.clearbit.com/mckinsey.com", location: "Delhi" },
  { _id: "c25", name: "Goldman Sachs", logo: "https://logo.clearbit.com/goldmansachs.com", location: "Bangalore" },
];

const jobTitles = [
  { title: "Frontend Developer", skills: ["React", "JavaScript", "CSS", "HTML", "TypeScript"] },
  { title: "Backend Developer", skills: ["Node.js", "Python", "Java", "SQL", "MongoDB"] },
  { title: "Full Stack Developer", skills: ["React", "Node.js", "MongoDB", "AWS", "Docker"] },
  { title: "Software Engineer", skills: ["DSA", "System Design", "Python", "Java", "C++"] },
  { title: "Senior Software Engineer", skills: ["Architecture", "Microservices", "Kubernetes", "AWS"] },
  { title: "Data Scientist", skills: ["Python", "ML", "TensorFlow", "SQL", "Statistics"] },
  { title: "Data Analyst", skills: ["SQL", "Excel", "Python", "Tableau", "Power BI"] },
  { title: "Machine Learning Engineer", skills: ["Python", "PyTorch", "TensorFlow", "MLOps", "AWS"] },
  { title: "DevOps Engineer", skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Terraform"] },
  { title: "Cloud Engineer", skills: ["AWS", "Azure", "GCP", "Terraform", "Linux"] },
  { title: "UI/UX Designer", skills: ["Figma", "Adobe XD", "User Research", "Prototyping"] },
  { title: "Product Manager", skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"] },
  { title: "Mobile Developer", skills: ["React Native", "Flutter", "iOS", "Android", "Kotlin"] },
  { title: "iOS Developer", skills: ["Swift", "Objective-C", "Xcode", "UIKit", "SwiftUI"] },
  { title: "Android Developer", skills: ["Kotlin", "Java", "Android SDK", "Jetpack Compose"] },
  { title: "QA Engineer", skills: ["Selenium", "Cypress", "Jest", "Manual Testing", "API Testing"] },
  { title: "Security Engineer", skills: ["Penetration Testing", "SIEM", "Firewalls", "Cryptography"] },
  { title: "Blockchain Developer", skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"] },
  { title: "AI Engineer", skills: ["LLMs", "NLP", "Computer Vision", "Python", "Transformers"] },
  { title: "Technical Lead", skills: ["Leadership", "Architecture", "Code Review", "Mentoring"] },
];

const jobTypes = ["Full-time", "Part-time", "Internship", "Contract"];
const locations = ["Bangalore", "Hyderabad", "Mumbai", "Delhi", "Gurgaon", "Noida", "Pune", "Chennai", "Remote"];
const experienceLevels = ["0-1", "1-3", "3-5", "5-8", "8+"];

const descriptions = [
  "We are looking for a passionate developer to join our growing team. You will work on cutting-edge technologies and solve complex problems that impact millions of users.",
  "Join our innovative team and help build scalable solutions. You'll collaborate with talented engineers and contribute to products used by people worldwide.",
  "Exciting opportunity to work with a fast-paced startup. We offer competitive compensation, flexible work hours, and a dynamic work environment.",
  "Be part of a world-class engineering team. You'll have the opportunity to learn, grow, and make a significant impact on our products.",
  "We're looking for someone who is passionate about technology and loves solving challenging problems. Great company culture and growth opportunities.",
  "Work on high-impact projects with visibility across the organization. We value innovation, collaboration, and continuous learning.",
  "Join us to build the future of technology. We offer a supportive environment, mentorship programs, and excellent career growth.",
  "Looking for a self-motivated individual who can thrive in a fast-paced environment. Remote-friendly with flexible working hours.",
  "Opportunity to work with the latest technologies and frameworks. We believe in work-life balance and employee well-being.",
  "Be part of a diverse and inclusive team. We celebrate different perspectives and believe in empowering our employees.",
];

function getRandomDate(daysAgo) {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo));
  return date.toISOString();
}

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomSalary(jobType, experience) {
  if (jobType === "Internship") {
    return Math.floor(Math.random() * 6 + 3); // 3-8 LPA (stipend annualized)
  }
  const base = experience === "0-1" ? 4 : experience === "1-3" ? 8 : experience === "3-5" ? 15 : experience === "5-8" ? 25 : 40;
  return Math.floor(base + Math.random() * base * 0.8);
}

function generateMockJobs(count = 250) {
  const jobs = [];
  
  for (let i = 0; i < count; i++) {
    const company = getRandomElement(companies);
    const jobInfo = getRandomElement(jobTitles);
    const jobType = getRandomElement(jobTypes);
    const experience = getRandomElement(experienceLevels);
    const location = getRandomElement(locations);
    
    jobs.push({
      _id: `job_${i + 1}`,
      title: jobInfo.title,
      description: getRandomElement(descriptions),
      requirements: jobInfo.skills.slice(0, Math.floor(Math.random() * 3) + 2).join(", "),
      salary: getRandomSalary(jobType, experience),
      experience: parseInt(experience.split("-")[0]) || 0,
      location: location,
      jobType: jobType,
      position: Math.floor(Math.random() * 5) + 1,
      company: company,
      created_by: "recruiter_1",
      applications: [],
      skills: jobInfo.skills,
      createdAt: getRandomDate(30),
      updatedAt: getRandomDate(10),
    });
  }
  
  return jobs;
}

export const mockJobs = generateMockJobs(250);
export const mockCompanies = companies;

export default mockJobs;
