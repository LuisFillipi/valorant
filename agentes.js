function fetchAgentDetails(agentUuid) {
return fetch(`https://valorant-api.com/v1/agents/${agentUuid}`)
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao obter os dados do agente.');
}
  return response.json();
});
}

function showAgentDetails(agentUuid) {
fetchAgentDetails(agentUuid)
.then(agentDetails => {
  if (agentDetails && agentDetails.data) {
  const agentContainer = document.querySelector('.agent-details');
  const agentDiv = document.createElement('div');
  agentDiv.classList.add('agent');
  agentDiv.innerHTML = `
  <h2>${agentDetails.data.displayName}</h2>
  <p>${agentDetails.data.description}</p>
  <p>${agentDetails.data.developerName}</p>
  <img src="${agentDetails.data.displayIcon}" alt="${agentDetails.data.displayName}">
`;

agentContainer.appendChild(agentDiv);
} else {
    console.error('Dados do agente incompletos:', agentDetails);
}
})
.catch(error => {
    console.error('Erro ao obter os detalhes do agente:', error);
});
}

function fetchAgents() {
fetch('https://valorant-api.com/v1/agents')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao obter os dados dos agentes.');
}
  return response.json();
})
.then(data => {
  const agentsContainer = document.querySelector('.agents');
  data.data.forEach(agent => {
  showAgentDetails(agent.uuid);
});
})
.catch(error => {
  console.error('Erro:', error.message);
});
}

window.addEventListener('load', fetchAgents);

