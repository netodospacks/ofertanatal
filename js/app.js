/**
 * CONFIGURAÇÃO GLOBAL DA LANDING PAGE LOW TICKET
 * Edite aqui as informações principais da oferta e o link do checkout.
 */
const CONFIG = {
  // Checkout da Coleção COMPLETA — R$ 19,90
  CHECKOUT_URL_FULL:  "https://pay.lowify.com.br/checkout.php?product_id=UQDN0p",

  // Checkout da Coleção BÁSICA — R$ 9,90
  CHECKOUT_URL_BASIC: "https://pay.lowify.com.br/go.php?offer=cffc453c",

  PRODUCT_NAME: "Coleção de Moldes de Caixinhas de Natal",
  WARRANTY_DAYS: 7
};

document.addEventListener("DOMContentLoaded", () => {
  // 0. Renderizar a data local atual em formato brasileiro (DD/MM/AAAA)
  const dateDisplay = document.getElementById("currentDateDisplay");
  if (dateDisplay) {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    dateDisplay.textContent = `${day}/${month}/${year}`;
  }

  // 1. Manter e repassar parâmetros UTM da URL ao checkout
  const currentParams = window.location.search;
  
  const getFullCheckoutUrl = (baseUrl) => {
    if (!baseUrl) return null;
    try {
      const url = new URL(baseUrl);
      if (currentParams) {
        const incomingParams = new URLSearchParams(currentParams);
        incomingParams.forEach((val, key) => {
          url.searchParams.set(key, val);
        });
      }
      return url.toString();
    } catch (e) {
      if (currentParams) {
        return baseUrl + (baseUrl.includes("?") ? "&" : "?") + currentParams.substring(1);
      }
      return baseUrl;
    }
  };

  // 2. Configurar botões de rolagem suave até a oferta (data-scroll-offer)
  const scrollButtons = document.querySelectorAll("[data-scroll-offer]");
  scrollButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetSection = document.getElementById("oferta");
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // 3. Configurar botões de compra (data-buy-btn) — suportam data-plan="basic" ou "full"
  const buyButtons = document.querySelectorAll("[data-buy-btn]");
  buyButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan");
      let baseUrl;
      if (plan === "basic") {
        baseUrl = CONFIG.CHECKOUT_URL_BASIC;
      } else {
        baseUrl = CONFIG.CHECKOUT_URL_FULL;
      }
      const targetUrl = getFullCheckoutUrl(baseUrl);
      if (!targetUrl) {
        openCheckoutAlertModal();
      } else {
        window.location.href = targetUrl;
      }
    });
  });

  // 3. FAQ Accordion
  const faqCards = document.querySelectorAll(".faq-card");
  faqCards.forEach(card => {
    const header = card.querySelector(".faq-header");
    header.addEventListener("click", () => {
      const isOpen = card.classList.contains("active");
      faqCards.forEach(c => {
        if (c !== card) c.classList.remove("active");
      });
      if (!isOpen) {
        card.classList.add("active");
      } else {
        card.classList.remove("active");
      }
    });
  });

  // 4. Botão Fixo Mobile (mostrar após rolar a primeira dobra)
  const mobileBar = document.getElementById("mobileStickyCta");
  if (mobileBar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 450) {
        mobileBar.classList.add("show");
      } else {
        mobileBar.classList.remove("show");
      }
    });
  }

  // 5. Proteção Anti-Cópia e Bloqueio de Inspeção
  // Desativa menu de contexto (botão direito)
  document.addEventListener("contextmenu", (e) => e.preventDefault());

  // Desativa atalhos de desenvolvedor (F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S)
  document.addEventListener("keydown", (e) => {
    if (e.key === "F12" || e.keyCode === 123) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && e.shiftKey && ["I", "i", "J", "j", "C", "c"].includes(e.key)) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
      e.preventDefault();
      return false;
    }
    if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
      e.preventDefault();
      return false;
    }
  });

  // Desativa arrastar elementos e copiar texto
  document.addEventListener("dragstart", (e) => e.preventDefault());
  document.addEventListener("copy", (e) => e.preventDefault());
  document.addEventListener("cut", (e) => e.preventDefault());

  // 6. Bloqueio de Zoom (Mobile e Desktop)
  // Previne gesto de pinça (pinch-to-zoom multi-touch)
  document.addEventListener("touchstart", (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });

  // Previne zoom por duplo toque rápido
  let lastTouchEndTime = 0;
  document.addEventListener("touchend", (e) => {
    const now = Date.now();
    if (now - lastTouchEndTime <= 300) {
      e.preventDefault();
    }
    lastTouchEndTime = now;
  }, false);

  // Previne zoom por Ctrl + Scroll do mouse no Desktop
  document.addEventListener("wheel", (e) => {
    if (e.ctrlKey) {
      e.preventDefault();
    }
  }, { passive: false });
});

// Modal elegante caso o checkout esteja pendente
function openCheckoutAlertModal() {
  let alertModal = document.getElementById("checkoutConfigModal");
  if (!alertModal) {
    alertModal = document.createElement("div");
    alertModal.id = "checkoutConfigModal";
    alertModal.style.cssText = `
      position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
      z-index: 9999; display: flex; align-items: center; justify-content: center; padding: 20px;
    `;
    alertModal.innerHTML = `
      <div style="background: #fff; max-width: 440px; width: 100%; border-radius: 16px; padding: 28px; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.3);">
        <div style="width: 50px; height: 50px; background: #fee2e2; color: #dc2626; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.4rem; margin: 0 auto 16px;">
          <i class="fas fa-link"></i>
        </div>
        <h3 style="font-size: 1.2rem; font-weight: 900; color: #6b2526; margin-bottom: 8px;">Link de Checkout Pendente</h3>
        <p style="font-size: 0.88rem; color: #7c5c54; line-height: 1.5; margin-bottom: 20px;">
          O botão está 100% funcional! Para direcionar os clientes à sua página de pagamento (Kiwify, Hotmart, etc.), insira a URL na variável <code>CHECKOUT_URL</code> em <code>js/app.js</code>.
        </p>
        <button style="background: #16a34a; color: #fff; font-weight: 800; font-size: 0.95rem; padding: 12px 24px; border-radius: 999px; width: 100%; border: none; cursor: pointer;" onclick="document.getElementById('checkoutConfigModal').remove()">
          Entendido
        </button>
      </div>
    `;
    document.body.appendChild(alertModal);
  }
}
