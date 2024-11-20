const db = require('../utils/db');
const { validateInput } = require('../utils/security');

// Função para criar contrato
function createContract(req, res) {
  const { empresa, data_inicio } = req.body;

  // Verifica se os campos obrigatórios estão presentes
  if (!empresa || !data_inicio) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Cria um novo contrato
  const newContract = {
    id: db.contracts.length + 1,
    empresa,
    data_inicio,
  };

  db.contracts.push(newContract);

  // Retorna o contrato criado
  res.status(201).json({ message: 'Contract created', contract: newContract });
}

// Função para listar contratos
function getContracts(req, res) {
  const { empresa, inicio } = req.params;

  console.log('Parâmetros Recebidos:', { empresa, inicio }); // Log para depuração

  // Valida os parâmetros recebidos
  if (!validateInput(empresa) || !validateInput(inicio)) {
    console.error('Parâmetros Inválidos:', { empresa, inicio });
    return res.status(400).json({ message: 'Invalid input parameters' });
  }

  // Busca os contratos no mock de dados
  const contracts = db.contracts.filter(
    (contract) => contract.empresa === empresa && contract.data_inicio === inicio
  );

  // Retorna erro caso nenhum contrato seja encontrado
  if (contracts.length === 0) {
    return res.status(404).json({ message: 'No contracts found' });
  }

  // Retorna os contratos encontrados
  res.status(200).json({ contracts });
}

// Função para listar contratos por usuário logado
function getContractsByUser(req, res) {
  const userId = req.user.id; // Obtém o ID do usuário a partir do token JWT

  console.log('ID do Usuário:', userId); // Log para depuração

  // Filtra os contratos associados ao usuário logado
  const userContracts = db.contracts.filter((contract) => contract.userId === userId);

  // Retorna erro caso nenhum contrato seja encontrado
  if (userContracts.length === 0) {
    return res.status(404).json({ message: 'No contracts found for this user' });
  }

  // Retorna os contratos encontrados
  res.status(200).json({ contracts: userContracts });
}

// Exporta todas as funções
module.exports = { createContract, getContracts, getContractsByUser };
