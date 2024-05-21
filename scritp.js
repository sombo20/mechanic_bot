const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null;
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", `${className}`);
  let chatContent =
    className === "outgoing"
      ? `<p></p>`
      : `<span class="material-symbols-outlined">smart_toy</span><p class="typing-animation"></p>`;
  chatLi.innerHTML = chatContent;
  chatLi.querySelector("p").textContent = message;
  return chatLi;
};

const encontrarPalavraChave = (entradaUsuario) => {
  const palavrasChave = {
    motor:
      "Seu problema parece estar relacionado ao motor. Verifique o nível do líquido de arrefecimento e o estado das mangueiras e do radiador.",
    freios:
      "Parece que seus freios estão com problemas. Verifique o estado dos discos e das pastilhas de freio.",
    pneus:
      "Parece que um dos seus pneus está murcho. Verifique se há algum objeto perfurante no pneu ou se há um vazamento de ar.",
    transmissão:
      "O problema pode estar na transmissão. Verifique o nível e a condição do fluido da transmissão e se há vazamentos.",
    direção:
      "Pode haver um problema no sistema de direção. Verifique o nível do fluido de direção hidráulica e se há vazamentos.",
    bateria:
      "O problema pode estar na bateria. Verifique se os terminais estão limpos e se há corrente suficiente.",
    injeção:
      "Parece que há um problema no sistema de injeção. Verifique os sensores e os injetores de combustível.",
    arrefecimento:
      "O motor pode estar superaquecendo devido a um problema no sistema de arrefecimento. Verifique o radiador e a ventoinha.",
    combustível:
      "Pode haver um problema no sistema de combustível. Verifique o filtro de combustível e se há vazamentos na linha de combustível.",
    suspensão:
      "O problema pode estar na suspensão. Verifique os amortecedores, molas e buchas.",
    embraiagem:
      "Parece que há um problema na embraiagem. Verifique o fluido da embraiagem e o estado dos componentes.",
    iluminação:
      "Parece que há um problema no sistema de iluminação. Verifique as lâmpadas e os fusíveis.",
    aquecimento:
      "Pode haver um problema no sistema de aquecimento. Verifique as mangueiras e a válvula termostática.",
    "freio mão":
      "O problema pode estar relacionado ao freio de mão. Verifique se está ajustado corretamente e se há desgaste nas pastilhas.",
    correia:
      "Parece que a correia do motor pode estar desgastada ou solta. Verifique a condição da correia e se está devidamente tensionada.",
    "filtro ar":
      "O filtro de ar pode estar sujo, afetando o desempenho do motor. Verifique e substitua-o, se necessário.",
    sensor:
      "Pode haver um problema em um dos sensores do veículo. Verifique os sensores de temperatura, pressão, etc.",
    eletroventilador:
      "O problema pode estar no eletroventilador do radiador. Verifique se está funcionando corretamente.",
    "sistema elétrico":
      "Pode haver um problema no sistema elétrico. Verifique os fusíveis, relés e conexões elétricas.",
    "sistema escapamento":
      "O problema pode estar no sistema de escape. Verifique se há vazamentos ou se alguma peça está danificada.",
  };

  entradaUsuario = entradaUsuario.toLowerCase();

  for (const chave in palavrasChave) {
    if (entradaUsuario.includes(chave)) {
      return palavrasChave[chave];
    }
  }

  return "Desculpe, não encontrei uma resposta para sua pergunta.";
};

const handleChat = () => {
  userMessage = chatInput.value.trim();
  if (!userMessage) return;

  chatInput.value = "";
  chatInput.style.height = `${inputInitHeight}px`;

  chatbox.appendChild(createChatLi(userMessage, "outgoing"));
  chatbox.scrollTo(0, chatbox.scrollHeight);

  setTimeout(() => {
    const incomingChatLi = createChatLi("", "incoming");
    chatbox.appendChild(incomingChatLi);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    const resposta = encontrarPalavraChave(userMessage);
    mostrarRespostaAnimada(incomingChatLi.querySelector("p"), resposta);
  }, 600);
};

const mostrarRespostaAnimada = (elemento, resposta) => {
  const caracteresResposta = resposta.split("");
  let index = 0;
  const intervalId = setInterval(() => {
    if (index < caracteresResposta.length) {
      elemento.textContent += caracteresResposta[index];
      index++;
    } else {
      clearInterval(intervalId);
      chatbox.scrollTo(0, chatbox.scrollHeight);
    }
  }, 100);
};

chatInput.addEventListener("input", () => {
  chatInput.style.height = `${inputInitHeight}px`;
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
    e.preventDefault();
    handleChat();
  }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () =>
  document.body.classList.remove("show-chatbot")
);
chatbotToggler.addEventListener("click", () =>
  document.body.classList.toggle("show-chatbot")
);
