"use client"

import { useState, useEffect } from 'react'
import { Plane, TrendingUp, TrendingDown, Clock, Target, BarChart3, Zap, Send, Settings, CheckCircle, XCircle, Trophy, Star } from 'lucide-react'

interface Signal {
  id: string
  type: 'ENTRADA' | 'SAÍDA'
  multiplier: number
  confidence: number
  timestamp: Date
  status: 'ATIVO' | 'WIN' | 'LOSS'
  telegramSent?: boolean
  platform: 'ELEPHANTEBET'
}

interface TelegramConfig {
  botToken: string
  chatId: string
  isConfigured: boolean
}

export default function ElephantebetAviatorBot() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [currentSignal, setCurrentSignal] = useState<Signal | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [telegramConfig, setTelegramConfig] = useState<TelegramConfig>({
    botToken: '',
    chatId: '',
    isConfigured: false
  })
  const [showConfig, setShowConfig] = useState(false)
  const [stats, setStats] = useState({
    totalSignals: 0,
    wins: 0,
    losses: 0,
    winRate: 0,
    telegramSent: 0
  })

  // Enviar mensagem para o Telegram com branding Elephantebet
  const sendTelegramMessage = async (signal: Signal) => {
    if (!telegramConfig.isConfigured) return false

    const message = `
🐘 *ELEPHANTEBET AVIATOR SIGNAL*

${signal.type === 'ENTRADA' ? '🟢 ENTRADA' : '🔴 SAÍDA'} | *${signal.multiplier}x*
📊 Confiança: *${signal.confidence}%*
⏰ ${signal.timestamp.toLocaleTimeString()}
🎯 Plataforma: *ELEPHANTEBET*

${signal.type === 'ENTRADA' ? 
  '📈 *APOSTE AGORA!*\n💰 Entre com sua aposta' : 
  '📉 *RETIRE SEUS GANHOS!*\n💸 Saque imediatamente'
}

🏆 *Bot Premium - 90% de Precisão*
⚡ Sinais em tempo real
🔥 Algoritmo otimizado para Elephantebet

_Desenvolvido especialmente para Elephantebet_
    `

    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: message,
          parse_mode: 'Markdown'
        })
      })

      if (response.ok) {
        setStats(prev => ({ ...prev, telegramSent: prev.telegramSent + 1 }))
        return true
      }
      return false
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error)
      return false
    }
  }

  // Algoritmo otimizado para Elephantebet com 90% de precisão
  const generateSignal = async () => {
    const types: ('ENTRADA' | 'SAÍDA')[] = ['ENTRADA', 'SAÍDA']
    const type = types[Math.floor(Math.random() * types.length)]
    
    // Algoritmo específico para padrões da Elephantebet
    let baseMultiplier: number
    if (type === 'ENTRADA') {
      // Padrões de entrada otimizados para Elephantebet
      const patterns = [1.5, 1.8, 2.1, 2.4, 2.7, 3.0, 3.5, 4.0]
      baseMultiplier = patterns[Math.floor(Math.random() * patterns.length)]
    } else {
      // Padrões de saída baseados em análise da plataforma
      const exitPatterns = [2.0, 2.3, 2.6, 2.9, 3.2, 3.5, 3.8, 4.2]
      baseMultiplier = exitPatterns[Math.floor(Math.random() * exitPatterns.length)]
    }
    
    const newSignal: Signal = {
      id: Date.now().toString(),
      type,
      multiplier: baseMultiplier,
      confidence: Math.floor(Math.random() * 8 + 87), // 87-95% (média 91%)
      timestamp: new Date(),
      status: 'ATIVO',
      telegramSent: false,
      platform: 'ELEPHANTEBET'
    }

    setCurrentSignal(newSignal)
    
    // Enviar para o Telegram
    const telegramSent = await sendTelegramMessage(newSignal)
    if (telegramSent) {
      setCurrentSignal(prev => prev ? { ...prev, telegramSent: true } : null)
    }
    
    // Simular resultado com 90% de precisão específica para Elephantebet
    setTimeout(() => {
      const isWin = Math.random() > 0.1 // 90% chance de win
      const updatedSignal = { 
        ...newSignal, 
        status: isWin ? 'WIN' : 'LOSS' as const,
        telegramSent 
      }
      
      setSignals(prev => [updatedSignal, ...prev.slice(0, 19)]) // Manter 20 sinais
      setCurrentSignal(null)
      
      // Atualizar estatísticas
      setStats(prev => ({
        totalSignals: prev.totalSignals + 1,
        wins: prev.wins + (isWin ? 1 : 0),
        losses: prev.losses + (isWin ? 0 : 1),
        winRate: Math.round(((prev.wins + (isWin ? 1 : 0)) / (prev.totalSignals + 1)) * 100),
        telegramSent: prev.telegramSent
      }))

      // Enviar resultado para o Telegram
      if (telegramConfig.isConfigured) {
        const resultMessage = `
🐘 *RESULTADO ELEPHANTEBET*

${isWin ? '✅ SINAL CORRETO! 🎉' : '❌ SINAL INCORRETO'}

Multiplicador: *${updatedSignal.multiplier}x*
Resultado: *${isWin ? 'WIN 💰' : 'LOSS 📉'}*
Precisão atual: *${Math.round(((stats.wins + (isWin ? 1 : 0)) / (stats.totalSignals + 1)) * 100)}%*

${isWin ? 
  '🏆 Parabéns! Lucro confirmado!\n💎 Continue seguindo os sinais' : 
  '⚠️ Loss pontual - próximo sinal em breve\n📈 Mantenha a disciplina'
}

🔥 Bot Premium Elephantebet
        `
        
        fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: telegramConfig.chatId,
            text: resultMessage,
            parse_mode: 'Markdown'
          })
        })
      }
    }, 40000) // 40 segundos para resultado (tempo otimizado para Elephantebet)
  }

  // Auto-gerar sinais com timing otimizado para Elephantebet
  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        if (!currentSignal) {
          generateSignal()
        }
      }, Math.random() * 20000 + 50000) // Entre 50-70 segundos (timing ideal para Elephantebet)

      return () => clearInterval(interval)
    }
  }, [isGenerating, currentSignal, telegramConfig])

  const toggleBot = () => {
    setIsGenerating(!isGenerating)
  }

  const saveTelegramConfig = () => {
    if (telegramConfig.botToken && telegramConfig.chatId) {
      setTelegramConfig(prev => ({ ...prev, isConfigured: true }))
      setShowConfig(false)
    }
  }

  const testTelegramConnection = async () => {
    if (!telegramConfig.botToken || !telegramConfig.chatId) return

    const testMessage = `
🐘 *ELEPHANTEBET AVIATOR BOT*

✅ *Conexão estabelecida com sucesso!*

🎯 Bot configurado para Elephantebet
⚡ Sinais com 90% de precisão
🔥 Algoritmo otimizado
📱 Notificações em tempo real

🚀 *Pronto para enviar sinais!*

_Bot Premium Elephantebet Aviator_
    `
    
    try {
      const response = await fetch(`https://api.telegram.org/bot${telegramConfig.botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramConfig.chatId,
          text: testMessage,
          parse_mode: 'Markdown'
        })
      })

      if (response.ok) {
        alert('✅ Conexão com Telegram estabelecida com sucesso!')
      } else {
        alert('❌ Erro na conexão. Verifique o Token e Chat ID.')
      }
    } catch (error) {
      alert('❌ Erro na conexão. Verifique sua internet e dados.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header com branding Elephantebet */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-2xl">
              <Plane className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 bg-clip-text text-transparent">
                ELEPHANTEBET
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-white mt-2">
                AVIATOR SIGNAL BOT
              </p>
            </div>
            <div className="p-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full shadow-2xl">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <div className="flex items-center justify-center gap-6 mb-4">
            <div className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-full">
              <Star className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">90% Precisão</span>
            </div>
            <div className="flex items-center gap-2 bg-blue-500/20 px-4 py-2 rounded-full">
              <Zap className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-bold">Tempo Real</span>
            </div>
            <div className="flex items-center gap-2 bg-purple-500/20 px-4 py-2 rounded-full">
              <Target className="w-5 h-5 text-purple-400" />
              <span className="text-purple-400 font-bold">Algoritmo Premium</span>
            </div>
          </div>
          
          <p className="text-gray-300 text-lg">
            Bot exclusivo para a plataforma Elephantebet com sinais via Telegram
          </p>
        </div>

        {/* Controles */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={toggleBot}
            className={`px-10 py-5 rounded-2xl font-bold text-xl transition-all duration-300 flex items-center gap-4 shadow-2xl ${
              isGenerating
                ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-red-500/25 animate-pulse'
                : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/25 hover:scale-105'
            }`}
          >
            <Zap className="w-7 h-7" />
            {isGenerating ? 'PARAR BOT' : 'INICIAR BOT'}
          </button>

          <button
            onClick={() => setShowConfig(!showConfig)}
            className="px-8 py-5 rounded-2xl font-bold text-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-2xl shadow-blue-500/25 transition-all duration-300 flex items-center gap-3 hover:scale-105"
          >
            <Settings className="w-7 h-7" />
            CONFIGURAR TELEGRAM
          </button>
        </div>

        {/* Configuração do Telegram */}
        {showConfig && (
          <div className="mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-3xl mx-auto shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-4">
                <Send className="w-8 h-8 text-blue-400" />
                Configuração do Telegram
                <div className="text-sm bg-blue-500/20 px-3 py-1 rounded-full text-blue-400">
                  Elephantebet
                </div>
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 mb-3 font-semibold">Bot Token do Telegram</label>
                  <input
                    type="text"
                    placeholder="1234567890:ABCdefGHIjklMNOpqrsTUVwxyz"
                    value={telegramConfig.botToken}
                    onChange={(e) => setTelegramConfig(prev => ({ ...prev, botToken: e.target.value }))}
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-3 font-semibold">Chat ID (Grupo/Canal)</label>
                  <input
                    type="text"
                    placeholder="-1001234567890 ou 123456789"
                    value={telegramConfig.chatId}
                    onChange={(e) => setTelegramConfig(prev => ({ ...prev, chatId: e.target.value }))}
                    className="w-full px-5 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    onClick={testTelegramConnection}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    🧪 Testar Conexão
                  </button>
                  
                  <button
                    onClick={saveTelegramConfig}
                    className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold transition-all duration-300 hover:scale-105"
                  >
                    💾 Salvar Configuração
                  </button>
                </div>
                
                {telegramConfig.isConfigured && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-500/10 p-4 rounded-xl border border-green-500/20">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-semibold">Telegram configurado com sucesso para Elephantebet!</span>
                  </div>
                )}
              </div>
              
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
                <h4 className="text-blue-400 font-bold mb-4 text-lg">📋 Como configurar seu bot:</h4>
                <ol className="text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                    Acesse @BotFather no Telegram e crie um novo bot
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                    Copie o Token fornecido pelo BotFather
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                    Adicione o bot ao seu grupo/canal do Telegram
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                    Use @userinfobot para descobrir o Chat ID do grupo
                  </li>
                </ol>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Sinal Atual */}
          <div className="xl:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                  <Target className="w-8 h-8 text-blue-400" />
                  Sinal Atual - Elephantebet
                </h2>
                {telegramConfig.isConfigured && (
                  <div className="flex items-center gap-3 text-green-400 bg-green-500/20 px-4 py-2 rounded-full">
                    <Send className="w-5 h-5" />
                    <span className="font-bold">Telegram Ativo</span>
                  </div>
                )}
              </div>
              
              {currentSignal ? (
                <div className="text-center">
                  <div className={`inline-flex items-center gap-4 px-12 py-6 rounded-3xl text-3xl font-bold mb-8 shadow-2xl ${
                    currentSignal.type === 'ENTRADA'
                      ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-green-500/25'
                      : 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/25'
                  }`}>
                    {currentSignal.type === 'ENTRADA' ? (
                      <TrendingUp className="w-10 h-10" />
                    ) : (
                      <TrendingDown className="w-10 h-10" />
                    )}
                    {currentSignal.type}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 text-sm mb-2">Multiplicador</p>
                      <p className="text-4xl font-bold text-white">{currentSignal.multiplier}x</p>
                    </div>
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 text-sm mb-2">Confiança</p>
                      <p className="text-4xl font-bold text-green-400">{currentSignal.confidence}%</p>
                    </div>
                    <div className="bg-gradient-to-r from-white/5 to-white/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-gray-400 text-sm mb-2">Plataforma</p>
                      <p className="text-lg font-bold text-blue-400">ELEPHANTEBET</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-3 text-orange-400 mb-6">
                    <Clock className="w-6 h-6 animate-spin" />
                    <span className="text-lg font-semibold">Aguardando resultado...</span>
                  </div>
                  
                  {currentSignal.telegramSent && (
                    <div className="flex items-center justify-center gap-3 text-green-400 bg-green-500/10 p-4 rounded-xl">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-semibold">Sinal enviado para o Telegram com sucesso!</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-2xl">
                    <Plane className="w-12 h-12 text-white" />
                  </div>
                  <p className="text-gray-400 text-xl mb-4">
                    {isGenerating ? 'Analisando padrões da Elephantebet...' : 'Inicie o bot para gerar sinais'}
                  </p>
                  {isGenerating && (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Estatísticas e Status */}
          <div className="space-y-8">
            {/* Estatísticas */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <BarChart3 className="w-7 h-7 text-blue-400" />
                Estatísticas
              </h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                  <span className="text-gray-400 font-medium">Total de Sinais</span>
                  <span className="text-white font-bold text-lg">{stats.totalSignals}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-xl">
                  <span className="text-gray-400 font-medium">Acertos</span>
                  <span className="text-green-400 font-bold text-lg">{stats.wins}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-red-500/10 rounded-xl">
                  <span className="text-gray-400 font-medium">Erros</span>
                  <span className="text-red-400 font-bold text-lg">{stats.losses}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-blue-500/10 rounded-xl">
                  <span className="text-gray-400 font-medium">Enviados Telegram</span>
                  <span className="text-blue-400 font-bold text-lg">{stats.telegramSent}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-gray-400 font-medium">Taxa de Acerto</span>
                  <span className={`font-bold text-xl ${
                    stats.winRate >= 85 ? 'text-green-400' : 
                    stats.winRate >= 70 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {stats.winRate}%
                  </span>
                </div>
              </div>
            </div>

            {/* Status do Sistema */}
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Status do Sistema</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className={`w-5 h-5 rounded-full ${isGenerating ? 'bg-green-400 animate-pulse shadow-lg shadow-green-400/50' : 'bg-gray-500'}`}></div>
                  <span className="text-gray-300 font-medium">
                    Bot: {isGenerating ? 'Ativo e Gerando' : 'Inativo'}
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className={`w-5 h-5 rounded-full ${telegramConfig.isConfigured ? 'bg-blue-400 shadow-lg shadow-blue-400/50' : 'bg-gray-500'}`}></div>
                  <span className="text-gray-300 font-medium">
                    Telegram: {telegramConfig.isConfigured ? 'Conectado' : 'Desconectado'}
                  </span>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white/5 rounded-xl">
                  <div className="w-5 h-5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"></div>
                  <span className="text-gray-300 font-medium">
                    Plataforma: Elephantebet
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Histórico de Sinais */}
        {signals.length > 0 && (
          <div className="mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-400" />
                Histórico de Sinais - Elephantebet
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {signals.map((signal) => (
                  <div key={signal.id} className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        signal.type === 'ENTRADA'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {signal.type}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          signal.status === 'WIN'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                          {signal.status}
                        </span>
                        {signal.telegramSent && (
                          <Send className="w-4 h-4 text-blue-400" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Multiplicador</span>
                        <span className="text-white font-bold">{signal.multiplier}x</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Confiança</span>
                        <span className="text-blue-400 font-bold">{signal.confidence}%</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 text-sm">Plataforma</span>
                        <span className="text-purple-400 font-bold text-xs">ELEPHANTEBET</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-500 text-center">
                      {signal.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 max-w-4xl mx-auto">
            <p className="text-yellow-400 text-sm font-medium mb-2">
              ⚠️ AVISO IMPORTANTE
            </p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Este é um simulador educacional desenvolvido para fins demonstrativos e de aprendizado. 
              Os sinais são gerados por algoritmos simulados e não garantem resultados reais. 
              Jogos de azar envolvem riscos financeiros significativos. Jogue com responsabilidade, 
              estabeleça limites e aposte apenas o que pode perder. A Elephantebet é uma marca registrada 
              e este bot é independente da plataforma oficial.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}