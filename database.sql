CREATE DATABASE IF NOT EXISTS bioboost_db;
USE bioboost_db;

CREATE TABLE IF NOT EXISTS blogs (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    read_time INT NOT NULL,
    image VARCHAR(500),
    excerpt TEXT,
    content LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Note: In a real system, passwords must be hashed. For this simple setup,
-- we'll hardcode an admin password in the PHP file for ease of initial deployment.
-- But you can also create an 'admins' table if needed later.

-- Insert Seed Data
INSERT IGNORE INTO blogs (id, title, category, read_time, image, excerpt, content) VALUES
('seed-1', 'The Psychology of a High-Converting LinkedIn Hook', 'Content Strategy', 5, 'linkedin_logo.png', 'Why the first sentence of your post matters more than the rest of it combined.', 'Writing a great hook is 90% of the battle. Your LinkedIn profile isn''t a resume. It''s a landing page. And like any landing page, it has one job: convert visitors into action-takers.\n\nHere''s the thing: recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.\n\n<h2>1. What Do You Actually Do?</h2>\nYour headline is the most valuable real estate on LinkedIn. Stop wasting it with just your job title. Instead, use this formula:\n<blockquote>[Role] | [Key skill] + [Who you help] | [Proof or differentiator]</blockquote>\n\n<h2>2. Why Should Someone Care?</h2>\nYour About section should read like a conversation, not a cover letter. Lead with a hook, share your unique angle, and end with a clear CTA.'),
('seed-2', 'Why Resumes Are Dying (And What to Build Instead)', 'Career Growth', 4, 'career_growth.png', 'The modern job market cares less about your PDF and more about your digital footprint.', 'Your digital footprint is your new resume... Your LinkedIn profile isn''t a resume. It''s a landing page. And like any landing page, it has one job: convert visitors into action-takers.\n\nHere''s the thing: recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.\n\n<h2>1. What Do You Actually Do?</h2>\nYour headline is the most valuable real estate on LinkedIn. Stop wasting it with just your job title. Instead, use this formula:\n<blockquote>[Role] | [Key skill] + [Who you help] | [Proof or differentiator]</blockquote>\n\n<h2>2. Why Should Someone Care?</h2>\nYour About section should read like a conversation, not a cover letter. Lead with a hook, share your unique angle, and end with a clear CTA.');
