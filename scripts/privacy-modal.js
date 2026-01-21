// privacy-modal.js — opens a modal with privacy.html content when links to /privacy.html are clicked
(function(){
  var modal = null;
  var lastFocused = null;
  var cached = null;

  function createModal(){
    modal = document.createElement('div');
    modal.className = 'privacy-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = "<div class=\"privacy-modal__panel\">"+
      "<div class=\"privacy-modal__header\">"+
        "<h2 class=\"privacy-modal__title\">Política de Privacidade</h2>"+
        "<button class=\"privacy-modal__close\" aria-label=\"Fechar\">✕</button>"+
      "</div>"+
      "<div class=\"privacy-modal__body\" style=\"margin-top:1rem\">"+
        "<p>Este site não coleta nome nem e‑mail porque não há formulários de envio. A política de cookies aqui se aplica apenas ao uso do Google Analytics (métricas) e do LogRocket (diagnóstico e relatórios de sessão).</p>"+
        "<p>Ao aceitar, você autoriza o uso dessas ferramentas para análise e melhoria do site.</p>"+
        "<p>Para ler a política completa, clique em <a href=\"/privacy.html\" target=\"_blank\" rel=\"noopener\">Ler política completa</a>.</p>"+
      "</div>"+
      "<div class=\"privacy-modal__footer\">"+
        "<div style=\"flex:1\"></div>"+
        "<button class=\"privacy-modal__btn\" id=\"privacy-decline\">Fechar</button>"+
        "<button class=\"privacy-modal__btn privacy-modal__btn--primary\" id=\"privacy-accept\">Aceitar</button>"+
      "</div>"+
    "</div>";
    document.body.appendChild(modal);

    modal.querySelector('.privacy-modal__close').addEventListener('click', closeModal);
    modal.querySelector('#privacy-decline').addEventListener('click', closeModal);
    var accept = modal.querySelector('#privacy-accept');
    accept.addEventListener('click', function(){
      try{ window.CookieConsent && window.CookieConsent.accept && window.CookieConsent.accept(); }catch(e){}
      closeModal();
    });

    // close on overlay click
    modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });

    // trap focus and handle Escape/Tab
    modal.addEventListener('keydown', function(e){
      if(e.key === 'Escape') { e.preventDefault(); closeModal(); return; }
      if(e.key === 'Tab'){
        // simple focus trap
        var focusable = modal.querySelectorAll('a[href], button, input, [tabindex]:not([tabindex="-1"])');
        if(!focusable || focusable.length === 0) return;
        focusable = Array.prototype.slice.call(focusable).filter(function(f){ return !f.hasAttribute('disabled') && f.offsetParent !== null; });
        if(focusable.length === 0) return;
        var first = focusable[0];
        var last = focusable[focusable.length -1];
        if(e.shiftKey){ if(document.activeElement === first){ e.preventDefault(); last.focus(); } }
        else { if(document.activeElement === last){ e.preventDefault(); first.focus(); } }
      }
    });
  }

  function openModal(){
    if(!modal) createModal();
    lastFocused = document.activeElement;
    modal.setAttribute('aria-hidden','false');
    modal.style.display = 'flex';
    // prevent background scroll
    try{ document.documentElement.style.overflow = 'hidden'; document.body.style.overflow = 'hidden'; }catch(e){}
    var body = modal.querySelector('.privacy-modal__body');
    body.scrollTop = 0;
    // load content if not cached
    if(cached){ body.innerHTML = cached; focusFirst(); return; }
    fetch('/privacy.html', {cache: 'no-store'}).then(function(r){ if(!r.ok) throw new Error('fetch failed'); return r.text(); }).then(function(text){
      try{
        var parser = new DOMParser();
        var doc = parser.parseFromString(text, 'text/html');
        var main = doc.querySelector('main');
        if(main){ cached = main.innerHTML; body.innerHTML = cached; focusFirst(); return; }
        // fallback: use body
        cached = doc.body.innerHTML;
        body.innerHTML = cached;
        focusFirst();
      }catch(e){
        body.innerHTML = '<p>Erro ao carregar conteúdo. Abrindo página completa...</p>';
        setTimeout(function(){ window.location.href = '/privacy.html'; }, 800);
      }
    }).catch(function(){
      // fallback to navigation
      window.location.href = '/privacy.html';
    });
  }

  function focusFirst(){
    var close = modal.querySelector('.privacy-modal__close');
    if(close) close.focus();
  }

  function closeModal(){
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.style.display = 'none';
    var checkbox = modal.querySelector('#privacy-agree-checkbox'); if(checkbox) checkbox.checked = false;
    var accept = modal.querySelector('#privacy-accept'); if(accept) accept.disabled = true;
    try{ if(lastFocused) lastFocused.focus(); }catch(e){}
    // restore scroll
    try{ document.documentElement.style.overflow = ''; document.body.style.overflow = ''; }catch(e){}
  }

  // attach to links
  document.addEventListener('click', function(e){
    var a = e.target.closest && e.target.closest('a[href]');
    if(!a) return;
    var href = a.getAttribute('href');
    if(href === '/privacy.html' || href === 'privacy.html'){
      e.preventDefault();
      openModal();
    }
  }, true);

})();
