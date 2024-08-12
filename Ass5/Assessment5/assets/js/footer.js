// footer.js
document.addEventListener('DOMContentLoaded', function() {
    fetch('footer.html')
      .then(response => response.text())
      .then(html => {
        const footerContainer = document.createElement('footer');
        footerContainer.innerHTML = html;
        document.body.appendChild(footerContainer);
      });
  });
  