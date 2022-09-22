class CPF {
  constructor(cpf) {
    Object.defineProperty(this, 'cpfFormatado', {
      value: cpf.replace(/\D+/g, ''),
      enumerable: false,
      writable: true,
      configurable: false,
    });
  }

  isSequence() {
    return this.cpfFormatado[0].repeat(this.cpfFormatado.length) === this.cpfFormatado;
  }

  digitos(cpfParcial) {
    const arrCpf = Array.from(cpfParcial);
    let regresso = arrCpf.length + 1;
    const soma = arrCpf.reduce((acc, val) => {
      acc += (regresso * Number(val));

      regresso -= 1;

      return acc;
    }, 0);

    const digitos = 11 - (soma % 11);

    return digitos > 9 ? '0' : String(digitos);
  }

  validacao() {
    if (typeof this.cpfFormatado === 'undefined') return false;
    if (this.cpfFormatado.length > 11) return false;
    if (this.isSequence()) return false;

    const cpfParcial = this.cpfFormatado.slice(0, -2);
    const digits1 = this.digitos(cpfParcial);
    const digits2 = this.digitos(cpfParcial + digits1);

    const novoCpf = cpfParcial + digits1 + digits2;

    return novoCpf === this.cpfFormatado;
  }
}

export default (req, res, next) => {
  const { cpf } = req.body;
  const validCpf = new CPF(cpf);
  if (!validCpf.validacao()) {
    return res.status(400).json({ errors: ['CPF invalid.'] });
  }

  return next();
};
