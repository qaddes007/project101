-- BioBoost AI — PostgreSQL Schema for Neon
-- Run this in the Neon SQL Editor after creating your database.
-- Dashboard → SQL Editor → paste this → Run

-- Create the blogs table
CREATE TABLE IF NOT EXISTS blogs (
    id          VARCHAR(50)  PRIMARY KEY,
    title       VARCHAR(255) NOT NULL,
    category    VARCHAR(100) NOT NULL,
    read_time   INTEGER      NOT NULL DEFAULT 5,
    image       VARCHAR(500),
    excerpt     TEXT,
    content     TEXT,
    created_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- Seed data (2 starter blog posts)
-- Uses INSERT ... ON CONFLICT DO NOTHING to be idempotent (safe to run multiple times)
INSERT INTO blogs (id, title, category, read_time, image, excerpt, content)
VALUES
(
    'seed-1',
    'The Psychology of a High-Converting LinkedIn Hook',
    'Content Strategy',
    5,
    'linkedin_logo.png',
    'Why the first sentence of your post matters more than the rest of it combined.',
    '<p>Writing a great hook is 90% of the battle. Your LinkedIn profile isn''t a resume. It''s a landing page. And like any landing page, it has one job: convert visitors into action-takers.</p>
<p>Here''s the thing: recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.</p>
<h2>1. What Do You Actually Do?</h2>
<p>Your headline is the most valuable real estate on LinkedIn. Stop wasting it with just your job title. Instead, use this formula:</p>
<blockquote>[Role] | [Key skill] + [Who you help] | [Proof or differentiator]</blockquote>
<h2>2. Why Should Someone Care?</h2>
<p>Your About section should read like a conversation, not a cover letter. Lead with a hook, share your unique angle, and end with a clear CTA.</p>'
),
(
    'seed-2',
    'Why Resumes Are Dying (And What to Build Instead)',
    'Career Growth',
    4,
    'career_growth.png',
    'The modern job market cares less about your PDF and more about your digital footprint.',
    '<p>Your digital footprint is your new resume. Recruiters and hiring managers are checking your LinkedIn the moment your name hits their radar.</p>
<p>If your last update was 3 years ago and your headline says "Open to new opportunities," you are essentially invisible in a high-demand market.</p>
<h2>Focus on Proof of Work</h2>
<p>Stop listing responsibilities. Start listing achievements. Instead of "Responsible for managing a team," try "Led a team of 12 that increased deployment frequency by 40%."</p>
<h2>Build Your Digital Presence</h2>
<p>A strong LinkedIn profile, an active presence on relevant communities, and a portfolio that shows your thinking process — these compound over time in ways a resume never can.</p>'
)
ON CONFLICT (id) DO NOTHING;
