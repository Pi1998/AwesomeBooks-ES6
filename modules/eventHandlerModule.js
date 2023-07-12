const homeClick = () => {
    const homeLink = document.getElementById('home-link');
    const addLink = document.getElementById('add-link');
    const contactLink = document.getElementById('contact-link');

    homeLink.style.display = 'block';
    addLink.style.display = 'none';
    contactLink.style.display = 'none';
};

const addClick = () => {
    const homeLink = document.getElementById('home-link');
    const addLink = document.getElementById('add-link');
    const contactLink = document.getElementById('contact-link');

    homeLink.style.display = 'none';
    addLink.style.display = 'block';
    contactLink.style.display = 'none';
};

const contactClick = () => {
    const homeLink = document.getElementById('home-link');
    const addLink = document.getElementById('add-link');
    const contactLink = document.getElementById('contact-link');

    homeLink.style.display = 'none';
    addLink.style.display = 'none';
    contactLink.style.display = 'block';
};

// Export the event handlers
export { homeClick, addClick, contactClick };
