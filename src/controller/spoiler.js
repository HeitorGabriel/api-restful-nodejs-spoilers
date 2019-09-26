const Spoiler = require("../model/Spoiler");
const status = require("http-status");
exports.buscarUm = async (req, res, next) => {
  const { id } = req.params;
  try {
    const spoiler = await Spoiler.findByPk(id);
    if (spoiler) {
      return res.status(status.OK).send(spoiler);
    }
    return res.status(status.NOT_FOUND).send();
  } catch (error) {
    return next(error);
  }
};

exports.buscarTodos = async (req, res, next) => {
  let limite = parseInt(req.query.limite || 0);
  let pagina = parseInt(req.query.pagina || 0);

  if (!Number.isInteger(limite) || !Number.isInteger(pagina)) {
    return res.status(status.BAD_REQUEST).send();
  }

  const ITENS_POR_PAGINA = 10;
  limite = limite > ITENS_POR_PAGINA || limite <= 0 ? ITENS_POR_PAGINA : limite;
  pagina = pagina <= 0 ? 0 : pagina;

  try {
    const spoilers = await Spoiler.findAll({ limit: limite, offset: pagina });
    return res.send(spoilers);

    return res.status(status.NOT_FOUND).send();
  } catch (error) {
    return next(error);
  }
};

exports.criar = async (req, res, next) => {
  const { titulo, espoliador, descricao } = req.body;
  try {
    await Spoiler.create({ titulo, espoliador, descricao });
    return res.status(status.CREATED).send();
  } catch (error) {
    return next(error);
  }
};

exports.atualizar = async (req, res, next) => {
  const { id } = req.params;
  const { titulo, espoliador, descricao } = req.body;
  try {
    const spoiler = await Spoiler.findByPk(id);
    if (spoiler) {
      await Spoiler.update(
        { titulo, espoliador, descricao },
        { where: { id } }
      );

      return res.status(status.OK).send();
    }

    return res.status(status.NOT_FOUND).send();
  } catch (error) {
    return next(error);
  }
};

exports.excluir = async (req, res, next) => {
  const { id } = req.params;
  try {
    const spoiler = await Spoiler.findByPk(id);
    if (spoiler) {
      await Spoiler.destroy({ where: { id } });
      return res.status(status.OK).send();
    }
    return res.status(status.NOT_FOUND).send();
  } catch (error) {
    return next(error);
  }
};
