/* ========================================
   BioBoost AI — Complete Application JS
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Generator form
    const form = document.getElementById('brandForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            generateBrandingKit();
        });
    }

    // Contact form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactSubmit();
        });
    }

    // Mobile menu
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');
    const navBackdrop = document.getElementById('navBackdrop');
    
    function closeMenu() {
        mobileBtn.classList.remove('open');
        mainNav.classList.remove('open');
        if (navBackdrop) navBackdrop.classList.remove('open');
        document.body.style.overflow = '';
    }

    if (mobileBtn && mainNav) {
        mobileBtn.addEventListener('click', () => {
            const isOpen = mainNav.classList.contains('open');
            if (isOpen) {
                closeMenu();
            } else {
                mobileBtn.classList.add('open');
                mainNav.classList.add('open');
                if (navBackdrop) navBackdrop.classList.add('open');
                document.body.style.overflow = 'hidden';
            }
        });
        
        // Close on link click
        mainNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
        
        // Close on backdrop click
        if (navBackdrop) {
            navBackdrop.addEventListener('click', closeMenu);
        }
    }

    // Platform Tabs
    const tabs = document.querySelectorAll('.platform-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const target = tab.getAttribute('data-target');
            document.querySelectorAll('.output-content-group').forEach(grp => {
                grp.classList.remove('active');
            });
            document.getElementById(target).classList.add('active');
        });
    });

    // Animate stats counter
    animateCounters();

    // Scroll animations
    observeAnimations();

    // Initialize dynamic blog if on blog page
    if (document.getElementById('dynamicBlogGrid')) {
        initBlogPage();
    }
});

/* ========================================
   Counter Animation
   ======================================== */

function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const step = Math.ceil(target / 30);
        const interval = setInterval(() => {
            current += step;
            if (current >= target) {
                counter.textContent = target + '+';
                clearInterval(interval);
            } else {
                counter.textContent = current;
            }
        }, 50);
    });
}

/* ========================================
   Scroll Animations Observer
   ======================================== */

function observeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.feature-card, .step-card, .testimonial-card, .blog-card, .blog-featured, .info-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}

// Add visible class styles dynamically
const style = document.createElement('style');
style.textContent = `.visible { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

/* ========================================
   Brand Transformation Typing Animation
   ======================================== */

(function() {
    const beforeText = "Passionate and hardworking software developer with experience in various programming languages. Team player who loves to learn new things and solve problems. Looking for new opportunities.";
    const afterHeadlineText = "Senior Software Engineer | React & Node.js | Building scalable systems that handle 10M+ users";
    const afterText = "I build backend systems and user interfaces that teams actually rely on.\n\n→ React, Node.js, TypeScript — applied to real products, not tutorials\n→ Reduced API response times by 60% at my last role\n→ I think most engineering interviews are broken. Let's talk about what I've shipped instead.\n\n📩 Open to senior engineering roles. Let's connect.";

    let hasPlayed = false;

    function typeText(element, text, speed, cursorClass, callback) {
        let i = 0;
        element.innerHTML = '';
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor ' + cursorClass;
        element.appendChild(cursor);

        function type() {
            if (i < text.length) {
                const char = text.charAt(i);
                if (char === '\n') {
                    element.insertBefore(document.createElement('br'), cursor);
                } else {
                    element.insertBefore(document.createTextNode(char), cursor);
                }
                i++;
                setTimeout(type, speed);
            } else {
                if (callback) callback();
            }
        }
        type();
    }

    function startTransformAnimation() {
        if (hasPlayed) return;
        hasPlayed = true;

        const beforeBio = document.getElementById('beforeBio');
        const afterHeadline = document.getElementById('afterHeadline');
        const afterBio = document.getElementById('afterBio');

        if (!beforeBio || !afterBio) return;

        // Type the "before" bio first
        typeText(beforeBio, beforeText, 18, 'before-cursor', () => {
            // Short pause, then type the "after" headline
            setTimeout(() => {
                typeText(afterHeadline, afterHeadlineText, 20, 'after-cursor', () => {
                    // Then type the "after" bio
                    setTimeout(() => {
                        typeText(afterBio, afterText, 14, 'after-cursor', null);
                    }, 300);
                });
            }, 600);
        });
    }

    // Trigger on scroll into view
    const transformSection = document.getElementById('transformDemo');
    if (transformSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startTransformAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(transformSection);
    }
})();

/* ========================================
   FAQ Accordion
   ======================================== */

function toggleFaq(btn) {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) {
        item.classList.add('open');
    }
}

/* ========================================
   Contact Form
   ======================================== */

function handleContactSubmit() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('contactSubmitBtn');
    
    // Collect data
    const name = document.getElementById('contactName')?.value.trim();
    const email = document.getElementById('contactEmail')?.value.trim();
    const subject = document.getElementById('contactSubject')?.value || 'General Inquiry';
    const message = document.getElementById('contactMessage')?.value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields.');
        return;
    }

    if (!email.includes('@') || !email.includes('.')) {
        alert('Please enter a valid email address.');
        return;
    }

    btn.classList.add('loading');
    btn.disabled = true;
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner-small"></span> Sending...';

    // SECURITY: Sending to real backend
    fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message })
    })
    .then(async res => {
        const data = await res.json();
        if (res.ok) {
            form.style.display = 'none';
            document.getElementById('contactSuccess').style.display = 'block';
        } else {
            alert('Error: ' + (data.error || 'Server error sending message.'));
        }
    })
    .catch(err => {
        console.error('Fetch error:', err);
        alert('Could not connect to the server. Please check your PHP configuration.');
    })
    .finally(() => {
        btn.classList.remove('loading');
        btn.disabled = false;
        btn.innerHTML = originalText;
    });
}

function resetContactForm() {
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('contactSuccess').style.display = 'none';
}

/* ========================================
   Blog Filters
   ======================================== */

function filterPosts(category, btn) {
    // Update active button
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Filter cards
    const cards = document.querySelectorAll('.blog-card');
    const featured = document.querySelector('.blog-featured');

    cards.forEach(card => {
        const cats = card.getAttribute('data-category') || '';
        if (category === 'all' || cats.includes(category)) {
            card.classList.remove('hidden');
            card.style.animation = 'cardSlideIn 0.4s ease-out both';
        } else {
            card.classList.add('hidden');
        }
    });

    // Handle featured
    if (featured) {
        const featuredCats = featured.getAttribute('data-category') || '';
        if (category === 'all' || featuredCats.includes(category)) {
            featured.style.display = 'grid';
        } else {
            featured.style.display = 'none';
        }
    }
}

/* ========================================
   Blog Articles (Modal & Dynamic Render)
   ======================================== */

// Single default post content for seed data (fallback)
const defaultContentBody = `
    <p>Your LinkedIn profile isn't a resume. It's a landing page. And like any landing page, it has one job: convert visitors into action-takers.</p>
    <p>Here's the thing: recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.</p>
    <h2>1. What Do You Actually Do?</h2>
    <p>Your headline is the most valuable real estate on LinkedIn. Stop wasting it with just your job title. Instead, use this formula:</p>
    <blockquote>[Role] | [Key skill] + [Who you help] | [Proof or differentiator]</blockquote>
    <h2>2. Why Should Someone Care?</h2>
    <p>Your About section should read like a conversation, not a cover letter. Lead with a hook, share your unique angle, and end with a clear CTA.</p>
