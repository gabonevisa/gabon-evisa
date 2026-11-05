/* Gabon eVisa — Disqus comments for all HTML pages.
 * ONE-TIME SETUP: replace YOUR_GABON_DISQUS_SHORTNAME with the exact
 * shortname from your Gabon Disqus admin Settings > General page.
 * Do not use a shortname from an unrelated website.
 */
(function () {
  'use strict';

  var DISQUS_SHORTNAME = 'gabon-evisa-online';
  var thread = document.getElementById('disqus_thread');
  var status = document.getElementById('gabon-disqus-status');
  if (!thread) return;

  function message(text) {
    if (status) {
      status.textContent = text;
      status.hidden = false;
    }
  }

  if (!DISQUS_SHORTNAME || DISQUS_SHORTNAME === 'gabon-evisa-online') {
    message('Comments are being set up for this website.');
    console.info('Gabon Disqus: set DISQUS_SHORTNAME in disqus-comments.js to enable comments.');
    return;
  }

  // Validate before composing the third-party script URL.
  if (!/^[a-z0-9][a-z0-9-]*$/i.test(DISQUS_SHORTNAME)) {
    message('Comments are unavailable because the Disqus configuration is invalid.');
    console.error('Gabon Disqus: invalid shortname.');
    return;
  }

  if (window.location.protocol !== 'https:' && window.location.protocol !== 'http:') {
    message('Publish this website online to load comments.');
    return;
  }

  // Stable discussion ID for each HTML filename, regardless of domain or query string.
  // The homepage uses the same identifier for / and /index.html.
  var pathname = window.location.pathname;
  var filename = pathname.substring(pathname.lastIndexOf('/') + 1) || 'index.html';
  var pageKey = filename.replace(/\.html?$/i, '').toLowerCase();
  var canonicalPath = pathname.replace(/\/index\.html?$/i, '/');

  window.disqus_config = function () {
    this.page.url = window.location.origin + canonicalPath;
    this.page.identifier = 'gabon-evisa:' + pageKey;
    this.page.title = document.title;
  };

  message('Loading comments…');
  var s = document.createElement('script');
  s.src = 'https://' + DISQUS_SHORTNAME + '.disqus.com/embed.js';
  s.async = true;
  s.setAttribute('data-timestamp', String(Date.now()));
  s.onload = function () {
    if (status) status.hidden = true;
  };
  s.onerror = function () {
    message('Unable to load comments. Check the Disqus shortname, site settings, and browser content blockers, then refresh.');
  };
  (document.head || document.body).appendChild(s);
})();
