// --- VARIÁVEIS DO QUIZ ---
const questions = [
    // Seus dados de perguntas
    { question: "O que mais te desperta curiosidade?", options: { a: "Como os aplicativos e sistemas funcionam por trás das telas", b: "Como as máquinas e robôs executam seus movimentos", c: "Como unir o digital e o físico em um solo projeto" } },
    { question: "Você prefere trabalhar com:", options: { a: "Computadores e softwares", b: "Equipamentos e máquinas", c: "Um pouco dos dois" } },
    { question: "Quando algo não funciona direito, você tende a:", options: { a: "Analisar o problema e revisar o código", b: "Abrir o aparelho e investigar o que está errado fisicamente", c: "Procurar uma forma prática e rápida de resolver" } },
    { question: "Você gostaria mais de:", options: { a: "Criar aplicativos e sistemas para pessoas e empresas", b: "Desenvolver máquinas automatizadas e robôs", c: "Trabalhar em projetos que conectem software e hardware" } },
    { question: "Qual dessas atividades te parece mais interessante?", options: { a: "Programar e ver um software funcionando", b: "Montar e testar um sistema com motores e sensores", c: "Integrar um sistema digital com um equipamento físico" } },
    { question: "Você se sente mais confortável com:", options: { a: "Lógica, algoritmos e programação", b: "Mecânica, eletrônica e controle", c: "Resolver problemas que envolvem várias áreas ao mesmo tempo" } },
    { question: "O que você mais gosta de ver funcionando?", options: { a: "Um site ou aplicativo fluindo perfeitamente", b: "Uma máquina automatizada executando uma tarefa sozinha", c: "Um sistema que combina software e robótica" } },
    { question: "Qual tipo de erro você prefere resolver?", options: { a: "Um bug no código", b: "Um defeito elétrico ou mecânico", c: "Um problema de integração entre os dois" } },
    { question: "Você se considera mais:", options: { a: "Analítico e lógico", b: "Prático e experimental", c: "Criativo e adaptável" } },
    { question: "Você aprende melhor quando:", options: { a: "Estuda conceitos teóricos e códigos", b: "Coloca a mão na massa e testa na prática", c: "Alterna entre teoria e prática" } },
    { question: "Onde você se imagina trabalhando no futuro?", options: { a: "Em uma empresa de tecnologia, desenvolvendo softwares", b: "Em uma indústria automatizada, mexendo com máquinas e robôs", c: "Em um ambiente que conecte tecnologia digital e automação" } },
    { question: "Qual tipo de inovação mais te empolga?", options: { a: "Aplicativos, inteligência artificial e dados", b: "Robótica, automação e controle", c: "Internet das Coisas (IoT), onde tudo se conecta" } }
];

const cursosInfo = {
    ads: "💻 ADS: Focado em criar, analisar, desenvolver e gerenciar softwares, aplicativos e sistemas de informação. Envolve muita programação e lógica de negócios.",
    mecatronica: "🤖 Mecatrônica: Focado em integrar mecânica, eletrônica e software para criar e manter sistemas automatizados e robôs industriais. Envolve projetos práticos com hardware.",
    neutro: "💡 Perfil Equilibrado! Você se encaixa bem em áreas que unem ADS e Mecatrônica, como Automação de Sistemas ou IoT."
};

let currentQuestion = 0;
let adsScore = 0;
let mecScore = 0;
const totalQuestions = questions.length;

const quizContainer = document.getElementById("quiz");
const resultContainer = document.getElementById("result");
const player = document.getElementById('player'); 


// --- FUNÇÃO DE CONTROLE DE PROGRESSO (MOVIMENTO DO PLAYER) ---

/**
 * Calcula e move o sprite do jogador para a posição correspondente ao progresso do quiz.
 */
function updateProgress() {
    if (!player) return;

    // Calcula a porcentagem de progresso (de 0% a 100%)
    const progressPercent = (currentQuestion / totalQuestions) * 100;
    
    // Define a posição LEFT do sprite (0% a 100% da largura do quiz-container)
    player.style.left = `${progressPercent}%`;
}


// --- FUNÇÕES DE CONTROLE DO QUIZ ---

/**
 * Carrega a tela inicial do jogo.
 */
function showStartScreen() {
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');

    quizContainer.innerHTML = `
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
    
    // Zera o progresso (player volta para o ponto inicial 0%)
    updateProgress();
}

/**
 * Inicia o quiz de fato, carregando a primeira questão.
 */
function startQuiz() {
    loadQuestion(); 
}


/**
 * Inicia ou carrega a próxima questão do quiz.
 */
function loadQuestion() {
    if (currentQuestion >= totalQuestions) {
        showResult();
        return;
    }

    // Atualiza a posição do personagem antes de mostrar a nova questão
    updateProgress(); 

    const q = questions[currentQuestion];
    
    const counter = `<div class="question-counter">Esfinge ${currentQuestion + 1} de ${totalQuestions}</div>`;
    
    quizContainer.innerHTML = `
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

/**
 * Registra a resposta e avança.
 */
function selectAnswer(option) {
    if (option === "a") adsScore++;
    if (option === "b") mecScore++;
    if (option === "c") {
        adsScore += 0.5;
        mecScore += 0.5;
    }
    currentQuestion++;
    
    // Pequeno delay para que o sprite ande antes da próxima pergunta
    setTimeout(loadQuestion, 500); 
}

/**
 * Exibe a tela de resultados.
 */
function showResult() {
    // Garante que o personagem chegue ao fim (100%)
    currentQuestion = totalQuestions;
    updateProgress(); 
    
    setTimeout(() => {
        quizContainer.classList.add("hidden");
        resultContainer.classList.remove("hidden");

        let suggestion = "";
        let courseDetails = "";

        if (adsScore > mecScore + 1.5) { 
            suggestion = "🔑 Parabéns! Seu perfil é o de um **Mago dos Códigos**!";
            courseDetails = cursosInfo.ads;
        } else if (mecScore > adsScore + 1.5) {
            suggestion = "🔑 Parabéns! Seu perfil é o de um **Guardião das Máquinas**!";
            courseDetails = cursosInfo.mecatronica;
        } else {
            suggestion = "🗝️ Seu perfil é **Versátil**! O futuro aceita todas as suas habilidades.";
            courseDetails = cursosInfo.neutro;
        }

        resultContainer.innerHTML = `
            <h2>${suggestion}</h2>
            <p style="margin-top: 15px; font-weight: bold;">[ DESTINO FINAL ]</p>
            <p>${courseDetails}</p>
            <p style="margin-top: 15px;">**Pontuação Final:**</p>
            <p>ADS: <span style="color: #00ff00; font-weight: bold;">${adsScore.toFixed(1)}</span> | Mecatrônica: <span style="color: #00ff00; font-weight: bold;">${mecScore.toFixed(1)}</span></p>
            
            <div style="text-align: center;">
                <button class="restart-btn" onclick="restartQuiz()">[ Recomeçar a Jornada ]</button>
            </div>
        `;
    }, 500); // Espera a animação do sprite antes de mostrar o resultado final
}

/**
 * Reseta o jogo.
 */
function restartQuiz() {
    currentQuestion = 0;
    adsScore = 0;
    mecScore = 0;
    
    showStartScreen();
}

// Inicializa o jogo
showStartScreen();