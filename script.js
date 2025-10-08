// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle project card clicks
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            // Navigate to project detail page
            window.location.href = `projects/${projectId}.html`;
        });
    });

    // Handle additional project card clicks
    const additionalProjectCards = document.querySelectorAll('.additional-project-card');
    
    additionalProjectCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            if (projectId) {
                // Navigate to project detail page if it exists
                window.location.href = `projects/${projectId}.html`;
            }
            // For cards without data-project, you can add custom behavior
        });
    });

    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe project cards for animation
    const projectCardsToObserve = document.querySelectorAll('.project-card');
    projectCardsToObserve.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effects for project cards
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Utility function to create project detail pages
function createProjectPage(projectId, projectData) {
    const pageContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectData.title} - Alex Ward</title>
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="project-detail.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <a href="../index.html" class="logo">Alex Ward</a>
            <nav class="nav">
                <a href="../index.html#projects" class="nav-link">Projects</a>
                <a href="../index.html#about" class="nav-link">About</a>
                <a href="../index.html#contact" class="nav-link">Contact</a>
            </nav>
        </div>
    </header>

    <main class="main">
        <div class="project-detail">
            <div class="container">
                <div class="breadcrumb">
                    <a href="../index.html">Home</a> / <a href="../index.html#projects">Projects</a> / ${projectData.title}
                </div>
                
                <div class="project-header">
                    <div class="project-meta">
                        <span class="project-category">${projectData.category}</span>
                        <span class="project-year">${projectData.year}</span>
                    </div>
                    <h1 class="project-title">${projectData.title}</h1>
                    <p class="project-subtitle">${projectData.subtitle}</p>
                </div>

                <div class="project-content">
                    <div class="project-gallery">
                        <div class="main-image">
                            <img src="../images/${projectData.mainImage}" alt="${projectData.title}" loading="lazy">
                        </div>
                        <div class="gallery-grid">
                            ${projectData.galleryImages.map(img => `
                                <div class="gallery-item">
                                    <img src="../images/${img}" alt="${projectData.title}" loading="lazy">
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="project-info">
                        <div class="project-description">
                            <h2>About this project</h2>
                            <p>${projectData.description}</p>
                        </div>

                        <div class="project-details">
                            <h2>Project Details</h2>
                            <div class="details-grid">
                                <div class="detail-item">
                                    <h3>Technologies</h3>
                                    <p>${projectData.technologies}</p>
                                </div>
                                <div class="detail-item">
                                    <h3>Duration</h3>
                                    <p>${projectData.duration}</p>
                                </div>
                                <div class="detail-item">
                                    <h3>Role</h3>
                                    <p>${projectData.role}</p>
                                </div>
                            </div>
                        </div>

                        <div class="project-challenges">
                            <h2>Challenges & Solutions</h2>
                            <p>${projectData.challenges}</p>
                        </div>

                        <div class="project-results">
                            <h2>Results</h2>
                            <p>${projectData.results}</p>
                        </div>
                    </div>
                </div>

                <div class="project-navigation">
                    <a href="../index.html" class="btn btn-secondary">← Back to Projects</a>
                    <a href="../index.html#contact" class="btn btn-primary">Get in Touch</a>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 Alex Ward. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>`;
    
    return pageContent;
}
