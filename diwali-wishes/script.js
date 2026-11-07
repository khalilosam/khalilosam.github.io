/**
 * Happy Diwali - Osama Khalil Festive Greeting
 * Interactive Canvas Animations, Web Audio Generative Music, Diya Lighting & Sharing Engine
 */

(function () {
  'use strict';

  // --- State Management ---
  const state = {
    isDiyaLit: false,
    flameCount: 1,
    isMusicPlaying: false,
    recipientName: '',
    audioCtx: null,
    ambientGain: null,
    ambientTimer: null,
    mouse: { x: -1000, y: -1000, active: false }
  };

  // --- DOM Elements ---
  const canvas = document.getElementById('particleCanvas');
  const ctx = canvas.getContext('2d');

  const diyaStage = document.getElementById('diyaStage');
  const diyaFlameGroup = document.getElementById('diyaFlameGroup');
  const lightDiyaBtn = document.getElementById('lightDiyaBtn');
  const lightDiyaBtnText = document.getElementById('lightDiyaBtnText');
  const ceremonyStatusMsg = document.getElementById('ceremonyStatusMsg');
  const flameCountDisplay = document.getElementById('flameCountDisplay');
  const soundToggleBtn = document.getElementById('soundToggleBtn');
  const soundStatusText = document.querySelector('.sound-status-text');

  const personalizedBanner = document.getElementById('personalizedBanner');
  const recipientNameDisplay = document.getElementById('recipientNameDisplay');
  const recipientInput = document.getElementById('recipientInput');
  const applyNameBtn = document.getElementById('applyNameBtn');
  const previewSalutation = document.getElementById('previewSalutation');
  const presetButtons = document.querySelectorAll('.preset-btn');

  const mainShareBtn = document.getElementById('mainShareBtn');
  const copyLinkBtn = document.getElementById('copyLinkBtn');
  const copyBtnText = document.getElementById('copyBtnText');
  const shareWhatsapp = document.getElementById('shareWhatsapp');
  const shareLinkedin = document.getElementById('shareLinkedin');
  const shareTwitter = document.getElementById('shareTwitter');

  const toastNotification = document.getElementById('toastNotification');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  const pillarCards = document.querySelectorAll('.pillar-card');

  // --- Reduced Motion Detection ---
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ==========================================================================
  // 1. CANVAS ENGINE: Golden Particles & Fireworks
  // ==========================================================================

  let canvasWidth = (canvas.width = window.innerWidth);
  let canvasHeight = (canvas.height = window.innerHeight);
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    canvasWidth = window.innerWidth;
    canvasHeight = window.innerHeight;
    canvas.width = canvasWidth * dpr;
    canvas.height = canvasHeight * dpr;
    ctx.scale(dpr, dpr);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // Track mouse/touch for interactive particle drift
  window.addEventListener('mousemove', (e) => {
    state.mouse.x = e.clientX;
    state.mouse.y = e.clientY;
    state.mouse.active = true;
  });

  window.addEventListener('mouseleave', () => {
    state.mouse.active = false;
  });

  // Ambient Floating Dust & Fireflies
  const particles = [];
  const particleCount = prefersReducedMotion ? 15 : (canvasWidth < 600 ? 32 : 55);

  class GoldParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * canvasWidth;
      this.y = initial ? Math.random() * canvasHeight : canvasHeight + 10;
      this.size = Math.random() * 2.5 + 0.8;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = Math.random() * 0.6 + 0.25;
      this.maxOpacity = this.opacity;
      this.pulseSpeed = Math.random() * 0.02 + 0.008;
      this.pulseVal = Math.random() * Math.PI;
      this.color = Math.random() > 0.4 ? '#FFD700' : '#FF9E0D';
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.pulseVal) * 0.3;
      this.pulseVal += this.pulseSpeed;

      // React gently to mouse proximity
      if (state.mouse.active) {
        const dx = this.x - state.mouse.x;
        const dy = this.y - state.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const force = (100 - dist) / 100;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
        }
      }

      if (this.y < -20 || this.x < -20 || this.x > canvasWidth + 20) {
        this.reset();
      }
    }

    draw() {
      const currentOpacity = (Math.sin(this.pulseVal) * 0.3 + 0.7) * this.opacity;
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, Math.min(1, currentOpacity));
      ctx.shadowBlur = this.size * 4;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function initParticles() {
    particles.length = 0;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new GoldParticle());
    }
  }

  // Fireworks Spark Engine
  const fireworksSparks = [];

  class Spark {
    constructor(x, y, color, velocity, decay, gravity = 0.05) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.vx = velocity.x;
      this.vy = velocity.y;
      this.alpha = 1;
      this.decay = decay || Math.random() * 0.015 + 0.012;
      this.gravity = gravity;
      this.size = Math.random() * 2.2 + 1.2;
    }

    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.globalAlpha = Math.max(0, this.alpha);
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function triggerBurst(x, y, count = 40, colors = ['#FFF2A3', '#FFD700', '#FF9E0D', '#FF5722']) {
    if (prefersReducedMotion) return;
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 5 + 1.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      fireworksSparks.push(
        new Spark(
          x,
          y,
          color,
          { x: Math.cos(angle) * speed, y: Math.sin(angle) * speed },
          Math.random() * 0.02 + 0.01,
          0.06
        )
      );
    }
  }

  // Periodic subtle festive fireworks in the background
  let lastAmbientBurst = 0;
  function triggerAmbientBurst(timestamp) {
    if (prefersReducedMotion) return;
    if (timestamp - lastAmbientBurst > 4800) {
      lastAmbientBurst = timestamp;
      const x = Math.random() * (canvasWidth * 0.8) + canvasWidth * 0.1;
      const y = Math.random() * (canvasHeight * 0.35) + 60;
      triggerBurst(x, y, 28, ['#FFEAA7', '#FFD700', '#FFB703']);
    }
  }

  // Animation Loop
  function animate(timestamp) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Update ambient particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
    }

    // Update & clean sparks
    for (let i = fireworksSparks.length - 1; i >= 0; i--) {
      const spark = fireworksSparks[i];
      spark.update();
      spark.draw();
      if (spark.alpha <= 0) {
        fireworksSparks.splice(i, 1);
      }
    }

    triggerAmbientBurst(timestamp);
    requestAnimationFrame(animate);
  }

  resizeCanvas();
  initParticles();
  requestAnimationFrame(animate);

  // Click on background triggers gentle spark cascade
  window.addEventListener('click', (e) => {
    // Only if not clicking buttons or interactive forms
    if (!e.target.closest('button, a, input, [role="button"]')) {
      triggerBurst(e.clientX, e.clientY, 18);
    }
  });

  // ==========================================================================
  // 2. PROCEDURAL WEB AUDIO SYNTHESIZER (Calm Ambient Harmonic Soundscape)
  // ==========================================================================

  function initAudio() {
    if (state.audioCtx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      state.audioCtx = new AudioContext();

      // Master output gain node
      state.ambientGain = state.audioCtx.createGain();
      state.ambientGain.gain.setValueAtTime(0.0001, state.audioCtx.currentTime);
      state.ambientGain.connect(state.audioCtx.destination);
    } catch (err) {
      console.warn('Web Audio API not supported in this environment.', err);
    }
  }

  // Plays a soothing meditative chord drone
  let droneNodes = [];

  function startAmbientDrone() {
    if (!state.audioCtx) initAudio();
    if (!state.audioCtx) return;

    if (state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }

    // Frequencies for a warm pentatonic meditative drone (E3, B3, E4, G#4, B4)
    const baseFreqs = [164.81, 246.94, 329.63, 415.30];

    droneNodes = baseFreqs.map((freq, idx) => {
      const osc = state.audioCtx.createOscillator();
      const oscGain = state.audioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Subtle detune for rich warm acoustic shimmer
      osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 1.5, state.audioCtx.currentTime);

      oscGain.gain.setValueAtTime(0.04 / (idx + 1), state.audioCtx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(state.ambientGain);
      osc.start();

      return { osc, gain: oscGain };
    });

    // Smooth volume fade-in
    state.ambientGain.gain.linearRampToValueAtTime(0.18, state.audioCtx.currentTime + 2.0);

    // Schedule gentle random chime intervals (tanpura/temple bell tone)
    scheduleHarmonicChime();
  }

  function stopAmbientDrone() {
    if (!state.ambientGain || !state.audioCtx) return;

    // Smooth volume fade-out
    state.ambientGain.gain.linearRampToValueAtTime(0.0001, state.audioCtx.currentTime + 1.0);

    setTimeout(() => {
      droneNodes.forEach(({ osc }) => {
        try {
          osc.stop();
          osc.disconnect();
        } catch (e) {}
      });
      droneNodes = [];
      if (state.ambientTimer) clearTimeout(state.ambientTimer);
    }, 1100);
  }

  function scheduleHarmonicChime() {
    if (!state.isMusicPlaying) return;
    const delay = Math.random() * 3500 + 2500;
    state.ambientTimer = setTimeout(() => {
      if (state.isMusicPlaying) {
        playSingleChime();
        scheduleHarmonicChime();
      }
    }, delay);
  }

  function playSingleChime(freqChoice) {
    if (!state.audioCtx || state.audioCtx.state !== 'running') return;
    const chimeFreqs = [329.63, 415.30, 493.88, 659.25, 830.61]; // E4, G#4, B4, E5, G#5
    const freq = freqChoice || chimeFreqs[Math.floor(Math.random() * chimeFreqs.length)];

    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);

    gain.gain.setValueAtTime(0.0001, state.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.09, state.audioCtx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + 2.4);

    osc.connect(gain);
    gain.connect(state.ambientGain);

    osc.start();
    osc.stop(state.audioCtx.currentTime + 2.5);
  }

  // Celebratory Diya Lighting Chime (Arpeggiated uplifting harmonic chord)
  function playDiyaLightingChime() {
    if (!state.audioCtx) initAudio();
    if (!state.audioCtx) return;

    if (state.audioCtx.state === 'suspended') {
      state.audioCtx.resume();
    }

    const notes = [329.63, 415.30, 493.88, 659.25, 987.77]; // E, G#, B, E, B
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        const osc = state.audioCtx.createOscillator();
        const gain = state.audioCtx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, state.audioCtx.currentTime);

        gain.gain.setValueAtTime(0.0001, state.audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(0.12, state.audioCtx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + 1.8);

        osc.connect(gain);
        gain.connect(state.audioCtx.destination);

        osc.start();
        osc.stop(state.audioCtx.currentTime + 2.0);
      }, idx * 120);
    });
  }

  // Toggle Music Button Click
  soundToggleBtn.addEventListener('click', () => {
    state.isMusicPlaying = !state.isMusicPlaying;
    soundToggleBtn.setAttribute('aria-pressed', state.isMusicPlaying.toString());

    if (state.isMusicPlaying) {
      soundToggleBtn.classList.add('playing');
      soundStatusText.textContent = 'ON';
      startAmbientDrone();
      showToast('Ambient festive music enabled 🎶', '🎵');
    } else {
      soundToggleBtn.classList.remove('playing');
      soundStatusText.textContent = 'OFF';
      stopAmbientDrone();
      showToast('Ambient music turned off', '🔇');
    }
  });

  // ==========================================================================
  // 3. INTERACTIVE CEREMONIAL DIYA LOGIC
  // ==========================================================================

  // Load persisted flame counter
  try {
    const savedCount = localStorage.getItem('diwali_osama_flame_count');
    if (savedCount) {
      state.flameCount = parseInt(savedCount, 10) || 1;
      flameCountDisplay.textContent = state.flameCount.toLocaleString();
    }
  } catch (e) {}

  function kindleDiya(event) {
    state.isDiyaLit = true;
    diyaStage.classList.add('lit');
    diyaStage.setAttribute('aria-pressed', 'true');
    diyaFlameGroup.classList.remove('unlit');
    diyaFlameGroup.classList.add('lit');

    // Button state update
    lightDiyaBtnText.textContent = 'Diya is Radiant ✨';
    ceremonyStatusMsg.innerHTML = '✦ The flame of peace and shared humanity is burning bright! ✦';
    ceremonyStatusMsg.style.color = '#FFF2A3';

    // Increment flame counter
    state.flameCount += 1;
    flameCountDisplay.textContent = state.flameCount.toLocaleString();
    try {
      localStorage.setItem('diwali_osama_flame_count', state.flameCount.toString());
    } catch (e) {}

    // Audio chime
    playDiyaLightingChime();

    // Visual Sparkle explosion from diya center
    const rect = diyaStage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height * 0.45;

    triggerBurst(centerX, centerY, 55, ['#FFFFFF', '#FFF2A3', '#FFD700', '#FF9E0D', '#FF5722']);

    showToast('You lit the Diya of Unity & Light! 🪔✨', '🪔');
  }

  diyaStage.addEventListener('click', kindleDiya);
  diyaStage.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      kindleDiya(e);
    }
  });

  lightDiyaBtn.addEventListener('click', kindleDiya);

  // Nav link smooth scroll & kindle
  const navLightLink = document.getElementById('navLightLink');
  if (navLightLink) {
    navLightLink.addEventListener('click', (e) => {
      setTimeout(() => {
        kindleDiya(e);
      }, 500);
    });
  }

  // ==========================================================================
  // 4. FOUR PILLARS OF LIGHT BLESSINGS
  // ==========================================================================

  pillarCards.forEach((card) => {
    const handlePillarClick = () => {
      const pillar = card.getAttribute('data-pillar');
      const rect = card.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      triggerBurst(x, y, 22, ['#FFF2A3', '#FFD700', '#FFA500']);
      playSingleChime();

      card.classList.add('active');
      const pillarTitles = {
        peace: 'Light of Peace',
        kindness: 'Light of Kindness',
        prosperity: 'Light of Prosperity',
        hope: 'Light of Hope'
      };

      showToast(`${pillarTitles[pillar] || 'Blessing'} illuminated for you! ✨`, '🪔');
    };

    card.addEventListener('click', handlePillarClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handlePillarClick();
      }
    });
  });

  // ==========================================================================
  // 5. PERSONALIZED CARD CREATOR & SHARING STUDIO
  // ==========================================================================

  function getBaseShareUrl() {
    // Current page URL stripped of queries
    const url = new URL(window.location.href);
    url.search = '';
    return url.href.replace(/\/$/, '') + '/';
  }

  function getShareableUrl(name) {
    const base = getBaseShareUrl();
    if (!name || !name.trim()) return base;
    return `${base}?to=${encodeURIComponent(name.trim())}`;
  }

  function updateRecipient(name, showNotification = true) {
    const cleaned = (name || '').trim();
    state.recipientName = cleaned;

    if (cleaned) {
      previewSalutation.textContent = `Dear ${cleaned},`;
      recipientNameDisplay.textContent = cleaned;
      personalizedBanner.style.display = 'block';
      recipientInput.value = cleaned;
    } else {
      previewSalutation.textContent = 'To Everyone Celebrating,';
      personalizedBanner.style.display = 'none';
      recipientInput.value = '';
    }

    updateSocialLinks(cleaned);

    if (showNotification && cleaned) {
      showToast(`Greeting updated for "${cleaned}"! ✨`, '✉️');
    }
  }

  function updateSocialLinks(name) {
    const shareUrl = getShareableUrl(name);
    const greetingText = name
      ? `Warm Diwali wishes to ${name}! May the light of Diwali bring happiness, peace, prosperity, and new beginnings into your life. “Different traditions, one beautiful humanity.” — Warm wishes from Osama Khalil: ${shareUrl}`
      : `Warm Diwali greetings from Osama Khalil! “Different traditions, one beautiful humanity. May your life always shine with happiness, kindness, and endless possibilities.” Read and light a diya here: ${shareUrl}`;

    // WhatsApp
    shareWhatsapp.href = `https://api.whatsapp.com/send?text=${encodeURIComponent(greetingText)}`;

    // LinkedIn
    shareLinkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    // Twitter / X
    shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      name ? `Warm Diwali wishes to ${name}!` : 'शुभ दीपावली! Warm Diwali wishes celebrating peace, light & humanity.'
    )}&url=${encodeURIComponent(shareUrl)}`;
  }

  // Input events
  applyNameBtn.addEventListener('click', () => {
    updateRecipient(recipientInput.value, true);
  });

  recipientInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      updateRecipient(recipientInput.value, true);
    }
  });

  recipientInput.addEventListener('input', () => {
    // Instant live preview
    const cleaned = recipientInput.value.trim();
    previewSalutation.textContent = cleaned ? `Dear ${cleaned},` : 'To Everyone Celebrating,';
    updateSocialLinks(cleaned);
  });

  // Preset buttons
  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const preset = btn.getAttribute('data-preset');
      recipientInput.value = preset;
      updateRecipient(preset, true);
    });
  });

  // Native Web Share API or Clipboard Fallback
  async function shareGreeting() {
    const name = state.recipientName;
    const shareUrl = getShareableUrl(name);
    const shareTitle = name
      ? `Diwali Wishes for ${name} from Osama Khalil`
      : `शुभ दीपावली | Diwali Greetings from Osama Khalil`;
    const shareText = `“Different traditions, one beautiful humanity. May your life always shine with happiness, kindness, and endless possibilities.” — Osama Khalil`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
        showToast('Shared successfully! ✨', '🎉');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          // If native share failed, proceed to copy
          copyShareLink(shareUrl);
        }
      }
    } else {
      copyShareLink(shareUrl);
    }
  }

  mainShareBtn.addEventListener('click', shareGreeting);

  // Copy Link Button
  function copyShareLink(urlToCopy) {
    const url = urlToCopy || getShareableUrl(state.recipientName);
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(url)
        .then(() => {
          showToast('Shareable link copied to clipboard! 📋✨', '✨');
          flashCopyButton();
        })
        .catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
  }

  function fallbackCopy(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      showToast('Shareable link copied to clipboard! 📋✨', '✨');
      flashCopyButton();
    } catch (err) {
      showToast('Could not auto-copy. Please copy from URL bar.', '⚠️');
    }
    document.body.removeChild(textArea);
  }

  function flashCopyButton() {
    const originalText = copyBtnText.textContent;
    copyBtnText.textContent = 'Link Copied! ✓';
    copyLinkBtn.style.borderColor = 'var(--color-gold-bright)';
    setTimeout(() => {
      copyBtnText.textContent = originalText;
      copyLinkBtn.style.borderColor = '';
    }, 2500);
  }

  copyLinkBtn.addEventListener('click', () => copyShareLink());

  // Check URL parameters on page load (?to=Name or ?name=Name)
  function parseUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const toParam = params.get('to') || params.get('name');
    if (toParam) {
      updateRecipient(toParam, false);
    } else {
      updateSocialLinks('');
    }
  }

  // ==========================================================================
  // 6. TOAST NOTIFICATION UTILITY
  // ==========================================================================

  let toastTimeout = null;

  function showToast(message, icon = '✨') {
    toastMsg.textContent = message;
    toastIcon.textContent = icon;
    toastNotification.classList.add('visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('visible');
    }, 3600);
  }

  // ==========================================================================
  // 7. SCROLL REVEAL OBSERVER
  // ==========================================================================

  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('revealed'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  }

  // ==========================================================================
  // INITIALIZE ON DOM READY
  // ==========================================================================

  document.addEventListener('DOMContentLoaded', () => {
    parseUrlParams();
    initScrollReveal();

    // Kindness easter egg: light diya automatically with gentle warmth after 1.5s
    // so the visitor immediately beholds a luminous glowing scene
    setTimeout(() => {
      kindleDiya();
    }, 1200);
  });
})();
