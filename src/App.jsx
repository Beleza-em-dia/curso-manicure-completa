import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  Star, 
  ShieldCheck, 
  Clock, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  TrendingUp,
  AlertTriangle,
  Gift,
  ArrowRight
} from 'lucide-react';

/* --- CONFIGURAÇÕES GERAIS --- */
const CHECKOUT_LINK = "https://go.hotmart.com/W103943255Y?ap=101e";
const WHATSAPP_NUMBER = "5532984212053";
const VIDEO_SOURCE = "bg-loop.mp4"; 

const LandingPage = () => {
  // --- STATES ---
  const [timeLeft, setTimeLeft] = useState(15 * 60);
  const [pixelFired, setPixelFired] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const [showStickyButton, setShowStickyButton] = useState(false); 
  const [showWhatsapp, setShowWhatsapp] = useState(false); 

  // --- EFEITOS (HOOKS) ---

  // 1. Timer Regressivo
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 2. Scroll Logic & Pixel Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const offerSection = document.getElementById('offer');
      const faqSection = document.getElementById('faq');

      // --- STICKY BUTTON LOGIC ---
      // Aparece depois do Hero e some quando chega na própria oferta (para não ter 2 botões)
      let shouldShowSticky = false;
      if (scrollY > 600) { 
        shouldShowSticky = true;
      }
      if (offerSection) {
        // Se já chegou na oferta, esconde o sticky para focar no botão principal
        if (scrollY + windowHeight > offerSection.offsetTop + 200) {
           shouldShowSticky = false;
        }
      }
      setShowStickyButton(shouldShowSticky);

      // --- WHATSAPP LOGIC ---
      if (faqSection) {
        const faqPosition = faqSection.offsetTop;
        if (scrollY + windowHeight > faqPosition) {
          setShowWhatsapp(true);
        } else {
          setShowWhatsapp(false);
        }
      }

      // --- PIXEL DE SCROLL 50% ---
      const scrollPercentage = (scrollY / (document.body.scrollHeight - windowHeight)) * 100;
      if (scrollPercentage > 50 && !pixelFired) {
        if (typeof window.fbq === 'function') {
          window.fbq('trackCustom', 'Interesse_Scroll_50'); 
        }
        setPixelFired(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pixelFired]);

  // --- FUNÇÕES DE AÇÃO ---

  // Função 1: Scroll do Hero (Com Rastreamento de Interesse)
  const scrollToOffer = () => {
    // Rastreia quem clicou no Hero, mesmo que não compre
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', 'Hero_Click_Scroll'); 
    }

    const offerSection = document.getElementById('offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função 2: Ir para o Checkout (Intenção Real de Compra)
  const handlePurchaseClick = (origin) => {
    if (typeof window.fbq === 'function') {
      // InitiateCheckout é o padrão correto para "Ir para Hotmart"
      window.fbq('track', 'InitiateCheckout', { content_name: origin, value: 29.90, currency: 'BRL' }); 
    }
    window.location.href = CHECKOUT_LINK;
  };

  const handleWhatsAppClick = () => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'Contact', { content_name: 'WhatsApp_FAQ' });
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  // Animações
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-sans text-gray-800 bg-rose-50/30 overflow-x-hidden">
      
      {/* 1. HEADER DE ESCASSEZ */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-center py-3 px-4 font-bold text-xs md:text-sm sticky top-0 z-50 shadow-md flex justify-center items-center gap-2">
         <AlertTriangle size={16} className="animate-pulse" />
         <span>ÚLTIMAS VAGAS COM DESCONTO - A PROMOÇÃO ENCERRA EM BREVE!</span>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Video com Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-10"></div>
          <video 
            className="w-full h-full object-cover"
            autoPlay loop muted playsInline
            poster="/placeholder-nails.jpg" 
          >
            <source src={VIDEO_SOURCE} type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center text-white max-w-4xl">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            
            <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full bg-rose-600/30 border border-rose-500/50 backdrop-blur-md text-xs md:text-sm font-semibold tracking-wider mb-6">
               <Star size={14} className="text-yellow-400 fill-yellow-400"/>
               MÉTODO COMPROVADO POR 5.000+ ALUNAS
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 drop-shadow-lg">
              Domine a Arte das Unhas e <span className="text-rose-400">Encha Sua Agenda</span>, <span className='text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-white'>Mesmo Começando do Zero!</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              O passo a passo completo para você se tornar uma <b className="text-rose-300">Manicure Profissional</b>, fazer cutilagem perfeita e conquistar sua independência financeira.
            </p>
            
            {/* BOTÃO HERO - Scrolla para a oferta */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 0 rgba(225, 29, 72, 0.4)", "0 0 20px rgba(225, 29, 72, 0.6)", "0 0 0 rgba(225, 29, 72, 0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={scrollToOffer}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-4 px-10 rounded-full text-lg md:text-xl shadow-xl w-full md:w-auto uppercase tracking-wide border-b-4 border-rose-800 flex items-center justify-center gap-3 mx-auto"
            >
              QUERO ME INSCREVER
              <ChevronDown className="animate-bounce" size={24}/>
            </motion.button>
            
            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
               <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-green-400"/> Garantia de 7 Dias</span>
               <span className="flex items-center gap-1"><Clock size={16} className="text-green-400"/> Acesso Imediato</span>
            </div>

          </motion.div>
        </div>
      </section>

      {/* 3. A DOR (IDENTIFICAÇÃO) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sente que está parada no tempo?</h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <TrendingUp size={40} />, title: "Falta de Clientes", text: "Você sabe fazer unha, mas não consegue lotar a agenda e viver disso?" },
              { icon: <AlertTriangle size={40} />, title: "Cutilagem Ruim", text: "Tem dificuldade em fazer aquele acabamento fundo e sem 'bifes' que as clientes amam?" },
              { icon: <Clock size={40} />, title: "Demora Muito", text: "Perde muito tempo em cada atendimento e acaba lucrando pouco no final do dia?" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-rose-200 shadow-sm hover:shadow-lg transition-all text-center group"
              >
                <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-rose-500 shadow-md group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. A SOLUÇÃO (O CURSO) */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">O Método Completo Faby Cardoso</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Não é apenas "fazer unhas". É aprender as técnicas que fidelizam clientes e permitem cobrar mais caro.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Cutilagem Funda Perfeita", "Esmaltação Sem Manchas", "Aplicação de Películas",
              "Francesinha Sorriso", "Pés Perfeitos", "Biossegurança e Higiene"
            ].map((skill, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="flex items-center p-5 bg-white rounded-xl shadow-sm border border-rose-100">
                <div className="bg-green-100 p-2 rounded-full mr-4">
                  <Check className="text-green-600" size={20} />
                </div>
                <span className="font-semibold text-gray-700">{skill}</span>
              </motion.div>
            ))}
             {["BÔNUS: Ficha de Anamnese", "BÔNUS: Lista de Materiais", "BÔNUS: Certificado Incluso"].map((bonus, idx) => (
              <motion.div key={`bonus-${idx}`} whileHover={{ y: -5 }} className="flex items-center p-5 bg-amber-50 rounded-xl shadow-sm border border-amber-200">
                <div className="bg-amber-100 p-2 rounded-full mr-4">
                  <Gift className="text-amber-600" size={20} />
                </div>
                <span className="font-bold text-gray-800">{bonus}</span>
              </motion.div>
            ))}
          </div>

          {/* CERTIFICADO */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="mt-16 bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-300/50 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1 rounded-bl-lg uppercase tracking-wider">Documento Oficial</div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
                <Award className="text-amber-500" size={40} />
                <h3 className="text-2xl font-bold text-gray-800">Certificado Profissional</h3>
              </div>
              <p className="text-gray-600 mb-4">Ao concluir o curso, você recebe um certificado válido em todo o Brasil para expor no seu espaço. Isso gera <strong>autoridade</strong> e confiança para suas clientes.</p>
              <p className="text-sm text-green-600 font-semibold flex items-center gap-1 justify-center md:justify-start">
                 <Check size={16}/> Sem custo adicional
              </p>
            </div>
            <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-lg overflow-hidden shadow-inner relative group">
                {/* Placeholder para imagem do certificado */}
               <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
                  <img src="certificado.jpg" alt="Certificado" className="w-full h-full object-cover " />
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. OFERTA (ID="offer") - AQUI ESTÁ A GRANDE MUDANÇA DE UX */}
      <section id="offer" className="py-20 bg-gradient-to-br from-gray-900 to-slate-900 text-white relative overflow-hidden">
        {/* Elementos decorativos de fundo */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-rose-600 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 rounded-full filter blur-[120px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          
          {/* TIMER DE URGÊNCIA */}
          <div className="bg-rose-600/90 backdrop-blur-sm inline-flex items-center gap-2 px-8 py-3 rounded-full font-mono font-bold text-lg md:text-xl mb-10 shadow-lg shadow-rose-500/30 border border-rose-400">
            <Clock size={22} className="animate-spin-slow" />
            <span>OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">Faça sua Inscrição Agora</h2>
          <p className="text-gray-400 mb-8 text-lg">Comece hoje mesmo a transformar sua vida financeira.</p>

          <div className="bg-white text-gray-800 rounded-3xl max-w-md mx-auto p-8 shadow-2xl relative overflow-hidden">
            
            {/* NOVO: RESUMO DE VALOR (VALUE STACK) */}
            <div className="bg-gray-50 p-4 rounded-xl mb-6 text-left border border-gray-100">
               <h4 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-3 border-b border-gray-200 pb-2">O que está incluso:</h4>
               <ul className="space-y-2 text-sm font-medium text-gray-700">
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500"/> Curso Completo Faby Cardoso</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500"/> Certificado Profissional</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500"/> Acesso Vitalício + Atualizações</li>
                  <li className="flex items-center gap-2"><Check size={18} className="text-green-500"/> 3 Bônus Exclusivos</li>
               </ul>
            </div>

            {/* PREÇO */}
            <div className="text-center">
                <p className="text-gray-400 text-sm font-medium">De <span className="line-through">R$ 197,90</span> por:</p>
                <div className="text-6xl font-extrabold text-rose-600 my-2 flex justify-center items-start tracking-tighter">
                <span className="text-2xl mt-2 mr-1">R$</span>
                79
                <span className="text-2xl mt-2">,00</span>
                </div>
                <p className="text-sm text-gray-500 mb-6 bg-green-50 text-green-700 py-1 px-3 rounded-full inline-block font-semibold">ou 10x de R$ 9,49</p>
            </div>

            {/* BOTÃO DA OFERTA (DISPARA INITIATE CHECKOUT) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              onClick={() => handlePurchaseClick('Botao_Oferta_Principal')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-5 px-6 rounded-xl text-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 mb-4 transition-colors"
            >
              SIM! QUERO MINHA VAGA
              <ArrowRight size={24} />
            </motion.button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 grayscale opacity-70 mt-4">
              <div className="flex flex-col items-center gap-1"><ShieldCheck size={14}/><span>Compra Segura</span></div>
              <div className="flex flex-col items-center gap-1"><Award size={14}/><span>Garantia 7 Dias</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Dúvidas Frequentes</h2>
          <div id="faq" className="space-y-3">
            {[
              { q: "O curso tem certificado?", a: "Sim! Válido em todo território nacional." },
              { q: "Como recebo o acesso?", a: "Imediatamente após a confirmação do pagamento no seu e-mail." },
              { q: "Tenho suporte se tiver dúvidas?", a: "Sim, temos uma equipe de suporte exclusiva para alunas." },
              { q: "Por quanto tempo tenho acesso?", a: "O acesso é VITALÍCIO. O curso é seu para sempre." }
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left font-semibold text-gray-800 text-sm md:text-base"
                >
                  {item.q}
                  {faqOpen === idx ? <ChevronUp size={20} className="text-rose-500" /> : <ChevronDown size={20} className="text-gray-400" />}
                </button>
                <AnimatePresence>
                  {faqOpen === idx && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="bg-white px-4 pb-4 text-gray-600 text-sm"
                    >
                      <div className="pt-2 border-t border-gray-100 mt-2">{item.a}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-gray-900 text-gray-500 py-8 text-center text-xs border-t border-gray-800 pb-28 md:pb-8">
        <div className="container mx-auto px-4">
          <p className="mb-2">&copy; 2026 Curso Manicure Profissional. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* BOTÃO WHATSAPP (SÓ NO FAQ) */}
      <AnimatePresence>
        {showWhatsapp && (
          <motion.a 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Oi,%20estou%20na%20pagina%20do%20curso%20e%20tenho%20duvidas`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick} 
            className="fixed bottom-24 md:bottom-8 right-4 z-40 bg-green-500 hover:bg-green-600 text-white p-3 md:p-4 rounded-full shadow-lg flex items-center gap-2 group border-2 border-white"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-6 h-6 md:w-8 md:h-8 filter brightness-0 invert" />
            <span className="hidden md:block font-bold pr-2">Dúvidas?</span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* BOTÃO FLUTUANTE MOBILE (STICKY) - LEVA PARA A OFERTA */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            <button 
              onClick={scrollToOffer} // Mantém o scroll (Filtro)
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg shadow-2xl flex justify-center items-center gap-2 border-2 border-white"
            >
              VER PREÇO E OFERTA
              <ChevronDown size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;