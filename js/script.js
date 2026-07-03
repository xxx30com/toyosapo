document.addEventListener('DOMContentLoaded', function() {
  // ハンバーガーメニュー
  const menuToggle = document.getElementById('menuToggle');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
    });

    // リンククリック時にメニューを閉じる
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        mainNav.classList.remove('active');
      });
    });
  }

  // スクロールに合わせてふわっと表示する
  const revealTargets = document.querySelectorAll(
    '.problem-item, .reason-item, .flow-step, .faq-item, .service-category, .price-box, .greeting-content, .area-badge, .cta-panel'
  );
  if ('IntersectionObserver' in window && revealTargets.length > 0) {
    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealTargets.forEach(function(el, i) {
      el.classList.add('reveal');
      el.style.transitionDelay = (i % 3) * 0.08 + 's';
      observer.observe(el);
    });
  }

  // スムーススクロール
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
        return;
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});