`;

// Seed data for fallback when API fails
const fallbackBlogs = [
    {
        id: 'seed-1',
        title: 'The Psychology of a High-Converting LinkedIn Hook',
        category: 'Content Strategy',
        readTime: 5,
        image: 'linkedin_logo.png',
        excerpt: 'Why the first sentence of your post matters more than the rest of it combined.',
        content: `Writing a great hook is 90% of the battle. Your LinkedIn profile isn't a resume. It's a landing page. And like any landing page, it has one job: convert visitors into action-takers. <br><br>Here's the thing: recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.`
    },
    {
        id: 'seed-2',
        title: 'Why Resumes Are Dying (And What to Build Instead)',
        category: 'Career Growth',
        readTime: 4,
        image: 'career_growth.png',
        excerpt: 'The modern job market cares less about your PDF and more about your digital footprint.',
        content: `Your digital footprint is your new resume... recruiters spend an average of 7.4 seconds scanning your profile before deciding whether to reach out.`
    },
    {
        id: 'seed-3',
        title: 'Networking Without the Cringe: A Humans Guide',
        category: 'Personal Branding',
        readTime: 6,
        image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=800',
        excerpt: 'How to build meaningful professional relationships without feeling like a salesperson.',
        content: `Networking is just making friends with people who do cool stuff. Don't overthink it.`
    }
];

async function initBlogPage() {
    const featuredEl = document.getElementById('dynamicFeaturedPost');
    const gridEl = document.getElementById('dynamicBlogGrid');
    if (!featuredEl || !gridEl) return;

    try {
        let db = [];
        try {
            const response = await fetch('/api/get_blogs');
            if (response.ok) {
                db = await response.json();
            }
        } catch (fetchError) {
            console.warn('API Fetch failed, using fallback data.', fetchError);
        }

        // Use fallback if DB is empty or call failed
        if (!Array.isArray(db) || db.length === 0) {
            db = fallbackBlogs;
        }
        
        if (db.length > 0) {
            const featured = db[0];
            
            // SECURITY: Using DOM createElement and textContent to prevent XSS
            featuredEl.innerHTML = ''; // Clear
            const featuredArticle = document.createElement('article');
            featuredArticle.className = 'blog-featured';
            featuredArticle.setAttribute('data-category', featured.category.toLowerCase());
            
            featuredArticle.innerHTML = `
                <div class="featured-content">
                    <div class="blog-meta">
                        <span class="blog-category-tag">${escapeHTML(featured.category)}</span>
                        <span class="blog-date">Featured</span>
                    </div>
                    <h2>${escapeHTML(featured.title)}</h2>
                    <p>${escapeHTML(featured.excerpt)}</p>
                    <div class="blog-author">
                        <div class="author-avatar small" style="background: var(--gradient-main);">BB</div>
                        <span>BioBoost Team</span>
                        <span class="dot">·</span>
                        <span>${escapeHTML(featured.readTime.toString())} min read</span>
                    </div>
                    <a href="single-blog.html?id=${encodeURIComponent(featured.id)}" class="read-more-btn">Read Article →</a>
                </div>
                <div class="featured-image" style="background: url('${encodeURI(featured.image || '')}') center/cover no-repeat;">
                </div>
            `;
            featuredEl.appendChild(featuredArticle);

            gridEl.innerHTML = '';
            db.slice(1).forEach(post => {
                const postArticle = document.createElement('article');
                postArticle.className = 'blog-card';
                postArticle.setAttribute('data-category', post.category.toLowerCase());
                
                postArticle.innerHTML = `
                    <div class="blog-card-image">
                        <img src="${encodeURI(post.image || '')}" alt="Cover" style="width: 100%; height: 100%; object-fit: cover; transition: 0.4s;" class="blog-card-img-element" loading="lazy">
                    </div>
                    <div class="blog-card-body">
                        <div class="blog-meta">
                            <span class="blog-category-tag">${escapeHTML(post.category)}</span>
                            <span class="blog-date">Latest</span>
                        </div>
                        <h3>${escapeHTML(post.title)}</h3>
                        <p>${escapeHTML(post.excerpt)}</p>
                        <div class="blog-card-footer">
                            <span>${escapeHTML(post.readTime.toString())} min read</span>
                            <a href="single-blog.html?id=${encodeURIComponent(post.id)}" class="read-more-link">Read →</a>
                        </div>
                    </div>
                `;
                gridEl.appendChild(postArticle);
            });

            // Re-trigger animation observer for new elements
            setTimeout(() => observeAnimations(), 100);

        } else {
            featuredEl.innerHTML = '<p class="no-blogs">No blogs found.</p>';
            gridEl.innerHTML = '';
        }
    } catch (e) {
        console.error('Critical failure in initBlogPage:', e);
        featuredEl.innerHTML = '<p class="no-blogs">Unable to load blogs at this time.</p>';
    }
}

