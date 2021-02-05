function attachClickToggleNavbar() {
    const button = document.getElementsByClassName('navbar-toggler')[0];
    button.addEventListener('click', () => toggleNavbar());
}

function toggleNavbar() {
    const navbarItems = document.getElementsByClassName('navbar-item');
    for (let i = 0; i < navbarItems.length; i++) {
        let className = navbarItems[i].className;
        if (className.includes(' show'))
            navbarItems[i].className = className.replace(' show', '');
        else
            navbarItems[i].className += ' show';
    }
}