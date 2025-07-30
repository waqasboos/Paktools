document.addEventListener('DOMContentLoaded', function() {
    // Sample tools data (will be replaced with localStorage data if available)
    let tools = [
        {
            id: 1,
            name: 'JSON Formatter',
            image: 'https://via.placeholder.com/300x150?text=JSON+Formatter',
            link: 'https://jsonformatter.org',
            category: 'development'
        },
        {
            id: 2,
            name: 'Color Picker',
            image: 'https://via.placeholder.com/300x150?text=Color+Picker',
            link: 'https://colorpicker.com',
            category: 'design'
        },
        {
            id: 3,
            name: 'PDF Converter',
            image: 'https://via.placeholder.com/300x150?text=PDF+Converter',
            link: 'https://pdfconverter.com',
            category: 'productivity'
        },
        {
            id: 4,
            name: 'Base64 Encoder',
            image: 'https://via.placeholder.com/300x150?text=Base64+Encoder',
            link: 'https://base64encode.org',
            category: 'development'
        },
        {
            id: 5,
            name: 'Image Compressor',
            image: 'https://via.placeholder.com/300x150?text=Image+Compressor',
            link: 'https://imagecompressor.com',
            category: 'design'
        },
        {
            id: 6,
            name: 'Markdown Editor',
            image: 'https://via.placeholder.com/300x150?text=Markdown+Editor',
            link: 'https://markdowneditor.com',
            category: 'productivity'
        }
    ];

    // Load tools from localStorage if available
    const savedTools = localStorage.getItem('paktools-tools');
    if (savedTools) {
        tools = JSON.parse(savedTools);
    }

    // DOM elements
    const toolsContainer = document.getElementById('tools-container');
    const searchInput = document.getElementById('search-input');
    const categoryLinks = document.querySelectorAll('.category-link');
    const adminLink = document.getElementById('admin-access');
    const passwordModal = document.getElementById('password-modal');
    const closeModal = document.querySelector('.close-modal');
    const submitPassword = document.getElementById('submit-password');
    const adminPassword = document.getElementById('admin-password');

    // Render tools
    function renderTools(toolsToRender) {
        toolsContainer.innerHTML = '';
        
        toolsToRender.forEach((tool, index) => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.style.animationDelay = `${index * 0.1}s`;
            toolCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}">
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                </div>
            `;
            
            toolCard.addEventListener('click', () => {
                window.open(tool.link, '_blank');
            });
            
            toolsContainer.appendChild(toolCard);
        });
    }

    // Filter tools by category
    function filterTools(category) {
        if (category === 'all') {
            renderTools(tools);
            return;
        }
        
        const filteredTools = tools.filter(tool => tool.category === category);
        renderTools(filteredTools);
    }

    // Search tools
    function searchTools(query) {
        const filteredTools = tools.filter(tool => 
            tool.name.toLowerCase().includes(query.toLowerCase())
        );
        renderTools(filteredTools);
    }

    // Initialize
    renderTools(tools);

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        searchTools(e.target.value);
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.dataset.category;
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            filterTools(category);
        });
    });

    // Admin access
    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        passwordModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        passwordModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === passwordModal) {
            passwordModal.style.display = 'none';
        }
    });

    submitPassword.addEventListener('click', () => {
        const password = adminPassword.value.trim();
        const hiddenPassword = 'csdangeryt03458103223';
        
        if (password === hiddenPassword) {
            window.location.href = 'admin.html';
        } else {
            alert('Incorrect password!');
        }
    });

    // Animate tool cards on scroll
    const animateOnScroll = () => {
        const toolCards = document.querySelectorAll('.tool-card');
        
        toolCards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (cardPosition < screenPosition) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
});
