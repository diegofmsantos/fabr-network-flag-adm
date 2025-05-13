"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { getTimes, getJogadores } from '@/api/api'
import { Time } from '@/types/time'
import Image from 'next/image'

// Interfaces para relatórios
interface Relatorio {
    id: string
    titulo: string
    descricao: string
    executar: (times: Time[], jogadores: any[]) => any
}

export default function DashboardPage() {
    const [times, setTimes] = useState<Time[]>([])
    const [jogadores, setJogadores] = useState<any[]>([])
    const [temporada, setTemporada] = useState("2025")
    const [loading, setLoading] = useState(true)
    const [filtroAtivo, setFiltroAtivo] = useState<string | null>(null)
    const [resultados, setResultados] = useState<any>(null)

    // Buscar dados ao carregar a página
    useEffect(() => {
        async function carregarDados() {
            setLoading(true)
            try {
                const timesData = await getTimes(temporada)
                setTimes(timesData)
                const jogadoresData = await getJogadores(temporada)
                setJogadores(jogadoresData)
            } catch (error) {
                console.error("Erro ao carregar dados:", error)
            } finally {
                setLoading(false)
            }
        }
        carregarDados()
    }, [temporada])

    // Lista de relatórios adaptados para flag football
    const relatorios: Relatorio[] = [
        {
            id: "jogadores-time",
            titulo: "Jogadores por Time",
            descricao: "Exibe a quantidade de jogadores por time",
            executar: (times, jogadores) => {
                const jogadoresPorTime: { [key: string]: number } = {}
                times.forEach(time => {
                    jogadoresPorTime[time.nome || ''] = 0;
                });
                
                jogadores.forEach(jogador => {
                    if (jogador.timeId) {
                        const time = times.find(t => t.id === jogador.timeId);
                        if (time && time.nome) {
                            jogadoresPorTime[time.nome] = (jogadoresPorTime[time.nome] || 0) + 1;
                        }
                    }
                });
                
                return {
                    tipo: 'tabela',
                    cabecalho: ['Time', 'Quantidade de Jogadores'],
                    dados: Object.entries(jogadoresPorTime)
                        .sort((a, b) => b[1] - a[1])
                        .map(([time, quantidade]) => [time, quantidade]),
                    resumo: `Total de ${jogadores.length} jogadores distribuídos em ${times.length} times.`
                }
            }
        },
        {
            id: "top-passadores",
            titulo: "Top Passadores",
            descricao: "Lista os jogadores com mais touchdowns passados",
            executar: (times, jogadores) => {
                // Filtrar jogadores com estatísticas de passes
                const passadores = jogadores
                    .filter(j => 
                        j.estatisticas?.ataque?.td_passado || 
                        j.estatisticas?.ataque?.passes_completos || 
                        j.estatisticas?.ataque?.passes_tentados
                    )
                    .map(j => {
                        const time = times.find(t => t.id === j.timeId);
                        return {
                            jogador: j.nome,
                            time: time?.sigla || '-',
                            timeNome: time?.nome || '-',
                            td_passado: j.estatisticas?.ataque?.td_passado || 0,
                            passes_completos: j.estatisticas?.ataque?.passes_completos || 0,
                            passes_tentados: j.estatisticas?.ataque?.passes_tentados || 0,
                            percentual: j.estatisticas?.ataque?.passes_tentados ? 
                                ((j.estatisticas?.ataque?.passes_completos / j.estatisticas?.ataque?.passes_tentados) * 100).toFixed(1) : '0',
                        }
                    })
                    .sort((a, b) => b.td_passado - a.td_passado || b.passes_completos - a.passes_completos);

                return {
                    tipo: 'tabela',
                    cabecalho: ['Jogador', 'Time', 'TD Passados', 'Passes Comp/Tent', '%'],
                    dados: passadores.slice(0, 10).map(p => [
                        p.jogador, 
                        p.time, 
                        p.td_passado, 
                        `${p.passes_completos}/${p.passes_tentados}`,
                        `${p.percentual}%`
                    ]),
                    resumo: `Top ${Math.min(10, passadores.length)} passadores da temporada ${temporada}`
                }
            }
        },
        {
            id: "top-recebedores",
            titulo: "Top Recebedores",
            descricao: "Lista os jogadores com mais touchdowns recebidos",
            executar: (times, jogadores) => {
                // Filtrar jogadores com estatísticas de recepção
                const recebedores = jogadores
                    .filter(j => 
                        j.estatisticas?.ataque?.td_recebido || 
                        j.estatisticas?.ataque?.recepcao
                    )
                    .map(j => {
                        const time = times.find(t => t.id === j.timeId);
                        return {
                            jogador: j.nome,
                            time: time?.sigla || '-',
                            timeNome: time?.nome || '-',
                            td_recebido: j.estatisticas?.ataque?.td_recebido || 0,
                            recepcao: j.estatisticas?.ataque?.recepcao || 0,
                            alvo: j.estatisticas?.ataque?.alvo || 0,
                            percentual: j.estatisticas?.ataque?.alvo ? 
                                ((j.estatisticas?.ataque?.recepcao / j.estatisticas?.ataque?.alvo) * 100).toFixed(1) : '0',
                        }
                    })
                    .sort((a, b) => b.td_recebido - a.td_recebido || b.recepcao - a.recepcao);

                return {
                    tipo: 'tabela',
                    cabecalho: ['Jogador', 'Time', 'TD Recebidos', 'Recepções', 'Alvos', '%'],
                    dados: recebedores.slice(0, 10).map(r => [
                        r.jogador, 
                        r.time, 
                        r.td_recebido, 
                        r.recepcao,
                        r.alvo,
                        `${r.percentual}%`
                    ]),
                    resumo: `Top ${Math.min(10, recebedores.length)} recebedores da temporada ${temporada}`
                }
            }
        },
        {
            id: "top-defesas",
            titulo: "Top Defensores",
            descricao: "Lista os jogadores com mais flags retiradas",
            executar: (times, jogadores) => {
                // Filtrar jogadores com estatísticas defensivas
                const defensores = jogadores
                    .filter(j => 
                        j.estatisticas?.defesa?.flag_retirada || 
                        j.estatisticas?.defesa?.interceptacao_forcada ||
                        j.estatisticas?.defesa?.sack
                    )
                    .map(j => {
                        const time = times.find(t => t.id === j.timeId);
                        return {
                            jogador: j.nome,
                            time: time?.sigla || '-',
                            timeNome: time?.nome || '-',
                            flag_retirada: j.estatisticas?.defesa?.flag_retirada || 0,
                            sack: j.estatisticas?.defesa?.sack || 0,
                            interceptacao: j.estatisticas?.defesa?.interceptacao_forcada || 0,
                            passe_desviado: j.estatisticas?.defesa?.passe_desviado || 0,
                            td_defensivo: j.estatisticas?.defesa?.td_defensivo || 0
                        }
                    })
                    .sort((a, b) => b.flag_retirada - a.flag_retirada);

                return {
                    tipo: 'tabela',
                    cabecalho: ['Jogador', 'Time', 'Flags Ret.', 'Sacks', 'INT', 'Passes Desv.', 'TD Def.'],
                    dados: defensores.slice(0, 10).map(d => [
                        d.jogador, 
                        d.time, 
                        d.flag_retirada, 
                        d.sack,
                        d.interceptacao,
                        d.passe_desviado,
                        d.td_defensivo
                    ]),
                    resumo: `Top ${Math.min(10, defensores.length)} defensores da temporada ${temporada}`
                }
            }
        },
        {
            id: "td-por-time",
            titulo: "Touchdowns por Time",
            descricao: "Mostra o total de touchdowns por time (passes, corridas e recepções)",
            executar: (times, jogadores) => {
                const touchdownsPorTime: { [key: string]: { [key: string]: number } } = {};
                
                // Inicializar todos os times
                times.forEach(time => {
                    if (time.nome) {
                        touchdownsPorTime[time.nome] = {
                            passados: 0,
                            corridos: 0,
                            recebidos: 0,
                            defensivos: 0,
                            total: 0
                        };
                    }
                });
                
                // Calcular TDs por time
                jogadores.forEach(jogador => {
                    if (jogador.timeId) {
                        const time = times.find(t => t.id === jogador.timeId);
                        if (time && time.nome) {
                            // TDs passados
                            const tdPassados = jogador.estatisticas?.ataque?.td_passado || 0;
                            touchdownsPorTime[time.nome].passados += tdPassados;
                            
                            // TDs corridos
                            const tdCorridos = jogador.estatisticas?.ataque?.tds_corridos || 0;
                            touchdownsPorTime[time.nome].corridos += tdCorridos;
                            
                            // TDs recebidos
                            const tdRecebidos = jogador.estatisticas?.ataque?.td_recebido || 0;
                            touchdownsPorTime[time.nome].recebidos += tdRecebidos;
                            
                            // TDs defensivos
                            const tdDefensivos = jogador.estatisticas?.defesa?.td_defensivo || 0;
                            touchdownsPorTime[time.nome].defensivos += tdDefensivos;
                            
                            // Total
                            touchdownsPorTime[time.nome].total += tdPassados + tdCorridos + tdRecebidos + tdDefensivos;
                        }
                    }
                });
                
                return {
                    tipo: 'tabela',
                    cabecalho: ['Time', 'TD Passados', 'TD Corridos', 'TD Recebidos', 'TD Defensivos', 'Total TDs'],
                    dados: Object.entries(touchdownsPorTime)
                        .sort((a, b) => b[1].total - a[1].total)
                        .map(([time, tds]) => [
                            time,
                            tds.passados,
                            tds.corridos,
                            tds.recebidos,
                            tds.defensivos,
                            tds.total
                        ]),
                    resumo: `Touchdowns por time na temporada ${temporada}`
                }
            }
        }
    ]

    // Executar relatório selecionado
    const executarRelatorio = (id: string) => {
        const relatorio = relatorios.find(r => r.id === id)
        if (relatorio) {
            setFiltroAtivo(id)
            setResultados(relatorio.executar(times, jogadores))
        }
    }

    // Renderização de diferentes tipos de resultados
    const renderizarResultados = () => {
        if (!resultados) return null

        switch (resultados.tipo) {
            case 'tabela':
                return (
                    <div className="bg-[#272731] p-4 rounded-lg">
                        <table className="min-w-full">
                            <thead>
                                <tr>
                                    {resultados.cabecalho.map((header: string, index: number) => (
                                        <th key={index} className="px-4 py-2 text-left text-white font-medium bg-[#1C1C24] rounded-t-lg">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.dados.map((row: any[], index: number) => (
                                    <tr key={index} className={index % 2 === 0 ? "bg-[#1C1C24]" : "bg-[#26262e]"}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="px-4 py-2 text-gray-300">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {resultados.resumo && (
                            <div className="mt-4 p-3 text-white bg-[#1C1C24] rounded-lg">
                                {resultados.resumo}
                            </div>
                        )}
                    </div>
                )

            case 'tabela-agrupada':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {resultados.dados.map((grupo: any, index: number) => (
                            <div key={index} className="bg-[#272731] p-4 rounded-lg">
                                <h3 className="text-xl font-bold text-white mb-4">{grupo.nome}</h3>
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 text-left text-white font-medium bg-[#1C1C24]">Posição</th>
                                            <th className="px-4 py-2 text-left text-white font-medium bg-[#1C1C24]">Quantidade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {grupo.itens.map((item: any, itemIndex: number) => (
                                            <tr key={itemIndex} className={itemIndex % 2 === 0 ? "bg-[#1C1C24]" : "bg-[#26262e]"}>
                                                <td className="px-4 py-2 text-gray-300">{item.nome}</td>
                                                <td className="px-4 py-2 text-gray-300">{item.valor}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )

            case 'multi-tabela':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {resultados.tabelas.map((tabela: any, index: number) => (
                            <div key={index} className="bg-[#272731] p-4 rounded-lg">
                                <h3 className="text-xl font-bold text-white mb-4">{tabela.titulo}</h3>
                                <table className="min-w-full">
                                    <thead>
                                        <tr>
                                            {tabela.cabecalho.map((header: string, headerIndex: number) => (
                                                <th key={headerIndex} className="px-4 py-2 text-left text-white font-medium bg-[#1C1C24]">
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tabela.dados.map((row: any[], rowIndex: number) => (
                                            <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-[#1C1C24]" : "bg-[#26262e]"}>
                                                {row.map((cell, cellIndex) => (
                                                    <td key={cellIndex} className="px-4 py-2 text-gray-300">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ))}
                    </div>
                )

            default:
                return (
                    <div className="bg-[#272731] p-4 rounded-lg">
                        <pre className="text-white whitespace-pre-wrap">{JSON.stringify(resultados, null, 2)}</pre>
                    </div>
                )
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#1C1C24] p-6 flex justify-center items-center">
                <div className="text-white text-xl">Carregando dados...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#1C1C24] p-6">
            <header className="sticky top-0 z-10 bg-gradient-to-r from-[#191920] to-[#272731] shadow-xl mb-4">
                <div className="w-full px-2 py-4 flex justify-between items-center">
                    <div className='flex items-center'>
                        <Link href="/" className="text-white font-bold text-xl flex items-center">
                            <Image
                                src="/logo-fabr-color.png"
                                alt="Logo"
                                width={200}
                                height={100}
                            />
                        </Link>
                        <h1 className="text-4xl text-[#63E300] font-extrabold italic leading-[55px] tracking-[-3px]">DASHBOARD</h1>
                    </div>
                    <div className='flex'>
                        <div className="flex items-center bg-[#272731] px-3 py-2 rounded-lg">
                            <span className="text-white mr-2">Temporada:</span>
                            <select
                                value={temporada}
                                onChange={(e) => setTemporada(e.target.value)}
                                className="bg-[#1C1C24] text-white px-2 py-1 rounded border border-gray-700"
                            >
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                            </select>
                        </div>
                        <div className="flex ml-auto gap-4 mr-4">
                            <Link
                                href={`/`}
                                className="px-4 py-2 bg-[#63E300] text-black rounded-lg hover:bg-[#50B800] transition-colors flex items-center font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </header>


            <div className="mb-6 bg-[#272731] p-4 rounded-lg text-gray-300">
                <p>
                    Utilize esta página para gerar relatórios e insights sobre os times e jogadores da temporada {temporada}.
                    Selecione um dos relatórios pré-definidos abaixo.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Seção de estatísticas rápidas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-[#272731] p-4 rounded-lg flex flex-col">
                        <h3 className="text-gray-400 mb-2">Total de Times</h3>
                        <p className="text-3xl font-bold text-white">{times.length}</p>
                    </div>
                    <div className="bg-[#272731] p-4 rounded-lg flex flex-col">
                        <h3 className="text-gray-400 mb-2">Total de Jogadores</h3>
                        <p className="text-3xl font-bold text-white">{jogadores.length}</p>
                    </div>
                    <div className="bg-[#272731] p-4 rounded-lg flex flex-col">
                        <h3 className="text-gray-400 mb-2">Média de Jogadores por Time</h3>
                        <p className="text-3xl font-bold text-white">
                            {times.length > 0 ? Math.round(jogadores.length / times.length) : 0}
                        </p>
                    </div>
                </div>

                {/* Relatórios pré-definidos */}
                <div className="bg-[#272731] p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-white mb-4">Relatórios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {relatorios.map((relatorio) => (
                            <div
                                key={relatorio.id}
                                onClick={() => executarRelatorio(relatorio.id)}
                                className={`p-4 rounded-lg cursor-pointer transition-all border ${filtroAtivo === relatorio.id
                                    ? 'bg-[#63E300] text-black border-[#63E300]'
                                    : 'bg-[#1C1C24] text-white border-gray-700 hover:border-[#63E300]'
                                    }`}
                            >
                                <h4 className={`font-bold ${filtroAtivo === relatorio.id ? 'text-black' : 'text-white'}`}>
                                    {relatorio.titulo}
                                </h4>
                                <p className={`text-sm mt-1 ${filtroAtivo === relatorio.id ? 'text-black' : 'text-gray-400'}`}>
                                    {relatorio.descricao}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Resultados */}
                {filtroAtivo && (
                    <div className="mt-6">
                        <h3 className="text-xl font-bold text-white mb-4">Resultados</h3>
                        {renderizarResultados()}
                    </div>
                )}
            </div>
        </div>
    )
}
                                                    