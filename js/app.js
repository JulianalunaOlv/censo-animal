let etapaAtual = 1;
const totalEtapas = 5;
const cadastroParcial = {};

document.addEventListener('DOMContentLoaded', () => {
  carregarProgresso();
  document.getElementById('btnProsseguir').addEventListener('click', salvarEtapa);
  document.getElementById('btnFinalizar').addEventListener('click', finalizarCadastro);
  document.getElementById('btnSincronizar').addEventListener('click', sincronizarCadastros);
  exibirCadastrosArmazenados();
});

function salvarEtapa() {
  const etapa = document.querySelector(`#etapa${etapaAtual}`);
  const inputs = etapa.querySelectorAll('input, select');
  
  inputs.forEach(input => {
    if (input.name) {
      cadastroParcial[input.name] = input.value || input.checked;
    }
  });

  localStorage.setItem(`cadastro_etapa_${etapaAtual}`, JSON.stringify(cadastroParcial));

  if (etapaAtual < totalEtapas) {
    document.querySelector(`#etapa${etapaAtual}`).classList.remove('ativa');
    etapaAtual++;
    document.querySelector(`#etapa${etapaAtual}`).classList.add('ativa');
    atualizarBarraProgresso();
  }
}

function finalizarCadastro() {
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];
  cadastros.push({ ...cadastroParcial, status: 'pendente' });
  localStorage.setItem('cadastros', JSON.stringify(cadastros));

  // Limpa dados parciais
  for (let i = 1; i <= totalEtapas; i++) {
    localStorage.removeItem(`cadastro_etapa_${i}`);
  }

  document.getElementById('formularioMultiEtapas').reset();
  document.querySelectorAll('.etapa').forEach(e => e.classList.remove('ativa'));
  etapaAtual = 1;
  document.querySelector(`#etapa${etapaAtual}`).classList.add('ativa');
  atualizarBarraProgresso();
  exibirCadastrosArmazenados();
}

function exibirCadastrosArmazenados() {
  const lista = document.getElementById('listaCadastros');
  lista.innerHTML = '';
  const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

  cadastros.forEach((cadastro, index) => {
    lista.innerHTML += `<p>#${index + 1} - Nome: ${cadastro.nome || '-'} | Status: ${cadastro.status}</p>`;
  });
}

function sincronizarCadastros() {
  localStorage.removeItem('cadastros');
  exibirCadastrosArmazenados();
  alert('Cadastros enviados com sucesso!');
}

function atualizarBarraProgresso() {
  const barra = document.getElementById('progresso-barra');
  const porcentagem = (etapaAtual / totalEtapas) * 100;
  barra.style.width = `${porcentagem}%`;
  barra.innerText = `Etapa ${etapaAtual} de ${totalEtapas}`;
}

function carregarProgresso() {
  document.querySelector(`#etapa${etapaAtual}`).classList.add('ativa');
  atualizarBarraProgresso();
}
