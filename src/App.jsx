import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Play,
  ShieldCheck,
  Star,
  ChevronDown,
  Lock,
  Zap,
  Dumbbell
} from 'lucide-react';

const LandingPage = () => {
  // Estado para o contador regressivo (15 minutos)
  const [timeLeft, setTimeLeft] = useState(15 * 60);

  // Lógica do Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Formatação do tempo (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans text-gray-900 selection:bg-fuchsia-200">

      {/* 1. HEADER DE AVISO (URGÊNCIA) */}
      <div className="sticky top-0 z-50 bg-red-600 text-white text-xs md:text-sm font-bold py-2 px-4 text-center shadow-md animate-pulse">
        <div className="flex justify-center items-center gap-2">
          <AlertTriangle size={16} />
          <span>ATENÇÃO: ÚLTIMAS VAGAS COM 80% DE DESCONTO</span>
        </div>
      </div>

      {/* 2. HERO SECTION COM VÍDEO DO YOUTUBE NO FUNDO */}
      <section className="relative text-white pb-20 pt-12 px-4 overflow-hidden min-h-[85vh] flex flex-col justify-center items-center">
        
        {/* --- CAMADA 1: VÍDEO DO YOUTUBE --- */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline // Essencial para iPhone não abrir em tela cheia
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover opacity-60"
          >
            {/* O arquivo deve estar na pasta 'public' com o nome 'bg-video.mp4' */}
            <source src="bg-video.mp4" type="video/mp4" />
            Seu navegador não suporta vídeos.
          </video>
        </div>

        {/* --- CAMADA 2: MÁSCARA ESCURA (OVERLAY) --- */}
        <div className="absolute inset-0 bg-slate-900/40 bg-gradient-to-b from-slate-900/90 via-slate-900/60 to-slate-900 z-10"></div>

        {/* --- CAMADA 3: CONTEÚDO --- */}
        <div className="relative z-20 max-w-4xl mx-auto text-center space-y-8 mt-4">
          
          {/* Badge */}
          <span className="inline-flex items-center gap-1 bg-fuchsia-600 text-white text-xs font-bold px-3 py-1 rounded-full border border-fuchsia-400 shadow-lg backdrop-blur-sm">
            <Zap size={12} fill="white" /> MÉTODO VALIDADO
          </span>

          {/* Headline H1 */}
          <h1 className="text-3xl md:text-5xl font-black leading-tight tracking-tight drop-shadow-xl max-w-2xl mx-auto">
            Cansada de ir pra academia e <span className="text-fuchsia-400">continuar com o mesmo corpo?</span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-200 text-lg leading-snug drop-shadow-md font-medium max-w-xl mx-auto">
            Descubra o <b>Protocolo FX</b>: A metodologia baseada em ciência (Método PHAT) para destravar seus resultados, empinar o glúteo e definir as pernas em 30 dias.
          </p>

          {/* Botão CTA */}
          <div className="pt-4">
            <a href="#offer" className="flex flex-col items-center justify-center w-full max-w-md mx-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 text-white rounded-lg shadow-[0_4px_14px_0_rgba(74,222,128,0.6)] transition-transform hover:-translate-y-1 active:scale-95 py-5 px-6 cursor-pointer no-underline border border-green-400">
              <span className="font-black text-xl md:text-2xl uppercase tracking-wide leading-none mb-1 text-white drop-shadow-md">
                QUERO DEFINIR AGORA
              </span>
              <span className="text-sm font-bold text-green-100 opacity-100 leading-none">
                Por apenas R$ 10,00
              </span>
            </a>
            
            <p className="text-xs text-slate-300 flex justify-center items-center gap-1 font-medium drop-shadow-md mt-4">
              <Lock size={12} /> Compra 100% Segura e Acesso Imediato
            </p>
          </div>

        </div>
      </section>

      {/* 3. A DOR (PROBLEMA) */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-md mx-auto space-y-6 text-center">
          <h2 className="text-2xl font-bold text-slate-800 leading-tight">
            Você faz agachamento, leg press, e <span className="text-red-600">nada muda?</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            A culpa não é sua genética. O problema é que você está seguindo a <b>"ficha de padaria"</b> genérica da academia que não gera estímulo real de hipertrofia.
          </p>
          <div className="bg-red-50 p-5 rounded-xl border-l-4 border-red-500 text-left space-y-3 shadow-sm">
            <p className="flex items-start gap-2 text-slate-700 text-sm">
              <span className="text-red-500 font-bold text-lg">✕</span>
              <span>Treinos aleatórios sem progressão de carga.</span>
            </p>
            <p className="flex items-start gap-2 text-slate-700 text-sm">
              <span className="text-red-500 font-bold text-lg">✕</span>
              <span>Falta de técnica para ativar o glúteo (só sente a coxa).</span>
            </p>
            <p className="flex items-start gap-2 text-slate-700 text-sm">
              <span className="text-red-500 font-bold text-lg">✕</span>
              <span>Perde tempo com exercícios "fofos" que não funcionam.</span>
            </p>
          </div>
        </div>
      </section>

      {/* 4. A SOLUÇÃO (MECANISMO CIENTÍFICO) */}
      <section className="py-12 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            O Segredo do <span className="text-fuchsia-600">Protocolo FX</span>
          </h2>
          <p className="text-center text-slate-600 text-sm mb-8">
            Não é mágica, é ciência aplicada ao treino feminino.
          </p>

          <div className="space-y-4">
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex gap-4">
              <div className="bg-fuchsia-100 p-3 rounded-full h-fit">
                <Dumbbell className="text-fuchsia-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Método PHAT & Push/Pull</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Combinamos força e hipertrofia (Power Hypertrophy Adaptive Training) com divisões inteligentes. Você nunca mais vai depender de ficha genérica.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex gap-4">
              <div className="bg-green-100 p-3 rounded-full h-fit">
                <CheckCircle2 className="text-green-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Fichas Ilustradas Passo a Passo</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Treinos focados em cada grupamento muscular. É só copiar e colar na academia.
                </p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-100 flex gap-4">
              <div className="bg-amber-100 p-3 rounded-full h-fit">
                <Star className="text-amber-600" size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">Foco em Glúteo e Perna</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Técnicas específicas para "acordar" o músculo e gerar volume e definição onde mulher mais deseja.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROVA SOCIAL */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-md mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Elas trocaram o treino fofo pelo <span className="text-fuchsia-600">Protocolo FX</span></h2>
        </div>

        <div className="max-w-md mx-auto space-y-6">
          {/* Testimonial 1 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm relative">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#fbbf24" className="text-amber-400" />)}
            </div>
            <p className="text-slate-600 text-sm italic mb-4">"Eu achei que por 10 reais seria algo bobo, mas o material é melhor que a consultoria de 200 reais que eu pagava. Meu glúteo finalmente acordou!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=5" alt="Aluna" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">Juliana Mendes</p>
                <p className="text-xs text-green-600 font-semibold">Aluna verificada</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm relative">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#fbbf24" className="text-amber-400" />)}
            </div>
            <p className="text-slate-600 text-sm italic mb-4">"Em 20 dias seguindo a ficha 2, minhas calças já estão mais apertadas na coxa. Sensacional!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=9" alt="Aluna" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">Carla Souza</p>
                <p className="text-xs text-green-600 font-semibold">Aluna verificada</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 (Novo) */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm relative">
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="#fbbf24" className="text-amber-400" />)}
            </div>
            <p className="text-slate-600 text-sm italic mb-4">"Confesso que comprei só pelo preço, mas me surpreendi demais. A divisão de treino é perfeita, não fico mais perdida na academia. Amei!"</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-slate-300 overflow-hidden">
                <img src="https://i.pravatar.cc/150?img=32" alt="Aluna" className="w-full h-full object-cover" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-900 text-sm">Renata Lima</p>
                <p className="text-xs text-green-600 font-semibold">Aluna verificada</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. OFERTA IRRESISTÍVEL (ANCHORING) */}
      <section id="offer" className="py-14 px-4 bg-slate-900 text-white text-center relative overflow-hidden">
        {/* Abstract Background Element */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/40 via-slate-900 to-slate-900 pointer-events-none"></div>

        <div className="max-w-md mx-auto relative z-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm shadow-2xl">

            <p className="text-slate-300 uppercase tracking-widest text-xs font-bold mb-4">Oferta por tempo limitado</p>

            {/* Timer */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="bg-red-600 text-white px-3 py-1 rounded font-mono font-bold animate-pulse shadow-lg shadow-red-900/50">
                {formatTime(timeLeft)}
              </div>
              <span className="text-sm text-red-400 font-medium">para o desconto acabar</span>
            </div>

            {/* Price Anchor */}
            <div className="space-y-2 mb-6">
              <p className="text-slate-400 text-lg line-through font-medium">De R$ 97,00</p>
              <div className="flex justify-center items-baseline gap-1">
                <span className="text-2xl font-bold">Por</span>
                <span className="text-6xl font-black text-green-400 tracking-tighter">10,00</span>
              </div>
              <p className="text-slate-300 text-sm">Pagamento único. Acesso vitalício.</p>
            </div>

            {/* Main CTA */}
            <a href="https://go.hotmart.com/F104052373S?ap=9f98" className="flex flex-col items-center justify-center w-full bg-green-500 hover:bg-green-400 text-white rounded-lg shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all hover:scale-105 py-4 mb-4">
              <span className="font-black text-xl uppercase leading-none mb-1">QUERO TREINAR DE VERDADE</span>
            </a>

            <p className="text-xs text-slate-400">Menos que um café na padaria ☕</p>
          </div>
        </div>
      </section>

      {/* 7. GARANTIA & FAQ */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-md mx-auto">

          {/* Garantia */}
          <div className="flex flex-col items-center text-center mb-12">
            <ShieldCheck size={64} className="text-slate-800 mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-slate-900 mb-2">Garantia Blindada de 7 Dias</h3>
            <p className="text-slate-600 text-sm">
              Se você não gostar do conteúdo, nós devolvemos 100% do seu dinheiro. Sem perguntas. O risco é todo meu.
            </p>
          </div>

          {/* FAQ */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 mb-4 text-center">Perguntas Frequentes</h3>

            {/* Pergunta 1 */}
            <details className="group bg-slate-50 p-4 rounded-lg cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-700 list-none">
                O que vou receber?
                <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
              </summary>
              <div className="text-slate-600 text-sm mt-3 space-y-3">
                <p>Ao adquirir as planilhas de treino, você terá acesso a um conteúdo completo para transformar seus resultados, incluindo:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Planilhas personalizadas para hipertrofia, emagrecimento, definição muscular e mobilidade.</li>
                  <li>Programas variados para iniciantes e avançados (ABC, ABCD, Full Body, HIIT, etc).</li>
                  <li>Treinos para 1 ano inteiro, garantindo evolução constante.</li>
                </ul>
                <p className="font-bold text-fuchsia-600">Bônus Exclusivos:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>E-book de Suplementação.</li>
                  <li>Vídeos e GIFs explicativos.</li>
                  <li>Guia de Nutrição.</li>
                </ul>
              </div>
            </details>

            {/* Pergunta 2 */}
            <details className="group bg-slate-50 p-4 rounded-lg cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-700 list-none">
                Como receberei este produto?
                <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
              </summary>
              <p className="text-slate-600 text-sm mt-3">
                Após a confirmação do pagamento, você receberá um e-mail com o link para baixar os treinos imediatamente. Assim, poderá acessá-lo no seu celular, tablet ou computador a qualquer momento!
              </p>
            </details>

            {/* Pergunta 3 */}
            <details className="group bg-slate-50 p-4 rounded-lg cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-700 list-none">
                E se eu não gostar? Tem garantia?
                <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
              </summary>
              <p className="text-slate-600 text-sm mt-3">
                Sim! Se por algum motivo você achar que o material não atendeu às suas expectativas, basta solicitar o reembolso dentro do prazo estabelecido. Seu investimento é 100% seguro! Sem riscos, sem pegadinhas.
              </p>
            </details>

            {/* Pergunta 4 */}
            <details className="group bg-slate-50 p-4 rounded-lg cursor-pointer">
              <summary className="flex justify-between items-center font-semibold text-slate-700 list-none">
                Por quanto tempo poderei acessar as planilhas?
                <ChevronDown className="transition-transform group-open:rotate-180" size={20} />
              </summary>
              <p className="text-slate-600 text-sm mt-3">
                O acesso é vitalício! Uma vez que você compra, pode acessar sempre que precisar, sem limite de tempo.
              </p>
            </details>

          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="bg-slate-900 py-8 px-4 border-t border-slate-800">
        <div className="max-w-md mx-auto text-center space-y-4">
          <p className="text-slate-500 text-xs">
            © 2026 Protocolo FX. Todos os direitos reservados.
          </p>
          <div className="flex justify-center gap-4 text-xs text-slate-600">
            <a href="#" className="hover:text-slate-400">Termos de Uso</a>
            <a href="#" className="hover:text-slate-400">Políticas de Privacidade</a>
          </div>
          <p className="text-[10px] text-slate-700 mt-4">
            Este produto não substitui o parecer médico profissional. Sempre consulte um médico para tratar de assuntos relativos à saúde.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;