function openArticleDb(e, id) {
    if (e) e.preventDefault();
    window.location.href = 'single-blog.html?id=' + id;
}

const blogArticles = [];

function openArticle(event, index) {
    if (event) event.preventDefault();
    // Replaced by openArticleDb
}

function closeArticle() {
    document.getElementById('articleModal').classList.remove('open');
    document.body.style.overflow = '';
}

// Close modal on Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('articleModal');
        if (modal && modal.classList.contains('open')) {
            closeArticle();
        }
    }
});

/* ========================================
   Newsletter
   ======================================== */

function handleNewsletter(event) {
    event.preventDefault();
    const emailInput = document.getElementById('newsletterEmail');
    const form = document.getElementById('newsletterForm');
    const email = emailInput.value.trim();

    if (!email || !email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribing...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = '✓ Subscribed!';
        btn.style.background = 'linear-gradient(135deg, #34d399, #06b6d4)';
        emailInput.value = '';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1200);
}

/* ========================================
   Branding Kit Generator
   ======================================== */

function generateBrandingKit() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    const data = {
        name: document.getElementById('name').value.trim(),
        jobTitle: document.getElementById('jobTitle').value.trim(),
        skills: document.getElementById('skills').value.trim(),
        experience: document.getElementById('experience').value,
        industry: document.getElementById('industry').value.trim(),
        goal: document.getElementById('goal').value,
        tone: document.getElementById('tone').value,
        audience: document.getElementById('audience').value,
        uniqueValue: document.getElementById('uniqueValue').value.trim()
    };

    setTimeout(() => {
        const kit = buildKit(data);
        renderOutput(kit, data);
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
    }, 1800);
}

/* ========================================
   Kit Builder — Core Engine
   ======================================== */

function buildKit(d) {
    const firstName = d.name.split(' ')[0];
    const lastName = d.name.split(' ').slice(1).join(' ');
    const skillsArr = d.skills.split(',').map(s => s.trim()).filter(Boolean);
    const topSkills = skillsArr.slice(0, 3);
    const allSkills = skillsArr.join(', ');
    const isJobSearch = d.goal.includes('hired');
    const isFreelance = d.goal.includes('freelance') || d.goal.includes('client');
    const isBrand = d.goal.includes('brand');

    const seniorityWord = getSeniorityWord(d.experience);
    const yearsRange = getYearsRange(d.experience);
    const yearsNum = getYearsNum(d.experience);
    const actionVerb = getActionVerb(d.tone);
    const toneStyle = getToneStyle(d.tone);

    const ctx = { d, firstName, lastName, skillsArr, topSkills, allSkills, isJobSearch, isFreelance, isBrand, seniorityWord, yearsRange, yearsNum, actionVerb, toneStyle };

    return {
        linkedinBios: generateLinkedInBios(ctx),
        twitterBios: generateTwitterBios(ctx),
        instagramBios: generateInstagramBios(ctx),
        websiteAbout: generateWebsiteAbout(ctx),
        linkedinHeadlines: generateLinkedInHeadlines(ctx),
        linkedinPosts: generateLinkedInPosts(ctx),
        brandingTips: generateBrandingTips(ctx)
    };
}

function getToneStyle(tone) {
    const styles = {
        Professional: {
            opener: 'I specialize in',
            connector: 'My focus is on',
            cta: 'I welcome meaningful conversations',
            adjective: 'strategic',
            verb: 'deliver',
            exclaim: '.',
            closer: "Let's connect.",
            hook: "Here's what I've observed:",
            believe: 'I\'m a firm believer that',
        },
        Friendly: {
            opener: 'I love helping',
            connector: 'What gets me excited is',
            cta: "Always happy to chat — don't be a stranger",
            adjective: 'collaborative',
            verb: 'build',
            exclaim: '!',
            closer: "Say hi — I'd love to connect!",
            hook: "Here's something I wish someone told me earlier:",
            believe: 'I genuinely believe that',
        },
        Bold: {
            opener: 'I don\'t just work in',
            connector: 'Here\'s the truth:',
            cta: 'Ready? DM me. Let\'s go',
            adjective: 'relentless',
            verb: 'ship',
            exclaim: '.',
            closer: "DM me. Let's make it happen.",
            hook: "Most people in this space won't tell you this:",
            believe: 'I know for a fact that',
        }
    };
    return styles[tone] || styles.Professional;
}

/* ========================================
   LinkedIn Bios (3 Versions)
   ======================================== */

