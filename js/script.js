// --- VARIÁVEIS DO QUIZ E REFERÊNCIAS ---
const questions = [
    // Seus dados de perguntas (mantidos)
    { question: "O que mais te desperta curiosidade?", options: { a: "Como os aplicativos e sistemas funcionam por trás das telas", b: "Como as máquinas e robôs executam seus movimentos", c: "Como unir o digital e o físico em um solo projeto" } },
    { question: "Você prefere trabalhar com:", options: { a: "Computadores e softwares", b: "Equipamentos e máquinas", c: "Um pouco dos dois" } },
    { question: "Quando algo não funciona direito, você tende a:", options: { a: "Analisar o problema e revisar o código", b: "Abrir o aparelho e investigar o que está errado fisicamente", c: "Procurar uma forma prática e rápida de resolver" } },
    { question: "Você gostaria mais de:", options: { a: "Criar aplicativos e sistemas para pessoas e empresas", b: "Desenvolver máquinas automatizadas e robôs", c: "Trabalhar em projetos que conectem software e hardware" } },
    { question: "Qual dessas atividades te parece mais interessante?", options: { a: "Programar e ver um software funcionando", b: "Montar e testar um sistema com motores e sensores", c: "Integrar um sistema digital com um equipamento físico" } },
    { question: "Você se sente mais confortável com:", options: { a: "Lógica, algoritmos e programação", b: "Mecânica, eletrônica e controle", c: "Resolver problemas que envolvem várias áreas ao mesmo tempo" } },
    { question: "O que você mais gosta de ver funcionando?", options: { a: "Um site ou aplicativo fluindo perfeitamente", b: "Uma máquina automatizada executando uma tarefa sozinha", c: "Um sistema que combina software e robótica" } },
    { question: "Qual tipo de erro você prefere resolver?", options: { a: "Um bug no código", b: "Um defeito elétrico ou mecânico", c: "Um problema de integração entre os dois" } },
    { question: "Você se considera mais:", options: { a: "Analítico e lógico", b: "Prático e experimental", c: "Criativo e adaptável" } },
    { question: "Você aprende melhor quando:", options: { a: "Estuda conceitos teóricos e códigos", b: "Coloca a mão na mão e testa na prática", c: "Alterna entre teoria e prática" } },
    { question: "Onde você se imagina trabalhando no futuro?", options: { a: "Em uma empresa de tecnologia, desenvolvendo softwares", b: "Em uma indústria automatizada, mexendo com máquinas e robôs", c: "Em um ambiente que conecte tecnologia digital e automação" } },
    { question: "Qual tipo de inovação mais te empolga?", options: { a: "Aplicativos, inteligência artificial e dados", b: "Robótica, automação e controle", c: "Internet das Coisas (IoT), onde tudo se conecta" } }
];

const cursosInfo = {
    ads: "💻 MAGIA DOS SISTEMAS: Focado em criar, analisar, desenvolver e gerenciar softwares, aplicativos e sistemas de informação. Envolve muita programação e lógica de negócios.",
    mecatronica: "🤖 TOCA DOS MECATRÔNICOS: Focado em integrar mecânica, eletrônica e software para criar e manter sistemas automatizados e robôs industriais. Envolve projetos práticos com hardware.",
    neutro: "💡 Perfil Versátil! Você se encaixa bem em áreas que unem ADS e Mecatrônica, como Automação de Sistemas ou IoT."
};

let currentQuestion = 0;
let adsScore = 0;
let mecScore = 0;
const totalQuestions = questions.length;

// Referências seguras aos elementos (CRUCIAL para evitar 'bugado')
const quizContainer = document.querySelector(".quiz-container"); 
const quizContent = document.getElementById("quiz-content"); // Mudou para "quiz-content"
const player = document.getElementById('player'); 
const finalScreen = document.getElementById('final-screen'); 
const resultDetails = document.getElementById('result-details'); 

// Cores e Posições
const colorMeca = [90, 90, 90];   
const colorAds = [0, 150, 200];   
const POS_MECA = 25; 
const POS_ADS = 75;  
const POS_NEUTRO = 50; 

// --- FUNÇÕES DE CONTROLE DE CORES E PROGRESSO ---
const lerp = (start, end, t) => Math.round(start * (1 - t) + end * t);

function updateColor() {
    // ... (Mantida) ...
    if (!quizContainer) return; // Checagem de segurança
    if (currentQuestion === 0) {
        quizContainer.style.backgroundColor = 'rgba(4, 15, 60, 0.9)';
        return;
    }
    const totalScore = adsScore + mecScore;
    const adsRatio = totalScore > 0 ? adsScore / totalScore : 0.5; 
    const r = lerp(colorMeca[0], colorAds[0], adsRatio);
    const g = lerp(colorMeca[1], colorAds[1], adsRatio);
    const b = lerp(colorMeca[2], colorAds[2], adsRatio);
    quizContainer.style.backgroundColor = `rgba(${r}, ${g}, ${b}, 0.9)`;
}

function updateProgress() {
    if (!player) return; // Checagem de segurança

    const progressPercent = (currentQuestion / totalQuestions) * 100;
    
    // Move o player apenas se ele estiver DENTRO do quiz-container
    if (player.parentNode === quizContainer) {
        player.style.left = `${progressPercent}%`;
    }
}


// --- FUNÇÕES DE CONTROLE DO QUIZ ---

/**
 * Prepara a tela inicial, move o player para a barra de progresso.
 */
