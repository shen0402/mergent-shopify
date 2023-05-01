document.querySelectorAll('.collection-sidebar__title').forEach(sidebar => {
    sidebar.addEventListener('click', function(e){
        this.classList.toggle('active');
    });
});