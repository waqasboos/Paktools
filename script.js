document.addEventListener('DOMContentLoaded', function() {
    // Sample tools data
    let tools = [
        {
            id: 1,
            name: 'Image Compressor',
            image: 'assets/image-compressor.jpg',
            link: 'https://example.com/image-compressor',
            category: 'design',
            description: 'Compress your images without losing quality'
        },
        {
            id: 2,
            name: 'Video Editor',
            image: 'assets/video-editor.jpg',
            link: 'https://example.com/video-editor',
            category: 'editing',
            description: 'Edit your videos online easily'
        },
        {
            id: 3,
            name: 'PDF Converter',
            image: 'assets/pdf-converter.jpg',
            link: 'https://example.com/pdf-converter',
            category: 'daily',
            description: 'Convert PDFs to various formats'
        },
        {
            id: 4,
            name: 'Invoice Generator',
            image: 'assets/invoice-generator.jpg',
            link: 'https://example.com/invoice-generator',
            category: 'business',
            description: 'Create professional invoices quickly'
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
    const categoryBtns = document.querySelectorAll('.category-btn');
    const editDescBtn = document.getElementById('edit-desc-btn');
    const siteDescription = document.querySelector('.site-description');

    // Render tools
    function renderTools(toolsToRender) {
        toolsContainer.innerHTML = '';
        
        toolsToRender.forEach(tool => {
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-card';
            toolCard.innerHTML = `
                <img src="${tool.image}" alt="${tool.name}" class="tool-img">
                <div class="tool-info">
                    <h3>${tool.name}</h3>
                    <p>${tool.description}</p>
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
            tool.name.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase())
        );
        renderTools(filteredTools);
    }

    // Toggle description editing
    editDescBtn.addEventListener('click', function() {
        const isEditable = siteDescription.contentEditable === 'true';
        siteDescription.contentEditable = !isEditable;
        this.textContent = isEditable ? 'Edit Description' : 'Save Description';
        
        if (isEditable) {
            // Save description to localStorage
            localStorage.setItem('paktools-description', siteDescription.textContent);
        }
    });

    // Load saved description
    const savedDesc = localStorage.getItem('paktools-description');
    if (savedDesc) {
        siteDescription.textContent = savedDesc;
    }

    // Event listeners
    searchInput.addEventListener('input', (e) => {
        searchTools(e.target.value);
    });

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const category = btn.dataset.category;
            
            // Update active state
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            filterTools(category);
        });
    });

    // Initialize
    renderTools(tools);
});
