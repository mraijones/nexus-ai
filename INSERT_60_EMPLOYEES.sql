-- SQL INSERT statements for all 60 AI Employees
-- Copy and paste this entire file into your Supabase SQL Editor

-- First, let's make sure the ai_employees table exists with the right structure
-- (This should already be created, but just in case)

-- Insert all 60 employees
INSERT INTO ai_employees (id, name, role, description, skills, stats, color) VALUES

-- TIER 1 - Entry Level (15 employees)
('t1-social-media', 'Social Media Assistant', 'Social Media Assistant', 'Schedules posts, engages with followers, and manages basic social media tasks', ARRAY['Social Media Management','Content Scheduling','Community Engagement','Analytics'], '{"tier":1,"pricing":150,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-email-support', 'Email Support Specialist', 'Email Support Specialist', 'Handles customer inquiries via email with quick, helpful responses', ARRAY['Email Support','Customer Service','Ticketing Systems','Communication'], '{"tier":1,"pricing":150,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-data-entry', 'Data Entry Clerk', 'Data Entry Clerk', 'Accurately inputs data into systems with speed and precision', ARRAY['Data Entry','Excel','CRM Systems','Attention to Detail'], '{"tier":1,"pricing":160,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-appointment-scheduler', 'Appointment Scheduler', 'Appointment Scheduler', 'Manages calendars and schedules appointments efficiently', ARRAY['Calendar Management','Scheduling Software','Time Zone Coordination','Communication'], '{"tier":1,"pricing":170,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-chat-support', 'Live Chat Support', 'Live Chat Support', 'Provides real-time chat support to website visitors', ARRAY['Live Chat','Customer Service','Product Knowledge','Multitasking'], '{"tier":1,"pricing":180,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-transcription', 'Transcriptionist', 'Transcriptionist', 'Transcribes audio and video content into text', ARRAY['Transcription','Typing','Audio Processing','Documentation'], '{"tier":1,"pricing":190,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-research-assistant', 'Research Assistant', 'Research Assistant', 'Conducts basic research and gathers information', ARRAY['Research','Information Gathering','Summarization','Fact-Checking'], '{"tier":1,"pricing":200,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-blog-writer', 'Blog Content Writer', 'Blog Content Writer', 'Writes blog posts and web content', ARRAY['Content Writing','SEO','Blogging','Copywriting'], '{"tier":1,"pricing":210,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-social-monitor', 'Social Media Monitor', 'Social Media Monitor', 'Monitors social media mentions and brand reputation', ARRAY['Social Listening','Monitoring Tools','Sentiment Analysis','Reporting'], '{"tier":1,"pricing":220,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-email-marketing', 'Email Campaign Assistant', 'Email Campaign Assistant', 'Assists with email marketing campaigns', ARRAY['Email Marketing','Mailchimp','Template Design','A/B Testing'], '{"tier":1,"pricing":230,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-product-lister', 'Product Listing Specialist', 'Product Listing Specialist', 'Creates and manages product listings on e-commerce platforms', ARRAY['E-commerce','Product Descriptions','SEO','Inventory Management'], '{"tier":1,"pricing":240,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-invoice-processor', 'Invoice Processor', 'Invoice Processor', 'Processes invoices and payment documentation', ARRAY['Invoicing','Accounting Software','Payment Processing','Record Keeping'], '{"tier":1,"pricing":250,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-survey-analyst', 'Survey Data Analyst', 'Survey Data Analyst', 'Analyzes survey results and compiles reports', ARRAY['Data Analysis','Survey Tools','Excel','Reporting'], '{"tier":1,"pricing":260,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-file-organizer', 'Digital File Organizer', 'Digital File Organizer', 'Organizes and maintains digital file systems', ARRAY['File Management','Cloud Storage','Organization','Document Control'], '{"tier":1,"pricing":270,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),
('t1-qc-tester', 'Quality Control Tester', 'Quality Control Tester', 'Tests products and processes for quality assurance', ARRAY['QA Testing','Bug Tracking','Test Cases','Documentation'], '{"tier":1,"pricing":280,"availability":"24/7","authorityLevel":"Low"}', 'from-blue-400 to-cyan-400'),

-- TIER 2 - Professional (20 employees)
('t2-content-strategist', 'Content Strategist', 'Content Strategist', 'Develops content strategies and editorial calendars', ARRAY['Content Strategy','Editorial Planning','SEO','Analytics'], '{"tier":2,"pricing":350,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-copywriter', 'Senior Copywriter', 'Senior Copywriter', 'Writes persuasive copy for ads, landing pages, and campaigns', ARRAY['Copywriting','Conversion Optimization','Marketing','Brand Voice'], '{"tier":2,"pricing":380,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-graphic-designer', 'Graphic Designer', 'Graphic Designer', 'Creates visual designs for marketing and branding', ARRAY['Graphic Design','Adobe Creative Suite','Branding','Visual Design'], '{"tier":2,"pricing":400,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-video-editor', 'Video Editor', 'Video Editor', 'Edits and produces video content', ARRAY['Video Editing','Final Cut Pro','Motion Graphics','Audio Editing'], '{"tier":2,"pricing":420,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-seo-specialist', 'SEO Specialist', 'SEO Specialist', 'Optimizes websites for search engine rankings', ARRAY['SEO','Google Analytics','Keyword Research','Link Building'], '{"tier":2,"pricing":440,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-ppc-manager', 'PPC Campaign Manager', 'PPC Campaign Manager', 'Manages paid advertising campaigns', ARRAY['PPC','Google Ads','Facebook Ads','Campaign Optimization'], '{"tier":2,"pricing":460,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-crm-specialist', 'CRM Specialist', 'CRM Specialist', 'Manages customer relationship management systems', ARRAY['CRM Systems','Salesforce','Automation','Data Management'], '{"tier":2,"pricing":480,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-web-developer', 'Web Developer', 'Web Developer', 'Develops and maintains websites', ARRAY['HTML/CSS','JavaScript','WordPress','Responsive Design'], '{"tier":2,"pricing":500,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-data-analyst', 'Data Analyst', 'Data Analyst', 'Analyzes business data and provides insights', ARRAY['Data Analysis','SQL','Tableau','Statistics'], '{"tier":2,"pricing":520,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-sales-coordinator', 'Sales Coordinator', 'Sales Coordinator', 'Coordinates sales activities and manages pipeline', ARRAY['Sales','CRM','Pipeline Management','Lead Qualification'], '{"tier":2,"pricing":540,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-hr-coordinator', 'HR Coordinator', 'HR Coordinator', 'Handles HR tasks including recruitment and onboarding', ARRAY['HR Management','Recruitment','Onboarding','HRIS'], '{"tier":2,"pricing":560,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-bookkeeper', 'Bookkeeper', 'Bookkeeper', 'Manages financial records and transactions', ARRAY['Bookkeeping','QuickBooks','Accounting','Financial Reporting'], '{"tier":2,"pricing":580,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-project-coordinator', 'Project Coordinator', 'Project Coordinator', 'Coordinates projects and tracks progress', ARRAY['Project Management','Asana','Agile','Communication'], '{"tier":2,"pricing":600,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-ui-designer', 'UI/UX Designer', 'UI/UX Designer', 'Designs user interfaces and experiences', ARRAY['UI Design','UX Design','Figma','User Research'], '{"tier":2,"pricing":550,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-email-marketer', 'Email Marketing Manager', 'Email Marketing Manager', 'Manages comprehensive email marketing campaigns', ARRAY['Email Marketing','Marketing Automation','Segmentation','Analytics'], '{"tier":2,"pricing":470,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-technical-writer', 'Technical Writer', 'Technical Writer', 'Creates technical documentation and guides', ARRAY['Technical Writing','Documentation','API Documentation','Content Management'], '{"tier":2,"pricing":490,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-community-manager', 'Community Manager', 'Community Manager', 'Builds and manages online communities', ARRAY['Community Management','Social Media','Moderation','Event Planning'], '{"tier":2,"pricing":430,"availability":"24/7","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-product-manager', 'Junior Product Manager', 'Junior Product Manager', 'Assists with product development and roadmap', ARRAY['Product Management','Roadmapping','User Stories','Analytics'], '{"tier":2,"pricing":590,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-business-analyst', 'Business Analyst', 'Business Analyst', 'Analyzes business processes and recommends improvements', ARRAY['Business Analysis','Process Improvement','Requirements Gathering','Modeling'], '{"tier":2,"pricing":570,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),
('t2-customer-success', 'Customer Success Manager', 'Customer Success Manager', 'Ensures customer satisfaction and retention', ARRAY['Customer Success','Onboarding','Training','Retention'], '{"tier":2,"pricing":510,"availability":"Business Hours","authorityLevel":"Medium"}', 'from-purple-500 to-pink-500'),

-- TIER 3 - Advanced/Senior (17 employees)
('t3-marketing-director', 'Marketing Director', 'Marketing Director', 'Leads marketing strategy and team coordination', ARRAY['Marketing Strategy','Team Leadership','Budget Management','Analytics'], '{"tier":3,"pricing":750,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-sales-manager', 'Sales Manager', 'Sales Manager', 'Manages sales team and drives revenue', ARRAY['Sales Management','Team Leadership','Negotiation','CRM'], '{"tier":3,"pricing":800,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-creative-director', 'Creative Director', 'Creative Director', 'Leads creative vision and brand strategy', ARRAY['Creative Direction','Brand Strategy','Design Leadership','Vision'], '{"tier":3,"pricing":850,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-product-director', 'Product Director', 'Product Director', 'Oversees product strategy and development', ARRAY['Product Strategy','Product Management','Leadership','Roadmapping'], '{"tier":3,"pricing":900,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-operations-manager', 'Operations Manager', 'Operations Manager', 'Optimizes business operations and processes', ARRAY['Operations Management','Process Optimization','Team Leadership','Efficiency'], '{"tier":3,"pricing":780,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-technology-lead', 'Technology Lead', 'Technology Lead', 'Leads technical architecture and development', ARRAY['Software Architecture','Team Leadership','Code Review','DevOps'], '{"tier":3,"pricing":950,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-finance-manager', 'Finance Manager', 'Finance Manager', 'Manages financial planning and analysis', ARRAY['Financial Management','FP&A','Budgeting','Financial Reporting'], '{"tier":3,"pricing":820,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-hr-director', 'HR Director', 'HR Director', 'Leads human resources and people strategy', ARRAY['HR Leadership','Talent Management','Compliance','People Strategy'], '{"tier":3,"pricing":770,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-data-scientist', 'Senior Data Scientist', 'Senior Data Scientist', 'Builds predictive models and advanced analytics', ARRAY['Machine Learning','Python','Statistics','Data Science'], '{"tier":3,"pricing":920,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-security-architect', 'Security Architect', 'Security Architect', 'Designs and implements security infrastructure', ARRAY['Security Architecture','Cybersecurity','Compliance','Risk Management'], '{"tier":3,"pricing":980,"availability":"24/7","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-legal-counsel', 'Legal Counsel', 'Legal Counsel', 'Provides legal guidance and contract review', ARRAY['Corporate Law','Contract Law','Compliance','Risk Management'], '{"tier":3,"pricing":890,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-brand-manager', 'Brand Manager', 'Brand Manager', 'Manages brand identity and positioning', ARRAY['Brand Management','Brand Strategy','Marketing','Creative Direction'], '{"tier":3,"pricing":740,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-growth-hacker', 'Growth Hacker', 'Growth Hacker', 'Drives rapid user growth and experimentation', ARRAY['Growth Hacking','Experimentation','Analytics','Marketing'], '{"tier":3,"pricing":880,"availability":"24/7","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-customer-director', 'Customer Experience Director', 'Customer Experience Director', 'Oversees entire customer experience', ARRAY['Customer Experience','Team Leadership','Support Operations','Analytics'], '{"tier":3,"pricing":790,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-partnership-manager', 'Partnership Manager', 'Partnership Manager', 'Develops and manages strategic partnerships', ARRAY['Business Development','Negotiation','Relationship Management','Strategy'], '{"tier":3,"pricing":830,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-automation-architect', 'Automation Architect', 'Automation Architect', 'Designs and implements business automation', ARRAY['Process Automation','Integration','Workflow Design','APIs'], '{"tier":3,"pricing":910,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),
('t3-content-director', 'Content Director', 'Content Director', 'Leads content strategy across all channels', ARRAY['Content Strategy','Team Leadership','Editorial','Multi-channel Marketing'], '{"tier":3,"pricing":760,"availability":"Business Hours","authorityLevel":"High"}', 'from-orange-500 to-red-500'),

-- TIER 4 - Executive/Strategic (8 named personas)
('t4-heather', 'Heather', 'Chief Strategy Officer', 'Executive-level strategist who defines company direction', ARRAY['Strategic Planning','Executive Leadership','Business Strategy','Vision Setting'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Heather"}', 'from-cyan-500 to-pink-500'),
('t4-gary', 'Gary', 'Chief Technology Officer', 'Executive technology leader driving innovation', ARRAY['Technology Leadership','Software Architecture','Innovation','Team Building'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Gary"}', 'from-cyan-500 to-pink-500'),
('t4-kierra', 'Kierra', 'Chief Legal Officer', 'Executive legal counsel managing all legal matters', ARRAY['Corporate Law','Compliance','Risk Management','Executive Leadership'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Kierra"}', 'from-cyan-500 to-pink-500'),
('t4-brian', 'Brian', 'Chief Financial Officer', 'Executive financial leader managing all financial operations', ARRAY['Financial Management','Strategic Finance','FP&A','Executive Leadership'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Brian"}', 'from-cyan-500 to-pink-500'),
('t4-kahlynn', 'Kahlynn', 'Chief Marketing Officer', 'Executive marketing leader driving brand and growth', ARRAY['Marketing Strategy','Brand Leadership','Team Management','Growth Strategy'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Kahlynn"}', 'from-cyan-500 to-pink-500'),
('t4-jordan', 'Jordan', 'Chief Operating Officer', 'Executive operations leader optimizing all operations', ARRAY['Operations Management','Executive Leadership','Process Optimization','Team Building'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Jordan"}', 'from-cyan-500 to-pink-500'),
('t4-nathan', 'Nathan', 'Chief Revenue Officer', 'Executive revenue leader driving all revenue streams', ARRAY['Revenue Strategy','Sales Leadership','Marketing Leadership','Growth Strategy'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Nathan"}', 'from-cyan-500 to-pink-500'),
('t4-premium-male', 'Marcus', 'Chief People Officer', 'Executive HR leader managing culture and talent', ARRAY['HR Leadership','Culture Building','Talent Management','Organizational Development'], '{"tier":4,"pricing":1299,"availability":"Business Hours","authorityLevel":"Executive","persona":"Marcus"}', 'from-cyan-500 to-pink-500')

ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  role = EXCLUDED.role,
  description = EXCLUDED.description,
  skills = EXCLUDED.skills,
  stats = EXCLUDED.stats,
  color = EXCLUDED.color;

-- Verify the insert
SELECT tier, COUNT(*) as count 
FROM (
  SELECT (stats->>'tier')::int as tier 
  FROM ai_employees
) t
GROUP BY tier
ORDER BY tier;

-- Should show:
-- Tier 1: 15 employees
-- Tier 2: 20 employees
-- Tier 3: 17 employees
-- Tier 4: 8 employees
-- Total: 60 employees
