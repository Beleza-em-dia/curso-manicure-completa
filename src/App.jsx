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
  Gift 
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
  
  // Controle de visibilidade dos botões
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

  // 2. Scroll Logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Identificadores das seções
      const offerSection = document.getElementById('offer'); // Seção da Oferta
      const faqSection = document.getElementById('faq');     // Seção do FAQ

      // --- LÓGICA DO BOTÃO STICKY MOBILE ---
      let shouldShowSticky = false;

      if (scrollY > 500) {
        shouldShowSticky = true;
      }

      if (offerSection) {
        // Se a parte de baixo da tela chegou no topo da seção de oferta (+ ajuste)
        if (scrollY + windowHeight > offerSection.offsetTop + 100) {
           shouldShowSticky = false;
        }
      }

      setShowStickyButton(shouldShowSticky);

      // --- LÓGICA DO BOTÃO WHATSAPP ---
      if (faqSection) {
        const faqPosition = faqSection.offsetTop;
        if (scrollY + windowHeight > faqPosition + 100) {
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

  // Função 1: Rolar até a oferta (Sem Pixel, apenas navegação)
  const scrollToOffer = () => {
    const offerSection = document.getElementById('offer');
    if (offerSection) {
      offerSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Função 2: Ir para o Checkout (Com Pixel AddToCart)
  // Apenas o botão da oferta chama essa função agora
  const handlePurchaseClick = (origin) => {
    if (typeof window.fbq === 'function') {
      // MUDANÇA: Dispara AddToCart para diferenciar do pixel da Hotmart
      window.fbq('track', 'AddToCart', { content_name: origin }); 
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-sans text-gray-800 bg-rose-50/30 overflow-x-hidden">
      
      {/* 1. HEADER */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-center py-2 px-4 font-bold text-sm md:text-base sticky top-0 z-50 shadow-md">
        <motion.div 
          animate={{ opacity: [1, 0.7, 1] }} 
          transition={{ duration: 1.5, repeat: Infinity }}
          className="flex items-center justify-center gap-2"
        >
          <AlertTriangle size={18} />
          <span>ÚLTIMAS VAGAS COM DESCONTO - A PROMOÇÃO ENCERRA EM BREVE!</span>
        </motion.div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/80 z-10"></div>
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
            <span className="inline-block py-1 px-3 rounded-full bg-rose-500/80 text-xs md:text-sm font-semibold tracking-wider mb-4 border border-rose-300">
              MÉTODO COMPROVADO
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6">
              Aprenda a viver da manicure com agenda cheia, <span className=''>mesmo começando do zero!</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto font-light">
              O curso completo que vai te tirar do absoluto zero e te tornar uma <b className="text-rose-300">Manicure Profissional</b> disputada na sua cidade, mesmo sem material caro.
            </p>
            
            {/* BOTÃO HERO - AGORA FAZ SCROLL PARA A OFERTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={{ boxShadow: ["0 0 0 rgba(225, 29, 72, 0.4)", "0 0 20px rgba(225, 29, 72, 0.7)", "0 0 0 rgba(225, 29, 72, 0.4)"] }}
              transition={{ duration: 2, repeat: Infinity }}
              onClick={scrollToOffer}
              className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-bold py-4 px-8 rounded-full text-lg md:text-xl shadow-xl w-full md:w-auto uppercase tracking-wide border-b-4 border-rose-800"
            >
              QUERO ME INSCREVER AGORA
            </motion.button>
            
            <p className="mt-4 text-sm text-gray-300 flex items-center justify-center gap-1">
              <ShieldCheck size={16} className="text-green-400"/> Garantia de 7 Dias • Acesso Imediato
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. A DOR */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Você se identifica com isso?</h2>
            <div className="w-24 h-1 bg-rose-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: <Clock size={40} />, title: "Sem Tempo e Sem Dinheiro", text: "Cansada de contar moedas no final do mês e sentir que trabalha muito para ganhar pouco?" },
              { icon: <TrendingUp size={40} />, title: "Chefe Chato", text: "Não aguenta mais receber ordens, cumprir horários rígidos e não ter reconhecimento?" },
              { icon: <Heart size={40} />, title: "Medo do Futuro", text: "Quer dar uma vida melhor para sua família, mas sente que não tem uma profissão valorizada?" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-rose-50 p-8 rounded-2xl border border-rose-100 shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-rose-500 shadow-sm">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-12 bg-gray-900 text-white p-6 rounded-xl max-w-4xl mx-auto text-center shadow-xl">
            <p className="text-lg font-medium">
              ✨ <span className="text-amber-300 font-bold">A boa notícia:</span> O mercado da beleza é um dos únicos que cresce mesmo na crise. Mulheres não deixam de fazer as unhas. A oportunidade está na sua frente.
            </p>
          </div>
        </div>
      </section>

      {/* 4. A SOLUÇÃO */}
      <section className="py-20 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">O Caminho Completo para o Sucesso</h2>
            <p className="text-gray-600">Veja tudo o que você vai dominar no curso:</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              "Cutilagem Funda Perfeita", "Esmaltação em Gel Duradoura", "Aplicação de Unhas de Fibra",
              "Nail Art e Decoração 3D", "Biossegurança e Higiene", "Gestão e Marketing para Manicures"
            ].map((skill, idx) => (
              <motion.div key={idx} whileHover={{ y: -5 }} className="flex items-center p-4 bg-white rounded-lg shadow-sm border-l-4 border-rose-500">
                <Check className="text-green-500 mr-3 flex-shrink-0" />
                <span className="font-semibold text-gray-700">{skill}</span>
              </motion.div>
            ))}
             {["BÔNUS: Ficha de Anamnese", "BÔNUS: Tabela de Precificação", "BÔNUS: Lista de Fornecedores"].map((bonus, idx) => (
              <motion.div key={`bonus-${idx}`} whileHover={{ y: -5 }} className="flex items-center p-4 bg-amber-50 rounded-lg shadow-sm border-l-4 border-amber-500">
                <Gift className="text-amber-500 mr-3 flex-shrink-0" />
                <span className="font-bold text-gray-800">{bonus}</span>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
            className="mt-16 bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 bg-amber-400 text-xs font-bold px-3 py-1 rounded-bl-lg">INCLUSO</div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
                <Award className="text-amber-500" size={32} />
                <h3 className="text-2xl font-bold text-gray-800">Certificado Profissional</h3>
              </div>
              <p className="text-gray-600">Ao finalizar o curso, você recebe um Certificado de Conclusão válido em todo território nacional para expor no seu espaço e passar autoridade para suas clientes.</p>
            </div>
            <div className="w-full md:w-1/3 h-48 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200 relative">
               <img src="certificado.jpg" alt="Certificado" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. A INSTRUTORA */}
      <section className="py-20 bg-rose-100/50">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12 max-w-6xl">
          <div className="w-full md:w-1/2">
            <div className="relative mx-auto w-64 md:w-80">
                <div className="absolute inset-0 bg-rose-300 rounded-full transform translate-x-3 translate-y-3"></div>
                <img src="foto-instrutora.png" alt="Foto da Instrutora" className="relative rounded-full shadow-2xl border-4 border-white w-full h-full object-cover aspect-square" />
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left">
            <span className="text-rose-500 font-bold tracking-widest text-sm uppercase">Sua Mentora</span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 mt-2">Aprenda com quem é <span className="text-rose-600">Referência Nacional</span></h2>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">Com mais de <strong>5.000 alunas formadas</strong>, sou especialista em transformar iniciantes em manicures de sucesso. <br/><br/>Minha missão não é apenas te ensinar a pintar unhas, é te ensinar a ter a <strong>agenda lotada</strong> e conquistar sua liberdade financeira, assim como eu fiz.</p>
            <div className="p-4 bg-white rounded-lg border-l-4 border-rose-500 shadow-sm inline-block">
              <p className="italic text-gray-600 font-medium">"O sucesso deixa rastros, e eu vou te dar o mapa."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PROVA SOCIAL */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">Elas tomaram a decisão certa 👇</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Juliana Mendes", role: "Manicure há 6 meses", text: "Eu trabalhava em loja de shopping e odiava. Comecei o curso com medo, mas em 2 meses já estava ganhando mais que no meu emprego antigo. Hoje tenho meu próprio cantinho!" },
              { name: "Ana Paula Silva", role: "Mãe e Empreendedora", text: "A flexibilidade de horário era tudo que eu precisava. O curso é muito didático, as aulas de cutilagem mudaram meu acabamento. Minhas clientes amam." },
              { name: "Carla Souza", role: "Dona de Esmalteria", text: "Comprei o curso para me atualizar nas técnicas de fibra e adorei. O suporte é incrível e o certificado é lindo. Vale cada centavo." }
            ].map((testimonial, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.02 }} className="bg-rose-50 p-6 rounded-xl shadow-sm flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-300 rounded-full mb-4 flex items-center justify-center text-xl font-bold text-gray-500">{testimonial.name.charAt(0)}</div>
                <div className="flex gap-1 text-amber-400 mb-3">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <span className="text-xs text-rose-500 font-semibold">{testimonial.role}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. OFERTA (ID="offer") */}
      <section id="offer" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600 rounded-full filter blur-[100px] opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-600 rounded-full filter blur-[100px] opacity-20"></div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="bg-rose-600 inline-flex items-center gap-2 px-6 py-2 rounded-full font-mono font-bold text-xl mb-8 animate-pulse shadow-lg shadow-rose-500/30">
            <Clock size={20} />
            <span>OFERTA EXPIRA EM: {formatTime(timeLeft)}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">Tudo isso por um preço simbólico</h2>
          <p className="text-gray-300 mb-8 text-lg">Invista no seu futuro pelo preço de uma pizza.</p>

          <div className="bg-white text-gray-800 rounded-3xl max-w-md mx-auto p-8 shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <p className="text-gray-500 text-lg font-medium">De <span className="line-through text-red-500 decoration-red-500">R$ 197,90</span> por apenas:</p>
            <div className="text-6xl font-extrabold text-rose-600 my-4 flex justify-center items-start">
              <span className="text-2xl mt-2 mr-1">R$</span>
              79,00
              <span className="text-sm text-gray-500 font-normal mt-auto mb-2 ml-1">/à vista</span>
            </div>
            
            <p className="text-sm text-gray-500 mb-6">ou 10x de R$ 9,49 no cartão</p>

            {/* BOTÃO DA OFERTA (ÚNICO QUE DISPARA PIXEL) */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              animate={{ scale: [1, 1.03, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              onClick={() => handlePurchaseClick('Botao_Oferta_Desconto')}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-extrabold py-4 px-6 rounded-xl text-xl shadow-lg shadow-green-500/30 flex items-center justify-center gap-2 mb-4"
            >
              QUERO GARANTIR MINHA VAGA
              <ChevronDown className="rotate-[-90deg]" />
            </motion.button>

            <div className="flex justify-center items-center gap-4 text-xs text-gray-400 grayscale opacity-70">
              <span>💳 Cartão de Crédito</span><span>💠 Pix</span><span>📄 Boleto</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col md:flex-row items-center gap-6 bg-rose-50 p-8 rounded-2xl border border-rose-100 mb-16">
            <ShieldCheck size={80} className="text-rose-500 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Risco Zero: Garantia de 7 Dias</h3>
              <p className="text-gray-600">Se você entrar no curso e achar que não é para você, basta nos enviar um e-mail em até 7 dias e devolvemos 100% do seu dinheiro. Sem perguntas, sem letras miúdas.</p>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Perguntas Frequentes</h2>
          <div id="faq" className="space-y-4">
            {[
              { q: "O curso tem certificado?", a: "Sim! Após assistir todas as aulas, você poderá baixar seu certificado profissional diretamente na plataforma, pronto para imprimir." },
              { q: "Por quanto tempo tenho acesso?", a: "O acesso é VITALÍCIO. Você paga uma única vez e pode assistir às aulas quantas vezes quiser, para sempre." },
              { q: "Preciso comprar material caro para começar?", a: "Não! No curso temos um módulo específico onde ensino como montar seu kit inicial gastando pouco, com materiais bons e baratos." },
              { q: "Serve para quem nunca pegou num alicate?", a: "Com certeza. O método começa do absoluto zero, ensinando desde como segurar o alicate até as técnicas mais avançadas." }
            ].map((item, idx) => (
              <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex justify-between items-center p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-left font-semibold text-gray-800"
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
                      className="bg-white px-5 pb-5 text-gray-600"
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
      <footer className="bg-gray-900 text-gray-400 py-10 text-center text-sm border-t border-gray-800 pb-32 md:pb-10">
        <div className="container mx-auto px-4">
          <p className="mb-4">&copy; {new Date().getFullYear()} Curso Manicure Profissional. Todos os direitos reservados.</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
          </div>
        </div>
      </footer>

      {/* BOTÃO WHATSAPP */}
      <AnimatePresence>
        {showWhatsapp && (
          <motion.a 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=Oi,%20tenho%20duvidas%20sobre%20o%20curso%20de%20manicure`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick} 
            className="fixed bottom-24 md:bottom-8 right-4 z-40 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group border-2 border-white"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8 filter brightness-0 invert" />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">
                Tirar Dúvidas
            </span>
          </motion.a>
        )}
      </AnimatePresence>

      {/* BOTÃO FLUTUANTE MOBILE (STICKY) - AGORA FAZ SCROLL PARA A OFERTA */}
      <AnimatePresence>
        {showStickyButton && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-4 left-4 right-4 z-50 md:hidden"
          >
            {/* AGORA CHAMA scrollToOffer */}
            <button 
              onClick={scrollToOffer}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg shadow-2xl flex justify-center items-center gap-2 border-2 border-white animate-bounce"
            >
              QUERO COMEÇAR AGORA
              <Check size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default LandingPage;