function generateLinkedInBios(ctx) {
    const { d, firstName, topSkills, allSkills, seniorityWord, yearsRange, yearsNum, isJobSearch, isFreelance, isBrand, toneStyle, skillsArr } = ctx;
    const bios = [];
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;
    const s3 = topSkills[2] || topSkills[1] || d.industry;

    // ─── Version A: The Authority Bio ───
    if (isJobSearch) {
        bios.push(
`${yearsRange} in ${d.industry}. ${d.jobTitle} who turns ambiguity into architecture and complexity into clarity.

${toneStyle.connector} building solutions that compound — the kind that teams depend on long after the project ends.

Core strengths:
→ ${s1} — from first principles, not frameworks-of-the-month
→ ${s2} — applied to real problems with measurable outcomes
→ ${s3} — the connective layer most people overlook
${skillsArr.length > 3 ? `→ Plus: ${skillsArr.slice(3).join(', ')}` : ''}
${d.uniqueValue ? `\nWhat sets me apart: ${d.uniqueValue}` : ''}
Currently exploring ${seniorityWord.toLowerCase()}-level roles where I can do my best work. If you value clarity over credentials, we should talk${toneStyle.exclaim}

${toneStyle.closer}`
        );
    } else if (isFreelance) {
        bios.push(
`Your ${d.industry.toLowerCase()} project deserves more than a vendor. It deserves a partner who's spent ${yearsRange} mastering ${s1} and ${s2}.

That's exactly what I do as a freelance ${d.jobTitle.toLowerCase()}.

How I work:
→ I start with your business goal, not my toolkit
→ ${s1} and ${s2} applied where they'll move the needle most
→ Clear timelines, transparent communication, zero surprises
→ I treat every deliverable like it has my name on it (because it does)
${d.uniqueValue ? `\n${d.uniqueValue}` : ''}
${d.audience} I've worked with say the same thing: "${firstName} didn't just meet the brief — ${firstName} redefined how we think about the problem."

${toneStyle.cta}${toneStyle.exclaim}`
        );
    } else {
        bios.push(
`${seniorityWord} ${d.jobTitle} | ${yearsRange} of building at the intersection of ${s1} and ${d.industry}

I share what I learn — the wins, the failures, the frameworks that actually hold up under pressure.

What you'll find here:
→ ${s1} insights you can apply this week
→ Honest perspectives on ${d.industry} (no recycled platitudes)
→ Lessons from ${yearsNum}+ years of building, shipping, and iterating
${d.uniqueValue ? `\n${d.uniqueValue}` : ''}
${toneStyle.believe} the best content comes from people still doing the work. I'm still in the arena, and I'm sharing the playbook as I go.

Follow along if you want signal, not noise${toneStyle.exclaim}`
        );
    }

    // ─── Version B: The Story Bio ───
    bios.push(
`${yearsRange} ago, I made a bet on ${d.industry.toLowerCase()}.

Not because it was the easy path — but because I saw a gap between how things were being done and how they could be done. That gap became my career.

Today, as a ${d.jobTitle.toLowerCase()}, I operate at the intersection of ${s1.toLowerCase()} and ${s2.toLowerCase()}. ${isJobSearch ? 'Every role I\'ve held has reinforced one thing: impact is about judgment, not just execution.' : isFreelance ? 'Every client engagement reinforces one thing: the best solutions come from understanding the problem better than anyone else in the room.' : 'Every post I share comes from the same place: real work, real lessons, zero fiction.'}

My toolkit: ${allSkills}
My approach: ${toneStyle.adjective}, outcome-obsessed, and allergic to busywork
${d.uniqueValue ? `My edge: ${d.uniqueValue}` : ''}
${isJobSearch ? `I'm searching for a team that cares about doing meaningful ${d.industry.toLowerCase()} work. If that's yours, let's talk.` : isFreelance ? `If you're looking for a ${d.jobTitle.toLowerCase()} who treats your project like their own, I'm one DM away.` : `${toneStyle.closer}`}`
    );

    // ─── Version C: The Concise Power Bio ───
    bios.push(
`${d.jobTitle} · ${topSkills.join(' · ')} · ${d.industry}

The short version: I ${toneStyle.verb} ${d.industry.toLowerCase()} work that solves real problems. ${s1} and ${s2} are my primary tools. Results are my primary metric.

The longer version: over ${yearsRange}, I've learned that the gap between good and exceptional ${d.industry.toLowerCase()} work isn't talent — it's specificity. Knowing exactly which lever to pull, which trade-off to make, and which detail will make the difference six months from now.
${d.uniqueValue ? `\n${d.uniqueValue}` : ''}
${isJobSearch ? `📬 Exploring new opportunities — open to roles where ${s1.toLowerCase()} expertise meets real business impact.` : isFreelance ? `📬 Available for select projects — DM me with your challenge and let's see if we're a fit.` : `📬 Follow for ${d.industry.toLowerCase()} insights, frameworks, and the occasional hard truth.`}

${toneStyle.closer}`
    );

    return bios;
}

/* ========================================
   Twitter/X Bios (3 Versions)
   ======================================== */

