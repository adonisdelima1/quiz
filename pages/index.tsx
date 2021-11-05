import { useEffect, useState } from 'react'
import Questionario from '../components/Questionario'
import QuestaoModel from '../model/questao'
import { useRouter } from 'next/router'


const BASE_URL = 'http://localhost:3000/api'

export default function Home() {
  const router = useRouter()

  const [idsDasQuestoes, setIdsDasQuestoes] = useState([])
  const [questao, setQuestao] = useState<QuestaoModel>()
  const [respostasCertas, setRespostasCertas] = useState(0) 

  async function carregarIdsDasQuestoes() {
    const resp = await fetch(`${BASE_URL}/questionario`)
    const idsDasQuestoes = await resp.json()
    setIdsDasQuestoes(idsDasQuestoes)
  }
 
  async function carregarQuestaoPorId(idQuestao: number) {
    const resp = await fetch(`${BASE_URL}/questoes/${idQuestao}`)
    const jsonRetorno = await resp.json()
    const novaQuestao = QuestaoModel.criarUsandoObjeto(jsonRetorno)
    setQuestao(novaQuestao)
  }
 
  useEffect(() => {
    carregarIdsDasQuestoes()
  }, [])
 
  useEffect(() => {
    idsDasQuestoes.length > 0 && carregarQuestaoPorId(idsDasQuestoes[0])
  }, [idsDasQuestoes])
 
  function manejarQuestaoRespondida(questaoRespondida: QuestaoModel) {
    setQuestao(questaoRespondida)
    const acertou = questaoRespondida.acertou
    setRespostasCertas(respostasCertas + (acertou ? 1 : 0))
  }

  function obterIdProximaQuestao() {
    if(questao) {
      const proximoIndice = idsDasQuestoes.indexOf(questao.id) + 1 
      return idsDasQuestoes[proximoIndice]
    }
  }

  function irProximoPasso() {
    const proximoId = obterIdProximaQuestao()
    proximoId ? irProximaQuestao(proximoId) : finalizarQuestionario()
  }

  function irProximaQuestao(proximoId: number) {
    carregarQuestaoPorId(proximoId)
  }

  function finalizarQuestionario() {
    router.push({
      pathname: "/resultado",
      query: {
        total: idsDasQuestoes.length,
        certas: respostasCertas
      }
    })
  }

  return questao ? (
    <Questionario
      questao={questao}
      ultima={obterIdProximaQuestao() === undefined}
      questaoRespondida={manejarQuestaoRespondida}
      irProximoPasso={irProximoPasso}
    />
  ) : false 
}
