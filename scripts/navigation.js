/**
 * Portfolio SPA Navigation System
 * Implements smooth, single-page navigation for case studies
 * Inspired by modern portfolio sites like sofiapolette.com
 */

class PortfolioNavigation {
  constructor() {
    this.overlay = document.getElementById('contentOverlay');
    this.overlayContent = document.getElementById('overlayContent');
    this.mainContainer = document.querySelector('.container');
    this.isLoading = false;
    
    this.init();
  }

  init() {
    this.bindEvents();
    this.handleInitialLoad();
  }

  bindEvents() {
    // Case study navigation
    document.addEventListener('click', (e) => {
      const caseLink = e.target.closest('[data-case]');
      if (caseLink) {
        e.preventDefault();
        const caseId = caseLink.getAttribute('data-case');
        this.loadCaseStudy(caseId);
      }

      // Navigation menu
      const navLink = e.target.closest('[data-nav]');
      if (navLink) {
        e.preventDefault();
        const section = navLink.getAttribute('data-nav');
        this.handleNavigation(section);
      }

      // Close overlay
      if (e.target.closest('.overlay__close') || 
          (e.target === this.overlay && !e.target.closest('.overlay__content'))) {
        this.closeOverlay();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
        this.closeOverlay();
      }
    });

    // Prevent scroll when overlay is open
    this.overlay.addEventListener('transitionend', () => {
      if (this.overlay.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  async loadCaseStudy(caseId) {
    if (this.isLoading) return;

    try {
      this.isLoading = true;
      this.showLoadingState();

      // Fetch case study content
      const response = await fetch(`case-studies/${caseId}.html`);
      
      if (!response.ok) {
        throw new Error(`Failed to load case study: ${response.status}`);
      }

      const htmlContent = await response.text();
      const content = this.extractMainContent(htmlContent);
      
      this.displayContent(content);
      this.openOverlay();
      
    } catch (error) {
      console.error('Error loading case study:', error);
      this.showErrorMessage('Não foi possível carregar o estudo de caso. Tente novamente.');
    } finally {
      this.isLoading = false;
      this.hideLoadingState();
    }
  }

  extractMainContent(htmlString) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    
    // Try to find main content container
    const mainContent = doc.querySelector('main') || 
                       doc.querySelector('.case-study') || 
                       doc.querySelector('article') ||
                       doc.body;
    
    if (mainContent) {
      // Clean up navigation and unnecessary elements
      const nav = mainContent.querySelector('nav');
      if (nav) nav.remove();
      
      // Update relative paths for images
      this.updateRelativePaths(mainContent);
      
      return mainContent.innerHTML;
    }
    
    return '<p>Conteúdo não encontrado.</p>';
  }

  updateRelativePaths(container) {
    // Update image sources
    const images = container.querySelectorAll('img[src]');
    images.forEach(img => {
      const src = img.getAttribute('src');
      if (src && !src.startsWith('http') && !src.startsWith('/')) {
        img.setAttribute('src', `case-studies/${src}`);
      }
    });

    // Update other relative paths as needed
    const links = container.querySelectorAll('a[href]');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('../')) {
        link.setAttribute('href', href.replace('../', ''));
      }
    });
  }

  displayContent(content) {
    this.overlayContent.innerHTML = content;
    
    // Add smooth scroll behavior
    this.overlayContent.style.scrollBehavior = 'smooth';
    
    // Scroll to top of content
    setTimeout(() => {
      this.overlayContent.scrollTop = 0;
    }, 100);
  }

  openOverlay() {
    this.overlay.classList.add('active');
    
    // Focus management for accessibility
    const firstFocusable = this.overlayContent.querySelector('a, button, [tabindex]:not([tabindex=\"-1\"])');
    if (firstFocusable) {
      setTimeout(() => firstFocusable.focus(), 300);
    }

    // Add overlay state to history
    if (history.pushState) {
      history.pushState({ overlay: true }, '', '#case-study');
    }
  }

  closeOverlay() {
    this.overlay.classList.remove('active');
    
    // Clear content after animation
    setTimeout(() => {
      this.overlayContent.innerHTML = '';
    }, 300);

    // Handle browser history
    if (history.state && history.state.overlay) {
      history.back();
    }
  }

  handleNavigation(section) {
    switch (section) {
      case 'home':
        this.closeOverlay();
        this.scrollToSection('#inicio');
        break;
      case 'about':
        this.showAboutContent();
        break;
      case 'contact':
        this.showContactContent();
        break;
      default:
        this.scrollToSection(`#${section}`);
    }
  }

