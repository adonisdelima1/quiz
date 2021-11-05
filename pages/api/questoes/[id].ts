import questoes from "../bancoDeQuestoes"
export default function handler(req, res) {
  const idSelecionado = +req.query.id

  const questaoEncontrada = questoes.filter(questao => questao.id === idSelecionado)

  if (questaoEncontrada.length === 1) {
    const questaoSelecionada = questaoEncontrada[0].embaralharRespostas()
    const questaoRespondida = questaoSelecionada.converterParaObjeto()
    res.status(200).json(questaoRespondida)
  } else {
    res.status(404).send()
  }
}