function generateTwitterBios(ctx) {
    const { d, topSkills, seniorityWord, isJobSearch, isFreelance, isBrand, toneStyle } = ctx;
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;
    const bios = [];

    if (isJobSearch) {
        bios.push(truncate(`${d.jobTitle} · ${s1} + ${s2} · Turning ${d.industry.toLowerCase()} complexity into clarity · Open to what's next`, 160));
        bios.push(truncate(`${s1}. ${s2}. ${d.industry}. I ${toneStyle.verb} work that compounds. Currently exploring my next role.`, 160));
        bios.push(truncate(`${seniorityWord} ${d.jobTitle} — I don't just write code / design / strategize. I solve the problem behind the problem. DMs open.`, 160));
    } else if (isFreelance) {
        bios.push(truncate(`Freelance ${d.jobTitle} · I help ${d.audience.toLowerCase()} win with ${s1} · DM me your toughest ${d.industry.toLowerCase()} challenge`, 160));
        bios.push(truncate(`${d.jobTitle} for hire · ${s1} × ${s2} · Your competitor already looked at my portfolio. Your move.`, 160));
        bios.push(truncate(`I make ${d.industry.toLowerCase()} look effortless. (It's not. That's why you hire me.) · ${d.jobTitle} · ${s1}`, 160));
    } else {
        bios.push(truncate(`${d.jobTitle} sharing real ${d.industry.toLowerCase()} lessons: ${s1}, ${s2}, and the stuff nobody talks about`, 160));
        bios.push(truncate(`Building in public · ${d.jobTitle} · ${s1} × ${d.industry} · Signal over noise · Follow for the unfiltered playbook`, 160));
        bios.push(truncate(`${s1}. ${d.industry}. Honest takes from a ${d.jobTitle.toLowerCase()} still in the trenches. No guru energy.`, 160));
    }

    return bios;
}

/* ========================================
   Instagram Bios (3 Versions)
   ======================================== */

function generateInstagramBios(ctx) {
    const { d, topSkills } = ctx;
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;
    const bios = [];

    // Version A: Minimal & Aesthetic
    bios.push(
        `${d.jobTitle} based in [City/Remote]
✨ ${s1} & ${s2}
🌱 Sharing the journey of building in ${d.industry}
👇 Grab my free resources
[Link]`
    );

    // Version B: Bold & Direct
    bios.push(
        `I help ${d.audience.toLowerCase()} win at ${d.industry.toLowerCase()}.
Not your average ${d.jobTitle.toLowerCase()} ⚡️
${s1} | ${s2}
Work with me / Learn with me
⬇️ Let's talk
[Link]`
    );

    // Version C: Story & Value Driven
    bios.push(
        `${d.jobTitle} turning coffee into ${d.industry.toLowerCase()} solutions ☕️
My focus? ${s1} that actually converts.
Tips, frameworks & real talk inside.
✉️ DM for inquiries
[Link]`
    );

    return bios;
}

/* ========================================
   Website About Section
   ======================================== */

function generateWebsiteAbout(ctx) {
    const { d, firstName, topSkills, allSkills, seniorityWord, yearsRange, isJobSearch, isFreelance, isBrand, toneStyle } = ctx;
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;

    let about = `${d.name} is a ${seniorityWord.toLowerCase()} ${d.jobTitle.toLowerCase()} with ${yearsRange} of focused experience in ${d.industry.toLowerCase()}.\n\n`;

    about += `Specializing in ${s1.toLowerCase()} and ${s2.toLowerCase()}, ${firstName} has built a career around one principle: the best work happens when deep technical expertise meets clear strategic thinking. No shortcuts. No vanity metrics. Just outcomes that hold up under scrutiny.\n\n`;

    if (isFreelance) {
        about += `As an independent ${d.jobTitle.toLowerCase()}, ${firstName} partners with ${d.audience.toLowerCase()} who need more than a service provider — they need someone who understands the business context behind every deliverable. From ${s1.toLowerCase()} to ${(topSkills[2] || s2).toLowerCase()}, every project begins with a simple question: what does success actually look like for you?\n\n`;
        about += `Clients consistently highlight three things about working with ${firstName}: speed without sacrificing quality, communication that removes ambiguity, and a genuine investment in outcomes that outlast the engagement.\n\n`;
    } else if (isJobSearch) {
        about += `With core competencies spanning ${allSkills.toLowerCase()}, ${firstName}'s approach bridges the gap between vision and execution. Every project becomes an opportunity to raise the bar — not just for the deliverable, but for the team's standards and processes.\n\n`;
        about += `${firstName}'s colleagues describe a rare combination: the technical depth to solve complex ${d.industry.toLowerCase()} challenges and the communication skills to rally a team around a shared outcome.\n\n`;
    } else {
        about += `After ${yearsRange} of building in ${d.industry.toLowerCase()}, ${firstName} channels deep expertise in ${allSkills.toLowerCase()} into content that cuts through the noise. No recycled advice, no engagement bait — just actionable insights from someone still doing the work.\n\n`;
        about += `What started as a way to document personal learnings has become a growing community of ${d.audience.toLowerCase()} who value substance over performance.\n\n`;
    }

    if (d.uniqueValue) about += `${d.uniqueValue}\n\n`;
    about += `${toneStyle.believe} the future of ${d.industry.toLowerCase()} belongs to people who combine depth with adaptability — who can go deep on ${s1.toLowerCase()} today and connect it to a completely new challenge tomorrow. That's the standard ${firstName} holds, and it's the standard reflected in every piece of work.`;

    return about;
}

/* ========================================
   LinkedIn Headlines (5 Options)
   ======================================== */

function generateLinkedInHeadlines(ctx) {
    const { d, topSkills, seniorityWord, isJobSearch, isFreelance, isBrand, toneStyle } = ctx;
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;

    return [
        `${d.jobTitle} | ${s1} & ${s2} | I ${toneStyle.verb} ${d.industry.toLowerCase()} solutions that actually scale${isJobSearch ? ' | Open to Work' : ''}`,
        `${seniorityWord} ${d.jobTitle} → Turning ${d.industry.toLowerCase()} complexity into competitive advantage through ${s1.toLowerCase()}`,
        `I help ${d.audience.toLowerCase()} ${isFreelance ? 'solve problems that have been stuck for months' : isJobSearch ? 'build teams that ship with clarity and speed' : 'cut through noise with real ' + d.industry.toLowerCase() + ' insights'} | ${d.jobTitle}`,
        `${s1} × ${s2} × ${d.industry} | ${d.jobTitle} who believes great work comes from asking better questions${isFreelance ? ' | Available' : ''}`,
        `${d.jobTitle} · ${topSkills.join(' · ')}${isBrand ? ' · Sharing the unfiltered playbook' : isJobSearch ? ' · Let\'s build something that matters' : ' · Because good enough isn\'t'}`
    ];
}

