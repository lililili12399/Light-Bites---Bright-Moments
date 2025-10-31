// load-nav.js — fetches nav.html and injects into #site-nav placeholder
(function(){
  async function loadNav(){
    try{
      const resp = await fetch('nav.html');
      if(!resp.ok) return console.warn('nav.html not found:', resp.status);
      const text = await resp.text();
      const container = document.getElementById('site-nav');
      if(container){
        container.innerHTML = text;
        // highlight current link
        const links = container.querySelectorAll('.nav-link');
        const path = location.pathname.split('/').pop() || 'index.html';
        links.forEach(a => {
          const href = a.getAttribute('href');
          if(href === path || (href === 'index.html' && (path === '' || path === 'index.html'))){
            a.classList.add('active');
            a.setAttribute('aria-current','page');
          }
        });
      }
    }catch(err){
      console.error('Failed to load nav:', err);
    }
  }
  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', loadNav);
  } else {
    loadNav();
  }
})();
