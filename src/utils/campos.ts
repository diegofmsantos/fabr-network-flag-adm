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
   { id: "temporada", label: "Temporada" },
   { id: "regiao", label: "Região" },  
   { id: "sexo", label: "Sexo" } 
];

// Campos do Jogador simplificados para flag football
export const camposJogador: Array<{ id: keyof JogadorFormData; label: string; type?: string; options?: { value: string; label: string }[] }> = [
    { id: "nome", label: "Nome do Jogador" },
    { id: "timeId", label: "Time", type: "select" },
    { id: "numero", label: "Número", type: "number" },
    { id: "camisa", label: "Camisa", type: "text" }
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
            { name: "temporada", label: "Temporada" },
            { name: "regiao", label: "Região" },  // Novo campo
            { name: "sexo", label: "Sexo" }       // Novo campo
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