// src/utils/campos.ts
import { TimeSchema } from "@/schemas/Time";
import { JogadorSchema } from "@/schemas/Jogador";
import { z } from "zod";

type TimeFormData = z.infer<typeof TimeSchema>;
type JogadorFormData = z.infer<typeof JogadorSchema>;

export const camposTime: Array<{ id: keyof TimeFormData; label: string }> = [
   { id: "nome", label: "Nome do Time" },
   { id: "sigla", label: "Sigla" },
   { id: "cor", label: "Cor" },
   { id: "cidade", label: "Cidade" },
   { id: "bandeira_estado", label: "Bandeira Estado" },
   { id: "instagram", label: "Instagram" },
   { id: "instagram2", label: "@" },
   { id: "logo", label: "Logo" },
   { id: "temporada", label: "Temporada" }
];

// Campos do Jogador simplificados para flag football
export const camposJogador: Array<{ id: keyof JogadorFormData; label: string; type?: string; options?: { value: string; label: string }[] }> = [
    { id: "nome", label: "Nome do Jogador" },
    { id: "timeId", label: "Time", type: "select" },
    { id: "numero", label: "Número", type: "number" },
    { id: "camisa", label: "Camisa", type: "text" }
];

// Estatísticas adaptadas para flag football
export const estatisticas = [
    {
        group: "ataque",
        fields: [
            { id: "passes_completos", label: "Passes Completos", type: "number" },
            { id: "passes_tentados", label: "Passes Tentados", type: "number" },
            { id: "td_passado", label: "TD Passados", type: "number" },
            { id: "interceptacoes_sofridas", label: "Interceptações Sofridas", type: "number" },
            { id: "sacks_sofridos", label: "Sacks Sofridos", type: "number" },
            { id: "corrida", label: "Jardas Corridas", type: "number" },
            { id: "tds_corridos", label: "TDs Corridos", type: "number" },
            { id: "recepcao", label: "Recepções", type: "number" },
            { id: "alvo", label: "Alvo", type: "number" },
            { id: "td_recebido", label: "TDs Recebidos", type: "number" }
        ]
    },
    {
        group: "defesa",
        fields: [
            { id: "sack", label: "Sack", type: "number" },
            { id: "pressao", label: "Pressão", type: "number" },
            { id: "flag_retirada", label: "Flag Retirada", type: "number" },
            { id: "flag_perdida", label: "Flag Perdida", type: "number" },
            { id: "passe_desviado", label: "Passe Desviado", type: "number" },
            { id: "interceptacao_forcada", label: "Interceptação Forçada", type: "number" },
            { id: "td_defensivo", label: "TD Defensivo", type: "number" }
        ]
    }
];

// Grupos de campos para o layout de formulário de time
export const fieldGroups = [
    {
        title: "Informações Básicas",
        fields: [
            { name: "nome", label: "Nome do Time" },
            { name: "sigla", label: "Sigla" },
            { name: "cor", label: "Cor" },
            { name: "cidade", label: "Cidade" },
            { name: "bandeira_estado", label: "Bandeira do Estado" },
            { name: "temporada", label: "Temporada" }
        ]
    },
    {
        title: "Redes Sociais",
        fields: [
            { name: "instagram", label: "Instagram" },
            { name: "instagram2", label: "Instagram 2" }
        ]
    },
    {
        title: "Identidade Visual",
        fields: [
            { name: "logo", label: "Logo" }
        ]
    }
];