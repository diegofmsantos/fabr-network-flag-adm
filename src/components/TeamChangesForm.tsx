import { useState, useEffect } from 'react';
import { Time } from '@/types/time';

interface TeamChangesProps {
  times: Time[];
  onAddChange: (change: TimeChange) => void;
}

export interface TimeChange {
  timeId: number;
  nome?: string;
  sigla?: string;
  instagram?: string
  instagram2?: string
  cor?: string;
  logo?: string;
  regiao?: string;      // Novo campo
  sexo?: string;        // Novo campo
  capacete?: string;
  presidente?: string;
  head_coach?: string;
  instagram_coach?: string
  coord_ofen?: string;
  coord_defen?: string;
}

export function TeamChangesForm({ times, onAddChange }: TeamChangesProps) {
  const [selectedTime, setSelectedTime] = useState<number | "">("");
  const [timeForm, setTimeForm] = useState<Partial<Time>>({});

  const handleSelectTime = (id: string) => {
    const timeId = id ? Number(id) : "";
    setSelectedTime(timeId);
    
    if (timeId) {
      const time = times.find(t => t.id === Number(timeId));
      if (time) {
        setTimeForm({
          nome: time.nome,
          sigla: time.sigla,
          cor: time.cor,
          instagram: time.instagram,
          instagram2: time.instagram2,
          logo: time.logo,
          regiao: time.regiao, 
          sexo: time.sexo,  
        });
      }
    } else {
      setTimeForm({});
    }
  };

  const handleSubmit = () => {
    if (!selectedTime) return;
    
    const timeExistente = times.find(t => t.id === Number(selectedTime));
    if (!timeExistente) return;
    
    // Verificar alterações
    const alteracoes: Partial<TimeChange> = {};
    let temAlteracoes = false;
    
    if (timeForm.nome && timeForm.nome !== timeExistente.nome) {
      alteracoes.nome = timeForm.nome;
      temAlteracoes = true;
    }
    
    if (timeForm.sigla && timeForm.sigla !== timeExistente.sigla) {
      alteracoes.sigla = timeForm.sigla;
      temAlteracoes = true;
    }
    
    if (timeForm.cor && timeForm.cor !== timeExistente.cor) {
      alteracoes.cor = timeForm.cor;
      temAlteracoes = true;
    }

    if (timeForm.instagram && timeForm.instagram !== timeExistente.instagram) {
      alteracoes.instagram = timeForm.instagram;
      temAlteracoes = true;
    }

    if (timeForm.instagram2 && timeForm.instagram2 !== timeExistente.instagram2) {
      alteracoes.instagram2 = timeForm.instagram2;
      temAlteracoes = true;
    }

    if (timeForm.logo && timeForm.logo !== timeExistente.logo) {
      alteracoes.logo = timeForm.logo;
      temAlteracoes = true;
    }

    // Novos campos
    if (timeForm.regiao && timeForm.regiao !== timeExistente.regiao) {
      alteracoes.regiao = timeForm.regiao;
      temAlteracoes = true;
    }

    if (timeForm.sexo && timeForm.sexo !== timeExistente.sexo) {
      alteracoes.sexo = timeForm.sexo;
      temAlteracoes = true;
    }

   
    
    if (temAlteracoes) {
      const novaAlteracao: TimeChange = {
        timeId: Number(selectedTime),
        ...alteracoes
      };
      
      onAddChange(novaAlteracao);
      setSelectedTime("");
      setTimeForm({});
    }
  };

  return (
    <div className="mb-8 bg-[#272731] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Times com Alterações</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Selecione um Time
          </label>
          <select
            value={selectedTime}
            onChange={(e) => handleSelectTime(e.target.value)}
            className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
          >
            <option value="">Selecione um time</option>
            {times.map((time) => (
              <option key={time.id} value={time.id}>
                {time.nome}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {selectedTime && (
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Nome
            </label>
            <input
              type="text"
              value={timeForm.nome || ""}
              onChange={(e) => setTimeForm({ ...timeForm, nome: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Sigla
            </label>
            <input
              type="text"
              value={timeForm.sigla || ""}
              onChange={(e) => setTimeForm({ ...timeForm, sigla: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>
          
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Cor
            </label>
            <input
              type="text"
              value={timeForm.cor || ""}
              onChange={(e) => setTimeForm({ ...timeForm, cor: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Instagram
            </label>
            <input
              type="text"
              value={timeForm.instagram || ""}
              onChange={(e) => setTimeForm({ ...timeForm, instagram: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              @
            </label>
            <input
              type="text"
              value={timeForm.instagram2 || ""}
              onChange={(e) => setTimeForm({ ...timeForm, instagram2: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Logo
            </label>
            <input
              type="text"
              value={timeForm.logo || ""}
              onChange={(e) => setTimeForm({ ...timeForm, logo: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            />
          </div>

          {/* Novos campos adicionados */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Região
            </label>
            <select
              value={timeForm.regiao || ""}
              onChange={(e) => setTimeForm({ ...timeForm, regiao: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            >
              <option value="">Selecione uma região</option>
              <option value="Norte">Norte</option>
              <option value="Nordeste">Nordeste</option>
              <option value="Centro-Oeste">Centro-Oeste</option>
              <option value="Sudeste">Sudeste</option>
              <option value="Sul">Sul</option>
            </select>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Sexo
            </label>
            <select
              value={timeForm.sexo || ""}
              onChange={(e) => setTimeForm({ ...timeForm, sexo: e.target.value })}
              className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            >
              <option value="">Selecione</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
              <option value="misto">Misto</option>
            </select>
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-[#63E300] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#50B800] transition-colors"
            >
              Adicionar Alteração
            </button>
          </div>
        </div>
      )}
    </div>
  );
}