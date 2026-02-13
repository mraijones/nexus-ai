insert into ai_employees (id, name, role, description, image, skills, stats, color) values
('eve','Eve','Data Analyst','AI data analyst who uncovers insights, visualizes trends, and helps you make data-driven decisions.','/eve-analyst.png',ARRAY['Data Analysis','Visualization','Reporting','SQL','Dashboards'], '{"tasksCompleted":10200,"satisfaction":97,"responseTime":"< 2 min"}', 'from-cyan-500 to-blue-500'),
('sam','Sam','Customer Support','AI support agent who answers questions, resolves issues, and keeps your customers happy 24/7.','/sam-support.png',ARRAY['Support Tickets','Live Chat','FAQ','Troubleshooting','Feedback'], '{"tasksCompleted":15800,"satisfaction":99,"responseTime":"< 1 min"}', 'from-teal-500 to-blue-400'),
('sophia','Sophia','SEO Specialist','AI SEO expert who optimizes your content, audits your site, and boosts your search rankings.','/sophia-seo.png',ARRAY['SEO Audit','Keyword Research','Content Optimization','Backlinks','Analytics'], '{"tasksCompleted":8900,"satisfaction":96,"responseTime":"< 2 min"}', 'from-green-400 to-blue-600'),
('mia','Mia','Social Media Manager','AI social media manager who schedules posts, engages your audience, and analyzes performance.','/mia-social.png',ARRAY['Scheduling','Engagement','Analytics','Content Creation','Brand Voice'], '{"tasksCompleted":11200,"satisfaction":98,"responseTime":"< 1 min"}', 'from-pink-500 to-yellow-500'),
('paul','Paul','Project Manager','AI project manager who tracks tasks, deadlines, and team progress to keep you on schedule.','/paul-pm.png',ARRAY['Task Tracking','Scheduling','Reminders','Team Coordination','Reporting'], '{"tasksCompleted":9700,"satisfaction":97,"responseTime":"< 2 min"}', 'from-yellow-500 to-orange-500'),
('quinn','Quinn','QA Tester','AI QA tester who reviews code, tests features, and reports bugs to ensure quality.','/quinn-qa.png',ARRAY['Testing','Bug Reports','Regression','Automation','Documentation'], '{"tasksCompleted":8300,"satisfaction":98,"responseTime":"< 1 min"}', 'from-gray-500 to-blue-700'),
('riley','Riley','Sales Assistant','AI sales assistant who generates leads, drafts outreach, and manages your CRM.','/riley-sales.png',ARRAY['Lead Gen','CRM','Outreach','Follow-up','Reporting'], '{"tasksCompleted":7600,"satisfaction":97,"responseTime":"< 2 min"}', 'from-red-500 to-pink-600'),
('harper','Harper','HR Assistant','AI HR assistant who screens resumes, schedules interviews, and answers HR questions.','/harper-hr.png',ARRAY['Screening','Scheduling','Interviewing','HR Policy','Onboarding'], '{"tasksCompleted":6900,"satisfaction":96,"responseTime":"< 2 min"}', 'from-purple-400 to-pink-400'),
('luna','Luna','Legal Assistant','AI legal assistant who drafts contracts, reviews documents, and summarizes legal info.','/luna-legal.png',ARRAY['Contracts','Document Review','Summaries','Compliance','Research'], '{"tasksCompleted":5400,"satisfaction":97,"responseTime":"< 2 min"}', 'from-blue-800 to-gray-600'),
('finley','Finley','Finance Assistant','AI finance assistant who tracks expenses, generates invoices, and summarizes financial data.','/finley-finance.png',ARRAY['Expenses','Invoices','Summaries','Budgeting','Reporting'], '{"tasksCompleted":6100,"satisfaction":98,"responseTime":"< 2 min"}', 'from-green-700 to-blue-900'),
('sage','Sage','Researcher','AI researcher who gathers information, summarizes articles, and creates research briefs.','/sage-research.png',ARRAY['Research','Summarization','Briefs','Fact-Checking','Analysis'], '{"tasksCompleted":7200,"satisfaction":97,"responseTime":"< 2 min"}', 'from-indigo-500 to-blue-400'),
('taylor','Taylor','Translator','AI translator who translates text between languages and localizes your content.','/taylor-translator.png',ARRAY['Translation','Localization','Proofreading','Multilingual','Editing'], '{"tasksCompleted":6800,"satisfaction":98,"responseTime":"< 2 min"}', 'from-yellow-400 to-green-400')
on conflict (id) do update set
	name = excluded.name,
	role = excluded.role,
	description = excluded.description,
	image = excluded.image,
	skills = excluded.skills,
	stats = excluded.stats,
	color = excluded.color;