/* ========================================
   LinkedIn Posts (3 Ready-to-Publish)
   ======================================== */

function generateLinkedInPosts(ctx) {
    const { d, firstName, topSkills, seniorityWord, yearsRange, yearsNum, isJobSearch, isFreelance, isBrand, toneStyle } = ctx;
    const posts = [];
    const s1 = topSkills[0] || d.industry;
    const s2 = topSkills[1] || d.industry;

    // ─── Post 1: Contrarian Insight ───
    posts.push({
        title: '💡 Contrarian Insight',
        text: `Unpopular opinion: the biggest problem in ${d.industry.toLowerCase()} isn't lack of talent.

It's the obsession with best practices.

After ${yearsRange} as a ${d.jobTitle.toLowerCase()}, here's what I've noticed:

→ The teams that over-index on "how things should be done" ship slower than teams that ask "what does this specific situation need?"
→ ${s1} frameworks are tools, not religions. The moment you stop questioning them, you stop growing.
→ The most impactful ${d.jobTitle.toLowerCase()}s I've worked with all share one trait: they're comfortable being wrong in public.

${toneStyle.hook}

The gap between a good ${d.jobTitle.toLowerCase()} and a great one isn't the tech stack, the portfolio, or the years of experience.

It's intellectual humility paired with decisive action.

You can know ${s1.toLowerCase()} inside and out. But if you can't adapt when the context changes, you're just executing patterns — not solving problems.

What's a "best practice" in ${d.industry.toLowerCase()} that you think needs to die? 👇

♻️ Repost if this resonates.`
    });

    // ─── Post 2: Goal-Specific ───
    if (isJobSearch) {
        posts.push({
            title: '🎯 Career Journey',
            text: `I'm going to be honest about something:

Job searching while employed is exhausting. Job searching while trying to maintain your professional dignity? Even harder.

But here's what ${yearsRange} in ${d.industry.toLowerCase()} has taught me about this process:

1. Your LinkedIn headline matters more than your resume. Recruiters spend 7 seconds on your profile — make every word count.

2. The best opportunities come from the 70% of jobs that are never posted. That means your network isn't a nice-to-have. It's your #1 strategy.

3. Skills like ${s1.toLowerCase()} and ${s2.toLowerCase()} get you in the door. But what makes you memorable is how you think, not just what you know.

4. Applying to 100 jobs and hearing nothing? That's not a you problem. That's a positioning problem. Fix your story first.

I'm currently exploring my next ${d.jobTitle.toLowerCase()} opportunity.

What I bring: ${s1}, ${s2}, and the judgment that only comes from building real things in real ${d.industry.toLowerCase()} environments.

If your team values people who think deeply and ship consistently, I'd love to hear what you're building.

DM me or comment below — I'm all ears 🤝`
        });
    } else if (isFreelance) {
        posts.push({
            title: '🎯 Client Problem-Solving',
            text: `A potential client told me last month:

"We've already tried working with a ${d.jobTitle.toLowerCase()}. It didn't work out."

Instead of pitching harder, I asked one question:

"What did they get wrong?"

The answer was illuminating. It wasn't about skill. It was about these three things:

1. They didn't ask enough questions upfront → so they solved the wrong problem
2. Communication dropped off after week two → trust evaporated
3. The deliverable was technically correct but strategically useless → it sat in a folder collecting dust

Here's what I did differently:

→ Spent the first 48 hours just listening. No wireframes, no proposals, no code. Just understanding.
→ Set up async updates every 72 hours — transparent, specific, no fluff
→ Tied every decision back to their business metric, not my preference

Result? The project finished early. And they've referred me twice since.

${s1} skills matter. But the ability to understand what someone actually needs? That's the multiplier.

If you've been burned by a freelancer before, DM me. Let's do it right this time.

📩 Open for ${d.industry.toLowerCase()} projects.`
        });
    } else {
        posts.push({
            title: '🎯 Building in Public',
            text: `I posted my first piece of ${d.industry.toLowerCase()} content 6 months ago.

I had 200 connections. Zero engagement. And a nagging voice saying "who are you to share advice?"

Here's what happened since:

→ 3x more connections (most of them people doing work I genuinely admire)
→ 2 collaboration opportunities I never would have found otherwise
→ A deeper understanding of ${s1.toLowerCase()} — because explaining something forces you to actually understand it

But the biggest surprise?

The content that performed best wasn't the polished, "here are 10 tips" posts. It was the honest ones. The "here's what I got wrong" posts. The "here's a question I'm still wrestling with" posts.

People don't follow you for answers. They follow you for thinking.

If you've been sitting on insights about ${d.industry.toLowerCase()} because you feel "not expert enough" — post anyway. The bar isn't perfection. The bar is honesty + effort.

Your future self will thank you.

Hit follow if you want more of this → no guru energy, just real talk 🔔`
        });
    }

    // ─── Post 3: Framework / Value Post ───
    posts.push({
        title: '📋 Actionable Framework',
        text: `${yearsRange} of ${d.industry.toLowerCase()}.
${yearsNum}+ projects shipped.
Thousands of hours of learning.

Distilled into 7 principles I come back to every single week:

1️⃣ Clarity beats cleverness
→ If you can't explain your ${s1.toLowerCase()} approach to a non-expert, you don't understand it well enough.

2️⃣ Constraints are gifts
→ The best ${d.jobTitle.toLowerCase()} work I've ever done happened under tight deadlines with limited resources. Abundance breeds mediocrity.

3️⃣ Process is a living thing
→ Any methodology that doesn't evolve project-to-project is a liability, not an asset.

4️⃣ Stakeholder management IS the job
→ ${s1} skills get you hired. Communication skills get you promoted (or retained, or referred).

5️⃣ Ship, then polish
→ A shipped 80% solution teaches you more than a perfect solution that never sees daylight.

6️⃣ Learn adjacent disciplines
→ The best ${d.jobTitle.toLowerCase()} ideas I've had came from studying ${d.industry.toLowerCase() === 'technology' ? 'psychology, economics, and design' : 'technology, behavioral science, and design thinking'}.

7️⃣ Rest is productive
→ Burnout doesn't make you dedicated. It makes you sloppy. Protect your recovery like you protect your deadlines.

Which one hits hardest for you? Drop the number 👇

Save this for later → you'll need it on a tough day.

♻️ Repost to help someone else in ${d.industry.toLowerCase()}.`
    });

    return posts;
}

