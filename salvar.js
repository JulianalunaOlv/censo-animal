
  document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // impede envio padrão do formulário

    const dadosCenso = {
      nome: document.getElementById('nome').value,
      cpf: document.getElementById('cpf').value,
      sus: document.getElementById('sus').value,
      telefone: document.getElementById('telefone').value,
      email: document.getElementById('email').value,
      dataNascimento: document.getElementById('dataNascimento').value,
      cep: document.getElementById('cep').value,
      rua: document.getElementById('rua').value,
      numero: document.getElementById('numero').value,
      complemento: document.getElementById('complemento').value,
      bairro: document.getElementById('bairro').value,
    };

    // Recupera o array atual (ou inicia um novo)
    let registros = JSON.parse(localStorage.getItem('censo')) || [];

    // Adiciona o novo registro
    registros.push(dadosCenso);

    // Salva novamente no localStorage
    localStorage.setItem('censo', JSON.stringify(registros));

    // Confirmação visual
    alert('Cadastro realizado com sucesso!');

    // Limpa o formulário
    e.target.reset();
  });