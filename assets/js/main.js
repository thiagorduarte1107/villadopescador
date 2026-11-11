/**
 * CHAPA 2 - NOVA VISÃO | CONDOMÍNIO VILLA DO PESCADOR
 * Main Interactive Portal Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // 1. PDF INTERACTIVE VIEWER STATE & LOGIC
  // ==========================================
  const totalPdfPages = 10;
  let currentPdfPage = 1;

  const pdfPageMeta = [
    { num: 1, title: "Capa Oficial & Identidade", desc: "Apresentação da CHAPA 2 • Nova Visão para o Villa do Pescador" },
    { num: 2, title: "Governança & Transparência", desc: "Patrimônio coletivo, conformidade estatutária e prestação aberta" },
    { num: 3, title: "Infraestrutura Náutica", desc: "Guarda-barcos estruturado, monitoramento 24h e Boat Wash" },
    { num: 4, title: "Minimercado Autônomo 24h", desc: "Custo ZERO de instalação e receita comercial revertida ao condomínio" },
    { num: 5, title: "Baias de Lazer Náutico", desc: "Quiosques gourmet familiares às margens do lago com privacidade" },
    { num: 6, title: "Recicla Villa & Economia", desc: "R$ 3,00/kg pago ao morador e lucro aplicado em melhorias" },
    { num: 7, title: "Acessibilidade & TEA", desc: "Rampas NBR 9050 e Espaço Sensorial para famílias e crianças atípicas" },
    { num: 8, title: "Equatorial & Construtora", desc: "Cobrança técnica diária de energia e ação jurídica com construtora" },
    { num: 9, title: "Nossa Equipe & Organograma", desc: "Diretoria Executiva, Conselho Fiscal e Suplentes qualificados" },
    { num: 10, title: "Guia do Eleitor & Voto", desc: "Procedimento de voto presencial e procuração simples sem burocracia" }
  ];

  const pageImg = document.getElementById('pdfCurrentPageImg');
  const pageIndicator = document.getElementById('pdfPageIndicator');
  const pageTitleBadge = document.getElementById('pdfPageTitleBadge');
  const btnPrev = document.getElementById('btnPdfPrev');
  const btnNext = document.getElementById('btnPdfNext');
  const thumbButtons = document.querySelectorAll('.pdf-thumb-btn');
  const tocItems = document.querySelectorAll('.pdf-toc-item');
  const pageWrapper = document.getElementById('pdfPageWrapper');

  function updatePdfViewer(pageIndex) {
    if (pageIndex < 1) pageIndex = 1;
    if (pageIndex > totalPdfPages) pageIndex = totalPdfPages;
    currentPdfPage = pageIndex;

    const meta = pdfPageMeta[currentPdfPage - 1];

    // Smooth fade
    if (pageImg) {
      pageImg.style.opacity = '0.3';
      setTimeout(() => {
        pageImg.src = `assets/images/pages/page_${currentPdfPage}.webp`;
        pageImg.alt = `Página ${currentPdfPage} - ${meta.title}`;
        pageImg.dataset.full = `assets/images/pages/page_${currentPdfPage}.png`;
        pageImg.style.opacity = '1';
      }, 120);
    }

    if (pageIndicator) {
      pageIndicator.textContent = `Página ${currentPdfPage} de ${totalPdfPages}`;
    }
    if (pageTitleBadge) {
      pageTitleBadge.textContent = `${meta.title} — ${meta.desc}`;
    }

    // Nav buttons state
    if (btnPrev) btnPrev.disabled = (currentPdfPage === 1);
    if (btnNext) btnNext.disabled = (currentPdfPage === totalPdfPages);

    // Update active thumb and aria attributes
    thumbButtons.forEach((btn, idx) => {
      if (idx + 1 === currentPdfPage) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'page');
        btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }
    });

    // UX Performance: Preload adjacent PDF pages into browser cache
    if (currentPdfPage < totalPdfPages) {
      const preloadNext = new Image();
      preloadNext.src = `assets/images/pages/page_${currentPdfPage + 1}.webp`;
    }
    if (currentPdfPage > 1) {
      const preloadPrev = new Image();
      preloadPrev.src = `assets/images/pages/page_${currentPdfPage - 1}.webp`;
    }
  }

  if (btnPrev) {
    btnPrev.addEventListener('click', () => updatePdfViewer(currentPdfPage - 1));
  }
  if (btnNext) {
    btnNext.addEventListener('click', () => updatePdfViewer(currentPdfPage + 1));
  }

  thumbButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetPage = parseInt(btn.dataset.page, 10);
      if (!isNaN(targetPage)) updatePdfViewer(targetPage);
    });
  });

  tocItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = parseInt(item.dataset.page, 10);
      if (!isNaN(targetPage)) {
        updatePdfViewer(targetPage);
        const section = document.getElementById('plano-gestao');
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Touch swipe support on PDF preview
  let touchStartX = 0;
  let touchEndX = 0;
  if (pageWrapper) {
    pageWrapper.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    pageWrapper.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });

    // Click to zoom in modal
    pageWrapper.addEventListener('click', () => {
      const meta = pdfPageMeta[currentPdfPage - 1];
      openModal(
        `Plano de Gestão — Página ${currentPdfPage}: ${meta.title}`,
        `assets/images/pages/page_${currentPdfPage}.png`,
        `assets/images/pages/page_${currentPdfPage}.png`
      );
    });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 45) {
      if (diff < 0) {
        // Swipe left -> Next
        updatePdfViewer(currentPdfPage + 1);
      } else {
        // Swipe right -> Prev
        updatePdfViewer(currentPdfPage - 1);
      }
    }
  }

  // Keyboard navigation for PDF
  window.addEventListener('keydown', (e) => {
    const modal = document.getElementById('universalModal');
    if (modal && modal.classList.contains('open')) return;
    if (e.key === 'ArrowRight') updatePdfViewer(currentPdfPage + 1);
    if (e.key === 'ArrowLeft') updatePdfViewer(currentPdfPage - 1);
  });

  // ==========================================
  // 2. UNIVERSAL LIGHTBOX / MODAL
  // ==========================================
  const modal = document.getElementById('universalModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalImg = document.getElementById('modalImg');
  const modalDownloadBtn = document.getElementById('modalDownloadBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  let lastActiveElement = null;

  function openModal(title, imgSrc, downloadSrc, triggerEl) {
    if (!modal) return;
    lastActiveElement = triggerEl || document.activeElement;
    modalTitle.textContent = title;
    modalImg.src = imgSrc;
    modalImg.alt = title;
    modalDownloadBtn.href = downloadSrc || imgSrc;
    modalDownloadBtn.setAttribute('download', (downloadSrc || imgSrc).split('/').pop());

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';

    // Focus close button for accessibility
    setTimeout(() => {
      modalCloseBtn?.focus();
    }, 100);
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (modalImg) modalImg.src = '';
    }, 200);

    // Restore focus to original element
    if (lastActiveElement && typeof lastActiveElement.focus === 'function') {
      lastActiveElement.focus();
    }
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal && modal.classList.contains('open')) {
        closeModal();
      } else if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        btnMobileMenu.textContent = '☰';
        btnMobileMenu.setAttribute('aria-expanded', 'false');
      }
    }
  });

  // Attach modal trigger to any element with data-modal-src
  document.querySelectorAll('[data-modal-src]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const title = el.dataset.modalTitle || 'Visualização do Material';
      const src = el.dataset.modalSrc;
      const download = el.dataset.modalDownload || src;
      openModal(title, src, download, el);
    });
  });

  // ==========================================
  // 3. GALLERY FILTER TABS
  // ==========================================
  const filterTabs = document.querySelectorAll('.gallery-tab-btn');
  const galleryItems = document.querySelectorAll('.gallery-card-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'flex';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // ==========================================
  // 4. MOBILE NAVIGATION DRAWER
  // ==========================================
  const btnMobileMenu = document.getElementById('btnMobileMenu');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerLinks = document.querySelectorAll('.mobile-drawer-link');

  if (btnMobileMenu && mobileDrawer) {
    btnMobileMenu.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      btnMobileMenu.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      btnMobileMenu.textContent = isOpen ? '✕' : '☰';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        btnMobileMenu.textContent = '☰';
      });
    });
  }

  // ==========================================
  // 5. STICKY HEADER & SCROLL SPY
  // ==========================================
  const headerNav = document.querySelector('.header-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      headerNav?.classList.add('scrolled');
    } else {
      headerNav?.classList.remove('scrolled');
    }
  }, { passive: true });

  // ==========================================
  // 6. SHARE HANDLER (WHATSAPP / NATIVE SHARE) & URL /chapa2
  // ==========================================
  // Normalizar URL no navegador para /chapa2
  if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
    const newUrl = '/chapa2' + window.location.hash;
    window.history.replaceState(null, '', newUrl);
  }

  const getCampaignShareUrl = () => {
    return `${window.location.origin}/chapa2`;
  };

  const shareButtons = document.querySelectorAll('.btn-share-campaign');
  const getShareData = () => ({
    title: 'CHAPA 2 • NOVA VISÃO | Villa do Pescador',
    text: 'Olá, vizinho(a)! Conheça as propostas, a equipe e o Plano de Gestão Oficial da CHAPA 2 para o nosso Condomínio Villa do Pescador. Vote em quem tem experiência comprovada!',
    url: getCampaignShareUrl()
  });

  shareButtons.forEach(btn => {
    btn.addEventListener('click', async (e) => {
      e.preventDefault();
      if (navigator.share) {
        try {
          await navigator.share(getShareData());
          showToast('Compartilhado com sucesso!');
        } catch (err) {
          if (err.name !== 'AbortError') {
            fallbackWhatsAppShare();
          }
        }
      } else {
        fallbackWhatsAppShare();
      }
    });
  });

  function fallbackWhatsAppShare() {
    const textMsg = encodeURIComponent(
      `👋 *Olá, vizinho(a) do Villa do Pescador!*\n\n` +
      `Gostaríamos de convidar você a conhecer as propostas, a equipe e o Plano de Gestão Oficial da *CHAPA 2 • NOVA VISÃO* para o nosso condomínio! 🏡✨\n\n` +
      `📌 *Nossos Principais Compromissos:*\n` +
      `• Minimercado autônomo 24h & conveniência interna\n` +
      `• Baias de lazer náutico e guarda-barcos estruturado\n` +
      `• Coleta seletiva e sustentabilidade (Recicla Villa)\n` +
      `• Gestão financeira transparente com prestação de contas rigorosa\n` +
      `• Equipe com 5 anos de experiência comprovada de síndico/subsíndico e contas aprovadas\n\n` +
      `📄 Acesse nosso portal interativo, veja as fotos, conheça cada candidato e baixe o *Plano de Gestão Oficial em PDF*:\n` +
      `${getCampaignShareUrl()}\n\n` +
      `🗳️ _Vote em quem tem experiência comprovada, dedicação e transparência pelo Villa do Pescador!_`
    );
    const waUrl = `https://api.whatsapp.com/send?text=${textMsg}`;
    window.open(waUrl, '_blank');
  }

  // Direct WhatsApp Share Handler for each Card
  document.querySelectorAll('.btn-card-share').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const title = btn.dataset.shareTitle || 'CHAPA 2 • NOVA VISÃO';
      const text = btn.dataset.shareText || 'Confira os projetos e a equipe da CHAPA 2 para o Condomínio Villa do Pescador:';
      const campaignUrl = getCampaignShareUrl();

      const waMsg = encodeURIComponent(
        `👋 *Olá, vizinho(a)!*\n\n` +
        `Veja essa proposta da *CHAPA 2 • NOVA VISÃO* para o nosso condomínio:\n\n` +
        `📌 *${title}*\n` +
        `${text}\n\n` +
        `📲 Conheça todas as propostas, a equipe e o Plano de Gestão Oficial:\n${campaignUrl}\n\n` +
        `🤝 _Vote CHAPA 2: Experiência comprovada e compromisso com o Villa do Pescador!_`
      );

      const waUrl = `https://api.whatsapp.com/send?text=${waMsg}`;
      window.open(waUrl, '_blank');
      showToast('Abrindo WhatsApp...');
    });
  });

  // Modal WhatsApp button
  const modalShareWaBtn = document.getElementById('modalShareWaBtn');
  if (modalShareWaBtn) {
    modalShareWaBtn.addEventListener('click', () => {
      const title = modalTitle?.textContent || 'CHAPA 2 • NOVA VISÃO';
      const campaignUrl = getCampaignShareUrl();
      const waMsg = encodeURIComponent(
        `👋 *Olá, vizinho(a)!*\n\n` +
        `Confira este material oficial da *CHAPA 2 • NOVA VISÃO* para o Condomínio Villa do Pescador:\n\n` +
        `📌 *${title}*\n\n` +
        `📲 Acesse o portal completo, conheça a equipe e baixe o Plano de Gestão:\n${campaignUrl}\n\n` +
        `🤝 _Vote CHAPA 2: Experiência comprovada pelo nosso condomínio!_`
      );
      const waUrl = `https://api.whatsapp.com/send?text=${waMsg}`;
      window.open(waUrl, '_blank');
      showToast('Abrindo WhatsApp...');
    });
  }

  // ==========================================
  // 7. TOAST NOTIFICATION UTILITY
  // ==========================================
  const toast = document.getElementById('toastMsg');
  function showToast(msg) {
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // ==========================================
  // 8. MODERN UNIVERSAL CAROUSEL CONTROLLER
  // ==========================================
  function initModernCarousel({ wrapperId, trackId, prevBtnId, nextBtnId, dotsId, counterId }) {
    const wrapper = document.getElementById(wrapperId);
    if (!wrapper) return;

    const track = document.getElementById(trackId);
    const btnPrev = document.getElementById(prevBtnId);
    const btnNext = document.getElementById(nextBtnId);
    const dotsContainer = document.getElementById(dotsId);
    const counter = document.getElementById(counterId);

    if (!track) return;

    const slides = Array.from(track.querySelectorAll('.carousel-slide'));
    const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isScrolling = false;

    if (counter) {
      const totalEl = counter.querySelector('.carousel-total');
      if (totalEl) totalEl.textContent = totalSlides;
    }

    function updateControls() {
      // Update counter
      if (counter) {
        const curEl = counter.querySelector('.carousel-current');
        if (curEl) curEl.textContent = currentIndex + 1;
      }

      // Update Prev / Next buttons
      if (btnPrev) btnPrev.disabled = (currentIndex === 0);
      if (btnNext) btnNext.disabled = (currentIndex === totalSlides - 1);

      // Update dots
      dots.forEach((dot, idx) => {
        if (idx === currentIndex) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });
    }

    function goToSlide(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      currentIndex = index;

      const targetSlide = slides[currentIndex];
      if (targetSlide) {
        targetSlide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
      }

      updateControls();
    }

    if (btnPrev) {
      btnPrev.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
      });
    });

    // Sync active slide on native touch swipe or scroll snap
    let scrollTimeout = null;
    track.addEventListener('scroll', () => {
      if (scrollTimeout) cancelAnimationFrame(scrollTimeout);
      scrollTimeout = requestAnimationFrame(() => {
        const scrollLeft = track.scrollLeft;
        const maxScroll = track.scrollWidth - track.clientWidth;

        let closestIndex = 0;
        if (maxScroll > 0 && scrollLeft >= maxScroll - 20) {
          closestIndex = totalSlides - 1;
        } else if (scrollLeft <= 20) {
          closestIndex = 0;
        } else {
          let minDiff = Infinity;
          slides.forEach((slide, idx) => {
            const diff = Math.abs((slide.offsetLeft - track.offsetLeft) - scrollLeft);
            if (diff < minDiff) {
              minDiff = diff;
              closestIndex = idx;
            }
          });
        }

        if (closestIndex !== currentIndex) {
          currentIndex = closestIndex;
          updateControls();
        }
      });
    }, { passive: true });

    // Keyboard navigation when track is focused
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      }
    });

    // Initial controls state
    updateControls();
  }

  // Initialize Proposals Carousel (8 Cards)
  initModernCarousel({
    wrapperId: 'proposalsCarouselWrapper',
    trackId: 'proposalsCarouselTrack',
    prevBtnId: 'btnPropPrev',
    nextBtnId: 'btnPropNext',
    dotsId: 'proposalsCarouselDots',
    counterId: 'proposalsCarouselCounter'
  });

  // Initialize Team / Corpo Diretivo Carousel (7 Members)
  initModernCarousel({
    wrapperId: 'teamCarouselWrapper',
    trackId: 'teamCarouselTrack',
    prevBtnId: 'btnTeamPrev',
    nextBtnId: 'btnTeamNext',
    dotsId: 'teamCarouselDots',
    counterId: 'teamCarouselCounter'
  });

  // Initialize Flyers Carousel (8 Flyers)
  initModernCarousel({
    wrapperId: 'flyersCarouselWrapper',
    trackId: 'flyersCarouselTrack',
    prevBtnId: 'btnFlyerPrev',
    nextBtnId: 'btnFlyerNext',
    dotsId: 'flyersCarouselDots',
    counterId: 'flyersCarouselCounter'
  });

  // Initial call to set active page 1
  updatePdfViewer(1);
});
