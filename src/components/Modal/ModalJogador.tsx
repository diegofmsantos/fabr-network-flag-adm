"use client"

import { useState } from "react";
import { atualizarJogador, deletarJogador } from "@/api/api";
import { Jogador } from "@/types/jogador";
import { useRouter } from "next/navigation";

export default function ModalJogador({
    jogador,
    closeModal,
}: {
    jogador: Jogador;
    closeModal: () => void;
}) {
    const router = useRouter();

    const [formData, setFormData] = useState({
        ...jogador,
        estatisticas: jogador.estatisticas || {
            passe: {},
            corrida: {},
            recepcao: {},
            defesa: {}
        },
    });

    const [activeTab, setActiveTab] = useState<'info' | 'estatisticas'>('info');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleStatisticChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [group, field] = name.split(".");

        setFormData((prev) => {
            const estatisticas = { ...prev.estatisticas } as any;
            if (!estatisticas[group]) {
                estatisticas[group] = {};
            }

            // Verificar se é um campo percentual
            if (field === "pressao_pct") {
                estatisticas[group][field] = value === "" ? undefined : String(value);
            } else {
                estatisticas[group][field] = value === "" ? undefined : Number(value);
            }

            return { ...prev, estatisticas };
        });
    };

    const handleSave = async () => {
        setIsSubmitting(true);
        try {
            await atualizarJogador(formData);
            closeModal();
            router.refresh();
        } catch (error) {
            console.error("Erro ao atualizar jogador:", error);
            alert("Ocorreu um erro ao atualizar o jogador. Verifique o console para mais detalhes.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async () => {
        if (confirm("Tem certeza que deseja excluir este jogador?")) {
            setIsSubmitting(true);
            try {
                await deletarJogador(jogador.id!);
                closeModal();
                router.refresh();
            } catch (error) {
                console.error("Erro ao excluir jogador:", error);
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    // Definição dos grupos de estatísticas para exibição com a nova estrutura
    const estatisticasGrupos = [
        {
            id: 'passe',
            titulo: 'Passe',
            campos: [
                { id: 'passes_completos', label: 'PASSES COMPLETOS' },
                { id: 'passes_tentados', label: 'PASSES TENTADOS' },
                { id: 'passes_incompletos', label: 'PASSES INCOMPLETOS' },
                { id: 'jds_passe', label: 'JARDAS DE PASSE' },
                { id: 'tds_passe', label: 'TDs DE PASSE' },
                { id: 'passe_xp1', label: 'CONVERSÕES 1PT PASSE' },
                { id: 'passe_xp2', label: 'CONVERSÕES 2PT PASSE' },
                { id: 'int_sofridas', label: 'INTERCEPTAÇÕES SOFRIDAS' },
                { id: 'sacks_sofridos', label: 'SACKS SOFRIDOS' },
                { id: 'pressao_pct', label: '% PRESSÃO' }
            ]
        },
        {
            id: 'corrida',
            titulo: 'Corrida',
            campos: [
                { id: 'corridas', label: 'CORRIDAS' },
                { id: 'jds_corridas', label: 'JARDAS CORRIDAS' },
                { id: 'tds_corridos', label: 'TDs CORRIDOS' },
                { id: 'corrida_xp1', label: 'CONVERSÕES 1PT CORRIDA' },
                { id: 'corrida_xp2', label: 'CONVERSÕES 2PT CORRIDA' }
            ]
        },
        {
            id: 'recepcao',
            titulo: 'Recepção',
            campos: [
                { id: 'recepcoes', label: 'RECEPÇÕES' },
                { id: 'alvos', label: 'ALVOS' },
                { id: 'drops', label: 'DROPS' },
                { id: 'jds_recepcao', label: 'JARDAS RECEPÇÃO' },
                { id: 'jds_yac', label: 'JARDAS APÓS RECEPÇÃO' },
                { id: 'tds_recepcao', label: 'TDs RECEPÇÃO' },
                { id: 'recepcao_xp1', label: 'CONVERSÕES 1PT RECEPÇÃO' },
                { id: 'recepcao_xp2', label: 'CONVERSÕES 2PT RECEPÇÃO' }
            ]
        },
        {
            id: 'defesa',
            titulo: 'Defesa',
            campos: [
                { id: 'tck', label: 'TACKLES' },
                { id: 'tfl', label: 'TACKLES FOR LOSS' },
                { id: 'pressao_pct', label: '% PRESSÃO' },
                { id: 'sacks', label: 'SACKS' },
                { id: 'tip', label: 'PASSES DESVIADOS' },
                { id: 'int', label: 'INTERCEPTAÇÕES' },
                { id: 'tds_defesa', label: 'TDs DEFENSIVOS' },
                { id: 'defesa_xp2', label: 'CONVERSÕES DEFESA 2PT' },
                { id: 'sft', label: 'SAFETY' },
                { id: 'sft_1', label: 'SAFETY 1PT' },
                { id: 'blk', label: 'BLOQUEIOS' },
                { id: 'jds_defesa', label: 'JARDAS DEFESA' }
            ]
        }
    ];

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Overlay com blur */}
            <div
                className="fixed inset-0 bg-black/70 backdrop-blur-sm"
                onClick={closeModal}
            ></div>

            {/* Modal */}
            <div className="absolute inset-12 bg-[#272731] rounded-xl shadow-lg overflow-hidden flex flex-col">
                {/* Header do modal */}
                <div className="bg-[#1C1C24] px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center">
                        <div
                            className="w-8 h-8 rounded-md mr-3 flex items-center justify-center bg-[#63E300]"
                        >
                            <span className="text-black font-bold">{formData.numero || '#'}</span>
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            {formData.nome || 'Editar Jogador'}
                        </h2>
                    </div>

                    <button
                        className="text-gray-400 hover:text-white transition-colors"
                        onClick={closeModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Tabs de navegação */}
                <div className="bg-[#1C1C24] px-6 border-t border-gray-800">
                    <div className="flex space-x-1">
                        <button
                            onClick={() => setActiveTab('info')}
                            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'info'
                                    ? 'text-[#63E300]'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Informações do Jogador
                            {activeTab === 'info' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#63E300]"></span>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab('estatisticas')}
                            className={`px-4 py-3 text-sm font-medium transition-colors relative ${activeTab === 'estatisticas'
                                    ? 'text-[#63E300]'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            Estatísticas
                            {activeTab === 'estatisticas' && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#63E300]"></span>
                            )}
                        </button>
                    </div>
                </div>

                {/* Conteúdo principal (scrollable) */}
                <div className="flex-grow overflow-y-auto p-6">
                    {/* Tab de informações do jogador */}
                    {activeTab === 'info' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="bg-[#1C1C24] rounded-lg p-5">
                                <h3 className="text-[#63E300] font-semibold mb-4 text-sm uppercase tracking-wide">
                                    Informações Básicas
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            name="nome"
                                            value={formData.nome || ""}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-[#272731] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Número
                                        </label>
                                        <input
                                            type="number"
                                            name="numero"
                                            value={formData.numero || ""}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-[#272731] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Camisa (Nome)
                                        </label>
                                        <input
                                            type="text"
                                            name="camisa"
                                            value={formData.camisa || ""}
                                            onChange={handleChange}
                                            className="w-full px-3 py-2 bg-[#272731] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-white text-sm font-medium mb-2">
                                            Time
                                        </label>
                                        <input
                                            type="text"
                                            name="time_nome"
                                            value={formData.time_nome || ""}
                                            disabled
                                            className="w-full px-3 py-2 bg-[#272731] border border-gray-700 rounded-lg text-gray-500 focus:outline-none focus:border-[#63E300]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Tab de estatísticas */}
                    {activeTab === 'estatisticas' && (
                        <div className="space-y-6 animate-fadeIn">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                {estatisticasGrupos.map((grupo) => (
                                    <div key={grupo.id} className="bg-[#1C1C24] rounded-lg p-5">
                                        <h3 className="text-[#63E300] font-semibold mb-4 text-sm uppercase tracking-wide">
                                            {grupo.titulo}
                                        </h3>
                                        <div className="space-y-3">
                                            {grupo.campos.map((campo) => (
                                                <div key={campo.id} className="flex flex-col">
                                                    <div className="flex justify-between items-center mb-1">
                                                        <label className="text-xs text-gray-400 font-medium">
                                                            {campo.label}
                                                        </label>
                                                        <div className="flex items-center bg-[#272731] px-2 py-0.5 rounded text-xs">
                                                            <input
                                                                type="text"
                                                                name={`${grupo.id}.${campo.id}`}
                                                                value={(formData.estatisticas as any)?.[grupo.id]?.[campo.id] ?? ""}
                                                                onChange={handleStatisticChange}
                                                                className="w-16 bg-transparent text-right border-none focus:outline-none text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="w-full bg-[#272731] rounded-full h-1.5">
                                                        <div
                                                            className="bg-[#63E300] h-1.5 rounded-full"
                                                            style={{
                                                                width: `${Math.min(
                                                                    100,
                                                                    (Number((formData.estatisticas as any)?.[grupo.id]?.[campo.id] || 0) /
                                                                        (campo.id.includes('jds') ? 500 : 100)) * 100
                                                                )}%`
                                                            }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer com botões de ação */}
                <div className="bg-[#1C1C24] px-6 py-4 border-t border-gray-800 flex justify-between">
                    <button
                        onClick={handleDelete}
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {isSubmitting ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Excluindo...
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Excluir Jogador
                            </>
                        )}
                    </button>

                    <div className="space-x-3 flex">
                        <button
                            onClick={closeModal}
                            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-[#63E300] text-black rounded-lg hover:bg-[#50B800] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Salvando...
                                </>
                            ) : (
                                <>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Salvar Alterações
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Estilos adicionais */}
            <style jsx global>{`
                .animate-fadeIn {
                    animation: fadeIn 0.3s ease-in-out;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}