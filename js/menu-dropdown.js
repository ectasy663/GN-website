// Fallback: Enhance dropdowns with fade/slide effect if not handled elsewhere
// (dropdown.js already handles logic, so this is for extra UI polish)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    menu.addEventListener('transitionend', function() {
      if (!menu.classList.contains('show')) {
        menu.style.display = '';
      }
    });
    menu.addEventListener('show', function() {
      menu.style.display = 'block';
    });
  });
});