// src/utils/stats.ts
export const estatisticasGrupos = [
    {
        id: 'passe',
        titulo: 'PASSE',
        campos: [
            { id: "passes_completos", label: "PASSES COMPLETOS" },
            { id: "passes_tentados", label: "PASSES TENTADOS" },
            { id: "passes_incompletos", label: "PASSES INCOMPLETOS" },
            { id: "jds_passe", label: "JARDAS DE PASSE" },
            { id: "tds_passe", label: "TDs DE PASSE" },
            { id: "passe_xp1", label: "CONVERSÕES 1PT PASSE" },
            { id: "passe_xp2", label: "CONVERSÕES 2PT PASSE" },
            { id: "int_sofridas", label: "INTERCEPTAÇÕES SOFRIDAS" },
            { id: "sacks_sofridos", label: "SACKS SOFRIDOS" },
            { id: "pressao_pct", label: "% PRESSÃO" }
        ]
    },
    {
        id: 'corrida',
        titulo: 'CORRIDA',
        campos: [
            { id: "corridas", label: "CORRIDAS" },
            { id: "jds_corridas", label: "JARDAS CORRIDAS" },
            { id: "tds_corridos", label: "TDs CORRIDOS" },
            { id: "corrida_xp1", label: "CONVERSÕES 1PT CORRIDA" },
            { id: "corrida_xp2", label: "CONVERSÕES 2PT CORRIDA" }
        ]
    },
    {
        id: 'recepcao',
        titulo: 'RECEPÇÃO',
        campos: [
            { id: "recepcoes", label: "RECEPÇÕES" },
            { id: "alvos", label: "ALVOS" },
            { id: "drops", label: "DROPS" },
            { id: "jds_recepcao", label: "JARDAS RECEPÇÃO" },
            { id: "jds_yac", label: "JARDAS APÓS RECEPÇÃO" },
            { id: "tds_recepcao", label: "TDs RECEPÇÃO" },
            { id: "recepcao_xp1", label: "CONVERSÕES 1PT RECEPÇÃO" },
            { id: "recepcao_xp2", label: "CONVERSÕES 2PT RECEPÇÃO" }
        ]
    },
    {
        id: 'defesa',
        titulo: 'DEFESA',
        campos: [
            { id: "tck", label: "TACKLES" },
            { id: "tfl", label: "TACKLES FOR LOSS" },
            { id: "pressao_pct", label: "% PRESSÃO" },
            { id: "sacks", label: "SACKS" },
            { id: "tip", label: "PASSES DESVIADOS" },
            { id: "int", label: "INTERCEPTAÇÕES" },
            { id: "tds_defesa", label: "TDs DEFENSIVOS" },
            { id: "defesa_xp2", label: "CONVERSÕES DEFESA 2PT" },
            { id: "sft", label: "SAFETY" },
            { id: "sft_1", label: "SAFETY 1PT" },
            { id: "blk", label: "BLOQUEIOS" },
            { id: "jds_defesa", label: "JARDAS DEFESA" }
        ]
    }
];