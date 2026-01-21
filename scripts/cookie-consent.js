// cookie-consent.js — carrega analytics somente após consentimento
(function(){
  var CONSENT_KEY = 'cookie_consent';

  function setConsent(value){
    try{ localStorage.setItem(CONSENT_KEY, value); }catch(e){}
  }

  function getConsent(){
    try{ return localStorage.getItem(CONSENT_KEY); }catch(e){ return null; }
  }

  function loadScript(src, cb){
    var s = document.createElement('script');
    s.src = src; s.async = true;
    s.onload = cb || function(){};
    document.head.appendChild(s);
  }

  function initGtag(){
    if(window.gtagInitialized) return;
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);} window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-3QCW5SKK73', { 'anonymize_ip': true });
    window.gtagInitialized = true;
  }

  function loadAnalytics(){
    // load gtag script then init
    if(window.gtagInitialized) return;
    loadScript('https://www.googletagmanager.com/gtag/js?id=G-3QCW5SKK73', initGtag);
    // also load LogRocket for session replay/diagnostics
    if(!window._logrocketLoaded){
      var s = document.createElement('script');
      s.src = 'https://cdn.logr-in.com/LogRocket.min.js';
      s.crossOrigin = 'anonymous';
      s.async = true;
      s.onload = function(){ try{ window.LogRocket && window.LogRocket.init && window.LogRocket.init('fatqpp/portfolio-kbfin'); }catch(e){} };
      document.head.appendChild(s);
      window._logrocketLoaded = true;
    }
  }

  // Expose handlers for UI
  window.CookieConsent = {
    accept: function(){ setConsent('accepted'); loadAnalytics(); hideBanner(); },
    decline: function(){ setConsent('declined'); hideBanner(); },
    status: getConsent
  };

  function hideBanner(){
    try{ var b = document.getElementById('cookie-banner'); if(b) b.setAttribute('aria-hidden','true'); }catch(e){}
  }

  // Wire up existing banner buttons if present
  document.addEventListener('DOMContentLoaded', function(){
    var accept = document.getElementById('accept-cookies');
    var decline = document.getElementById('decline-cookies');
    if(accept) accept.addEventListener('click', function(e){ e.preventDefault(); CookieConsent.accept(); });
    if(decline) decline.addEventListener('click', function(e){ e.preventDefault(); CookieConsent.decline(); });

    // If consent already given, load analytics
    var c = getConsent();
    if(c === 'accepted'){ loadAnalytics(); hideBanner(); }
    if(c === 'declined'){ hideBanner(); }
  });

})();