/* ========================================
   Growth Tips (5 Personalized)
   ======================================== */

function generateBrandingTips(ctx) {
    const { d, isJobSearch, isFreelance, isBrand, topSkills, toneStyle } = ctx;
    const tips = [];
    const s1 = topSkills[0] || d.industry;

    if (isJobSearch) {
        tips.push({ title: 'Rewrite your headline using the Value Formula', desc: `Replace your job title with: "[Role] | [Primary skill] + [Who you help] | [Proof point]". Example: "${d.jobTitle} | ${s1} & ${topSkills[1] || d.industry} | Building solutions that [specific outcome]". This single change can increase profile views by 40%.` });
        tips.push({ title: 'Build a "warm radar" with 10 target companies', desc: `Pick 10 companies you'd love to work for. Follow their hiring managers and team leads. Comment on their posts 3x/week with genuine insight — not "Great post!" but actual perspective. When you apply, your name will already be familiar.` });
        tips.push({ title: 'Create a Featured section that tells a story', desc: `Add 3-4 items to your Featured section: a brief case study, your best LinkedIn post, a slide deck showing your thinking process, and optionally a portfolio link. Recruiters check Featured before Experience — make it count.` });
        tips.push({ title: 'Post one "lesson learned" per week', desc: `Share a real insight from your ${d.jobTitle.toLowerCase()} experience every week. Use the hook formula: "I used to believe [common assumption]. Then [specific experience] showed me [counterintuitive lesson]." One post/week for 8 weeks builds more credibility than 100 silent applications.` });
        tips.push({ title: 'Master the informational interview DM', desc: `Reach out to people in roles you want with this structure: (1) specific compliment about their work, (2) one smart question about their career path, (3) ask for 15 minutes, not a job. Do this 3x/week. Within a month, you'll have warm connections at companies that matter to you.` });
    } else if (isFreelance) {
        tips.push({ title: 'Position yourself as the specialist, not the generalist', desc: `"I'm a ${d.jobTitle.toLowerCase()}" competes with millions. "I help [${d.audience.toLowerCase()}] solve [specific problem] using ${s1.toLowerCase()}" competes with almost nobody. Niche positioning lets you charge premium rates because clients see you as the expert, not one option among many.` });
        tips.push({ title: 'Turn every project into a public case study', desc: `After each project, document: the challenge, your approach, and the measurable result. Format: "Client needed X → I did Y → Result: Z." Post it on LinkedIn, add it to your Featured section, and reference it in proposals. Each case study is a compounding sales asset.` });
        tips.push({ title: 'Build a proposal template that sells outcomes', desc: `Stop listing deliverables. Start framing proposals around business outcomes: "This project will reduce [pain point] by [estimated impact], resulting in [business metric improvement]." Attach a timeline and a simple pricing structure. Clients buy transformation, not tasks.` });
        tips.push({ title: 'Create a referral flywheel', desc: `After delivering great work, send this message: "I loved working on this. If you know one other person facing a similar challenge, I'd be grateful for an introduction." Then offer a small incentive — a free strategy session, a discount on their next project. Warm referrals convert 10x better than cold outreach.` });
        tips.push({ title: 'Publish a free resource that showcases your expertise', desc: `Create a checklist, mini-guide, or template related to ${s1.toLowerCase()} that your ideal client would find valuable. Share it freely on LinkedIn. This does two things: (1) proves your expertise before the sales call, and (2) attracts inbound leads who already trust your thinking.` });
    } else {
        tips.push({ title: 'Define 3 content pillars and commit to them', desc: `Pick 3 topics you'll be known for (e.g., "${s1}", "${d.industry} Career Growth", "${topSkills[1] || 'Industry Trends'}"). Rotate between them weekly. This gives your audience a clear reason to follow you and ensures you never run out of ideas.` });
        tips.push({ title: 'Use the 5:1 engagement ratio', desc: `For every 1 post you publish, leave 5 thoughtful comments on other people's content. Not "Great post!" — add a perspective, share a related experience, or ask a follow-up question. This builds relationships faster than posting alone and dramatically increases your visibility.` });
        tips.push({ title: 'Document your work instead of creating content', desc: `Don't sit down to "create content." Instead, document what you're already doing. Working through a ${s1.toLowerCase()} challenge? Write about it. Learned something surprising this week? Share it. Authentic documentation > manufactured thought leadership every time.` });
        tips.push({ title: 'Start building an email list now', desc: `Social platforms change algorithms constantly. An email list is the one audience you truly own. Create a simple lead magnet (a ${d.industry.toLowerCase()} checklist, resource list, or mini-course) and put the link in your LinkedIn bio. Even 100 engaged subscribers is more valuable than 10,000 passive followers.` });
        tips.push({ title: 'Batch your content creation in 90-minute sprints', desc: `Set a weekly 90-minute block. In that time: write 2 posts, schedule them, and pre-write 5 comments for the week. This system takes content from "I should really post something" to an autopilot habit that compounds your authority week over week.` });
    }

    return tips;
}