  showAboutContent() {
    const aboutContent = `
      <article class="about-content">
        <header style="margin-bottom: var(--space-2xl);">
          <h1 style="font-size: 2.5rem; margin-bottom: var(--space-md);">Sobre</h1>
          <p style="font-size: 1.1rem; opacity: 0.9;">Designer de UX especializado em narrativa, usabilidade e harmonia visual</p>
        </header>
        
        <section style="max-width: 700px;">
          <p style="margin-bottom: var(--space-lg); font-size: 1.1rem; line-height: 1.7;">
            Sou <strong>Tarcisio Bispo de Araujo</strong>, designer de ponta a ponta que une narrativa, 
            usabilidade e harmonia visual. Especializado em campanhas de branding, reestruturação 
            de sites institucionais e soluções digitais que conectam estratégia de negócio com 
            experiência do usuário.
          </p>
          
          <p style="margin-bottom: var(--space-lg); line-height: 1.7;">
            Com experiência em design editorial e experiências digitais, crio soluções claras e 
            centradas no humano através de empatia, estrutura e storytelling. Cada projeto é 
            uma oportunidade de contar uma história que ressoa com as pessoas e gera resultados 
            mensuráveis para o negócio.
          </p>
          
          <div style="margin-top: var(--space-2xl);">
            <h3 style="margin-bottom: var(--space-lg);">Especializações</h3>
            <ul style="list-style: none; padding: 0;">
              <li style="margin-bottom: var(--space-sm);">• UX/UI Design</li>
              <li style="margin-bottom: var(--space-sm);">• Design Editorial</li>
              <li style="margin-bottom: var(--space-sm);">• Branding e Identidade Visual</li>
              <li style="margin-bottom: var(--space-sm);">• Arquitetura de Informação</li>
              <li style="margin-bottom: var(--space-sm);">• Estratégia Digital</li>
            </ul>
          </div>
        </section>
      </article>
    `;
    
    this.displayContent(aboutContent);
    this.openOverlay();
  }

  showContactContent() {
    const contactContent = `
      <article class="contact-content">
        <header style="margin-bottom: var(--space-2xl);">
          <h1 style="font-size: 2.5rem; margin-bottom: var(--space-md);">Entre em Contato</h1>
          <p style="font-size: 1.1rem; opacity: 0.9;">Vamos conversar sobre seu próximo projeto</p>
        </header>
        
        <section style="max-width: 600px;">
          <p style="margin-bottom: var(--space-2xl); font-size: 1.1rem; line-height: 1.7;">
            Estou sempre interessado em novos desafios e oportunidades de colaboração. 
            Se você tem um projeto em mente ou gostaria de discutir como podemos trabalhar 
            juntos, ficarei feliz em conversar.
          </p>
          
          <div style="display: grid; gap: var(--space-lg);">
            <a href="https://www.linkedin.com/in/tarcisiobispouxdesigner" 
               target="_blank" 
               rel="noopener noreferrer"
               style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; transition: all 0.2s ease; text-decoration: none !important;"
               onmouseover="this.style.borderColor='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'; this.style.transform='translateY(0)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div>
                <strong>LinkedIn</strong>
                <br>
                <small style="opacity: 0.7;">Conecte-se comigo profissionalmente</small>
              </div>
            </a>
            
            <a href="https://medium.com/@tarcisiobispodearaujo" 
               target="_blank" 
               rel="noopener noreferrer"
               style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; transition: all 0.2s ease; text-decoration: none !important;"
               onmouseover="this.style.borderColor='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'; this.style.transform='translateY(0)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
              </svg>
              <div>
                <strong>Medium</strong>
                <br>
                <small style="opacity: 0.7;">Leia meus artigos sobre design</small>
              </div>
            </a>
            
            <a href="https://drive.google.com/file/d/102gp9Or9rWkxQyZGHKR8bM-khBhp_CNp/view?usp=drive_link" 
               target="_blank" 
               rel="noopener noreferrer"
               style="display: flex; align-items: center; gap: var(--space-sm); padding: var(--space-md); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; transition: all 0.2s ease; text-decoration: none !important;"
               onmouseover="this.style.borderColor='rgba(255,255,255,0.3)'; this.style.transform='translateY(-2px)'"
               onmouseout="this.style.borderColor='rgba(255,255,255,0.15)'; this.style.transform='translateY(0)'">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <div>
                <strong>Currículo</strong>
                <br>
                <small style="opacity: 0.7;">Baixe meu CV completo</small>
              </div>
            </a>
          </div>
        </section>
      </article>
    `;
    
    this.displayContent(contactContent);
    this.openOverlay();
  }

  scrollToSection(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  showLoadingState() {
    this.overlayContent.innerHTML = '<div class="loading-spinner"></div>';
  }

  hideLoadingState() {
    // Loading state is automatically hidden when content is loaded
  }

  showErrorMessage(message) {
    this.overlayContent.innerHTML = `
      <div style="text-align: center; padding: var(--space-2xl);">
        <h2 style="margin-bottom: var(--space-md);">Ops! Algo deu errado</h2>
        <p style="margin-bottom: var(--space-lg); opacity: 0.8;">${message}</p>
        <button onclick="portfolioNav.closeOverlay()" 
                style="padding: var(--space-sm) var(--space-md); background: transparent; border: 1px solid rgba(255,255,255,0.3); border-radius: 4px; color: white; cursor: pointer;">
          Fechar
        </button>
      </div>
    `;
  }

  handleInitialLoad() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (e) => {
      if (!e.state || !e.state.overlay) {
        this.closeOverlay();
      }
    });

    // Handle direct links to case studies (if hash is present)
    const hash = window.location.hash;
    if (hash === '#case-study') {
      // Could implement deep linking to specific case studies here
    }
  }
}

// Initialize navigation when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.portfolioNav = new PortfolioNavigation();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioNavigation;
}