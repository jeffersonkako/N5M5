function validateInput(input) {
  // Permite letras, números, hífens e datas no formato YYYY-MM-DD
  const regex = /^[a-zA-Z0-9\s-]+$/;
  return regex.test(input);
}

module.exports = { validateInput };