/* ========================================
   Helpers
   ======================================== */

function getSeniorityWord(exp) {
    if (exp.includes('Entry')) return 'Emerging';
    if (exp.includes('Mid')) return 'Experienced';
    if (exp.includes('Senior')) return 'Senior';
    if (exp.includes('Expert')) return 'Veteran';
    return 'Skilled';
}

function getYearsRange(exp) {
    if (exp.includes('0-2')) return '2 years';
    if (exp.includes('3-5')) return '5 years';
    if (exp.includes('5-10')) return '8+ years';
    if (exp.includes('10+')) return '10+ years';
    return 'several years';
}

function getYearsNum(exp) {
    if (exp.includes('0-2')) return 5;
    if (exp.includes('3-5')) return 15;
    if (exp.includes('5-10')) return 30;
    if (exp.includes('10+')) return 50;
    return 20;
}

function getActionVerb(tone) {
    if (tone === 'Bold') return 'ship';
    if (tone === 'Friendly') return 'build';
    return 'deliver';
}

function truncate(text, max) {
    return text.length <= max ? text : text.substring(0, max - 1) + '…';
}

/* ========================================
   Render Output
   ======================================== */

function renderOutput(kit, data) {
    const output = document.getElementById('output');
    const subtitle = document.getElementById('outputSubtitle');
    subtitle.textContent = `Crafted for ${data.name} — ${data.jobTitle} in ${data.industry}`;

    renderContentItems('linkedinBiosContent', kit.linkedinBios, ['Version A', 'Version B', 'Version C']);
    renderContentItems('twitterBiosContent', kit.twitterBios, ['Version A', 'Version B', 'Version C'], true);
    renderContentItems('instagramBiosContent', kit.instagramBios, ['Version A', 'Version B', 'Version C'], true);
    renderSingleContent('websiteAboutContent', kit.websiteAbout);
    renderHeadlines('linkedinHeadlinesContent', kit.linkedinHeadlines);
    renderPosts('linkedinPostsContent', kit.linkedinPosts);
    renderTips('brandingTipsContent', kit.brandingTips);

    // Reset tabs to first tab on generation
    const tabs = document.querySelectorAll('.platform-tab');
    if (tabs.length > 0) {
        tabs[0].click();
    }

    output.style.display = 'block';
    setTimeout(() => {
        output.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);
}

function renderContentItems(containerId, items, labels, isSmall = false) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach((text, i) => {
        const item = document.createElement('div');
        item.className = 'content-item';
        item.innerHTML = `
            <div class="content-item-header">
                <span class="content-item-label">${labels[i]}</span>
                <button class="copy-btn" onclick="copyText(this)" data-text="${escapeAttr(text)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                </button>
            </div>
            <div class="content-item-text${isSmall ? ' small' : ''}">${escapeHTML(text)}</div>`;
        container.appendChild(item);
    });
}

function renderSingleContent(containerId, text) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
        <div class="content-item">
            <div class="content-item-header">
                <span class="content-item-label">About Section</span>
                <button class="copy-btn" onclick="copyText(this)" data-text="${escapeAttr(text)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                </button>
            </div>
            <div class="content-item-text">${escapeHTML(text)}</div>
        </div>`;
}

function renderHeadlines(containerId, headlines) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    headlines.forEach((text, i) => {
        const item = document.createElement('div');
        item.className = 'headline-item';
        item.innerHTML = `
            <span class="headline-number">${i + 1}</span>
            <span class="headline-text">${escapeHTML(text)}</span>
            <button class="copy-btn headline-copy" onclick="copyText(this)" data-text="${escapeAttr(text)}">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Copy
            </button>`;
        container.appendChild(item);
    });
}

function renderPosts(containerId, posts) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    posts.forEach((post, i) => {
        const item = document.createElement('div');
        item.className = 'post-item';
        item.innerHTML = `
            <div class="post-header">
                <span class="post-label">Post ${i + 1} — ${post.title}</span>
                <button class="copy-btn" onclick="copyText(this)" data-text="${escapeAttr(post.text)}">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    Copy
                </button>
            </div>
            <div class="post-text">${escapeHTML(post.text)}</div>`;
        container.appendChild(item);
    });
}

function renderTips(containerId, tips) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    tips.forEach((tip, i) => {
        const item = document.createElement('div');
        item.className = 'tip-item';
        item.innerHTML = `
            <span class="tip-number">${i + 1}</span>
            <div class="tip-content">
                <h4>${escapeHTML(tip.title)}</h4>
                <p>${escapeHTML(tip.desc)}</p>
            </div>`;
        container.appendChild(item);
    });
}

/* ========================================
   Copy to Clipboard
   ======================================== */

function copyText(btn) {
    const text = btn.getAttribute('data-text');
    navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Copied!`;
        setTimeout(() => {
            btn.classList.remove('copied');
            btn.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
        }, 2000);
    });
}

/* ========================================
   Utility
   ======================================== */

function escapeHTML(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeAttr(text) {
    return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