function showStartScreen() {
    // Esconde tela final
    finalScreen.classList.add('hidden');
    resultDetails.classList.add('hidden');
    document.getElementById('meca-label').classList.add('hidden'); 
    document.getElementById('ads-label').classList.add('hidden');

    // Mostra quiz box
    quizContainer.classList.remove('hidden'); 
    
    // **********************************************
    // CORREÇÃO CRUCIAL: Movendo o player para a barra
    // **********************************************
    if (player && quizContainer) {
        // Garante que o player volte para o quiz-container
        if (player.parentNode !== quizContainer) {
            quizContainer.prepend(player); 
        }
        player.classList.remove('player-final');
        // Limpa estilos fixos que vieram da tela final
        player.style.top = '';
        player.style.left = '0%'; // Começa em 0%
    }
    // **********************************************

    quizContent.innerHTML = `
        <div style="text-align: left;">
            <p style="font-size: 1.1em; margin-bottom: 20px;">
                "Meu corpo está estranho... preciso descobrir o que está acontecendo comigo... Eu não lembro nem onde estou!"
                <br><br>
                <strong>Você precisa atravessar a Ponte do Conhecimento, respondendo a ${totalQuestions} Esfínges do Destino.</strong>
            </p>
            <div style="text-align: center;">
                <button class="start-btn" onclick="startQuiz()">[ Iniciar Desafio ]</button> 
            </div>
        </div>
    `;
    
    updateProgress();
    updateColor(); 
}

function startQuiz() {
    loadQuestion(); 
}


function loadQuestion() {
    if (currentQuestion >= totalQuestions) {
        animateResult();
        return;
    }

    updateProgress(); 
    updateColor();
    
    const q = questions[currentQuestion];
    
    const counter = `<div class="question-counter">Esfinge ${currentQuestion + 1} de ${totalQuestions}</div>`;
    
    quizContent.innerHTML = `
        ${counter}
        <div class="question">
          <h3>${q.question}</h3>
          <div class="options">
            ${Object.entries(q.options)
              .map(
                ([key, text]) =>
                  `<button onclick="selectAnswer('${key}')">${text}</button>`
              )
              .join("")}
          </div>
        </div>
    `;
}

function selectAnswer(option) {
    if (option === "a") adsScore++;
    if (option === "b") mecScore++;
    if (option === "c") {
        adsScore += 0.5;
        mecScore += 0.5;
    }
    currentQuestion++;
    
    setTimeout(loadQuestion, 500); 
}

/**
 * Anima o player para a casa de destino e exibe o resultado.
 */
function animateResult() {
    
    // 1. Pega a posição final do player na barra e TRANSFERE.
    const finalLeftQuiz = player.style.left; 
    document.body.appendChild(player); 
    player.classList.add('player-final');
    
    // 2. Define a posição inicial do player no mapa (onde ele estava na barra).
    player.style.top = '75vh'; // Altura que corresponde ao chão onde a barra estava
    player.style.left = finalLeftQuiz; 
    
    // 3. Determina o Destino Final
    let finalPosition = POS_NEUTRO;
    let finalSuggestion = "";
    let courseDetails = "";

    if (adsScore > mecScore + 1.5) { 
        finalPosition = POS_ADS;
        finalSuggestion = "🔑 Seu Destino: MAGIA DOS SISTEMAS!";
        courseDetails = cursosInfo.ads;
    } else if (mecScore > adsScore + 1.5) {
        finalPosition = POS_MECA;
        finalSuggestion = "🔑 Seu Destino: TOCA DOS MECATRÔNICOS!";
        courseDetails = cursosInfo.mecatronica;
    } else {
        finalPosition = POS_NEUTRO;
        finalSuggestion = "🗝️ Seu Destino: CAMINHO VERSÁTIL!";
        courseDetails = cursosInfo.neutro;
    }

    // 4. Esconde o quizContainer e revela os labels e a tela final.
    quizContainer.classList.add('hidden');
    finalScreen.classList.remove('hidden');
    document.getElementById('meca-label').classList.remove('hidden'); 
    document.getElementById('ads-label').classList.remove('hidden');


    // 5. Animação Final: Move o player para cima e para o lado do destino (2 segundos)
    setTimeout(() => {
        player.style.top = '65vh'; // Posição vertical final (chão perto das casas)
        player.style.left = `${finalPosition}%`;
        
        // 6. Exibe os Detalhes do Resultado após a animação (2.5s)
        setTimeout(() => {
            showResultDetails(finalSuggestion, courseDetails);
        }, 2000); 
        
    }, 100); 
}


function showResultDetails(suggestion, details) {
    resultDetails.innerHTML = `
        <h2>${suggestion}</h2>
        <p style="margin-top: 15px; font-weight: bold;">[ RELATÓRIO VOCACIONAL ]</p>
        <p>${details}</p>
        <p style="margin-top: 15px;">**Pontuação Final:**</p>
        <p>Sistemas (ADS): <span style="color: #00ff00; font-weight: bold;">${adsScore.toFixed(1)}</span> | Mecatrônica: <span style="color: #00ff00; font-weight: bold;">${mecScore.toFixed(1)}</span></p>
        
        <div style="text-align: center;">
            <button class="restart-btn" onclick="restartQuiz()">[ Recomeçar a Jornada ]</button>
        </div>
    `;
    resultDetails.classList.remove('hidden');
}


function restartQuiz() {
    currentQuestion = 0;
    adsScore = 0;
    mecScore = 0;
    
    // Garante que o quiz box apareça novamente
    quizContainer.classList.remove('hidden'); 
    
    // Esconde os elementos do final
    finalScreen.classList.add('hidden'); 
    
    showStartScreen();
}

// Inicializa o jogo
showStartScreen();