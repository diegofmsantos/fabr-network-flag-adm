// src/utils/stats.ts
export const estatisticasGroups = [
    {
        id: 'ataque',
        title: 'Ataque',
        fields: [
            { id: "passes_completos", label: "PASSES COMPLETOS" },
            { id: "passes_tentados", label: "PASSES TENTADOS" },
            { id: "td_passado", label: "TD PASSADOS" },
            { id: "interceptacoes_sofridas", label: "INTERCEPTAÇÕES SOFRIDAS" },
            { id: "sacks_sofridos", label: "SACKS SOFRIDOS" },
            { id: "corrida", label: "JARDAS CORRIDAS" },
            { id: "tds_corridos", label: "TDS CORRIDOS" },
            { id: "recepcao", label: "RECEPÇÕES" },
            { id: "alvo", label: "ALVO" },
            { id: "td_recebido", label: "TDS RECEBIDOS" }
        ]
    },
    {
        id: 'defesa',
        title: 'Defesa',
        fields: [
            { id: "sack", label: "SACK" },
            { id: "pressao", label: "PRESSÃO" },
            { id: "flag_retirada", label: "FLAG RETIRADA" },
            { id: "flag_perdida", label: "FLAG PERDIDA" },
            { id: "passe_desviado", label: "PASSE DESVIADO" },
            { id: "interceptacao_forcada", label: "INTERCEPTAÇÃO FORÇADA" },
            { id: "td_defensivo", label: "TD DEFENSIVO" }
        ]
    }
];