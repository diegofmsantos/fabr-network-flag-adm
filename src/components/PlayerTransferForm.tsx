import { useState, useEffect } from 'react';
import { Time } from '@/types/time';
import { Jogador } from '@/types/jogador';

interface PlayerTransferFormProps {
  jogadores: Jogador[];
  times: Time[];
  timeChanges?: TimeChange[]; // Prop opcional
  onAddTransfer: (transfer: Transferencia) => void;
}

export interface TimeChange {
  timeId: number;
  nome?: string;
  sigla?: string;
  cor?: string;
  instagram?: string;
  instagram2?: string;
  logo?: string;
  regiao?: string; // Novo campo
  sexo?: string;   // Novo campo
}

export interface Transferencia {
  jogadorId: number;
  jogadorNome?: string;
  timeOrigemId?: number;
  timeOrigemNome?: string;
  novoTimeId: number;
  novoTimeNome?: string;
  novoNumero?: number;
  novaCamisa?: string;
}

export function PlayerTransferForm({ 
  jogadores, 
  times, 
  timeChanges = [], // Valor padrão vazio
  onAddTransfer 
}: PlayerTransferFormProps) {
  const [selectedJogador, setSelectedJogador] = useState<Jogador | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedNovoTime, setSelectedNovoTime] = useState<string>('');
  const [novoNumero, setNovoNumero] = useState<string>('');
  const [novaCamisa, setNovaCamisa] = useState<string>('');
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  // Filtrar jogadores com base no termo de busca
  const filteredJogadores = searchTerm
    ? jogadores.filter(jogador =>
      jogador.nome?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : [];

  const handleSelectJogador = (jogador: Jogador) => {
    setSelectedJogador(jogador);
    setSearchTerm(jogador.nome || '');
    setShowDropdown(false);
  };

  const handleSubmit = () => {
    if (!selectedJogador || !selectedNovoTime) return;

    const novoTime = times.find(t => t.id === Number(selectedNovoTime));
    if (!novoTime || selectedJogador.timeId === Number(selectedNovoTime)) return;

    // Identifica o time de origem por ID e nome
    const timeOrigem = times.find(t => t.id === selectedJogador.timeId);
    const timeOrigemNome = timeOrigem?.nome || selectedJogador.time_nome || ''; // Usa o time_nome como fallback
    
    // Verificar se o time de destino terá um novo nome
    const timeDestinoDados = timeChanges.find(tc => tc.timeId === Number(selectedNovoTime));
    const novoTimeNome = timeDestinoDados?.nome || novoTime.nome;

    const transferencia: Transferencia = {
      jogadorId: selectedJogador.id || 0,
      jogadorNome: selectedJogador.nome,
      timeOrigemId: selectedJogador.timeId,
      timeOrigemNome: timeOrigemNome,
      novoTimeId: Number(selectedNovoTime),
      novoTimeNome: novoTimeNome, // Usar nome novo se existir
      novoNumero: novoNumero ? Number(novoNumero) : undefined,
      novaCamisa: novaCamisa
    };

    onAddTransfer(transferencia);

    // Reset
    setSelectedJogador(null);
    setSearchTerm('');
    setSelectedNovoTime('');
    setNovoNumero('');
    setNovaCamisa('')
  };

  // Fechar o dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = () => {
      setShowDropdown(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className="my-8 bg-[#272731] p-6 rounded-lg">
      <h2 className="text-2xl font-bold text-white mb-4">Transferências de Jogadores</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Input de busca ao invés de select para jogadores */}
        <div className="relative">
          <label className="block text-white text-sm font-medium mb-2">
            Buscar Jogador
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setShowDropdown(true);
              if (!e.target.value) {
                setSelectedJogador(null);
              }
            }}
            onFocus={(e) => {
              e.stopPropagation();
              setShowDropdown(true);
            }}
            className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            placeholder="Digite o nome do jogador..."
          />

          {/* Lista de jogadores filtrados */}
          {showDropdown && searchTerm && (
            <div
              className="absolute z-10 mt-1 w-full bg-[#1C1C24] border border-gray-700 rounded-lg max-h-60 overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {filteredJogadores.length === 0 ? (
                <div className="px-3 py-2 text-gray-400">Nenhum jogador encontrado</div>
              ) : (
                filteredJogadores.map(jogador => {
                  // Usa time_nome quando disponível, ou busca pelo ID
                  const timeNome = jogador.time_nome || (times.find(t => t.id === jogador.timeId)?.nome);
                  const timeSigla = times.find(t => t.id === jogador.timeId)?.sigla;
                  
                  return (
                    <div
                      key={jogador.id}
                      className="px-3 py-2 hover:bg-[#272731] cursor-pointer text-white"
                      onClick={() => handleSelectJogador(jogador)}
                    >
                      {jogador.nome} - {timeSigla || timeNome}
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        {/* Seleção de novo time com indicação de mudanças de nome */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Novo Time
          </label>
          <select
            value={selectedNovoTime}
            onChange={(e) => setSelectedNovoTime(e.target.value)}
            className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            disabled={!selectedJogador}
          >
            <option value="">Selecione...</option>
            {times
              .filter(time => !selectedJogador || time.id !== selectedJogador.timeId)
              .map((time) => {
                // Verificar se o time tem alteração de nome
                const change = timeChanges.find(tc => tc.timeId === time.id && tc.nome);
                const displayName = change 
                  ? `${time.nome} → ${change.nome} (${change.sigla || time.sigla})`
                  : `${time.nome} (${time.sigla})`;
                  
                return (
                  <option key={time.id} value={time.id}>
                    {displayName}
                  </option>
                );
              })}
          </select>
        </div>

        {/* Novo Número */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Novo Número (opcional)
          </label>
          <input
            type="number"
            value={novoNumero}
            onChange={(e) => setNovoNumero(e.target.value)}
            className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            disabled={!selectedJogador || !selectedNovoTime}
            placeholder="Número na camisa"
          />
        </div>

        {/* Nova Camisa */}
        <div>
          <label className="block text-white text-sm font-medium mb-2">
            Nova Camisa (opcional)
          </label>
          <input
            type="text"
            value={novaCamisa}
            onChange={(e) => setNovaCamisa(e.target.value)}
            className="w-full px-3 py-2 bg-[#1C1C24] border border-gray-700 rounded-lg text-white focus:outline-none focus:border-[#63E300]"
            disabled={!selectedJogador || !selectedNovoTime}
            placeholder="Nome na camisa"
          />
        </div>
      </div>

      {/* Informações do jogador selecionado */}
      {selectedJogador && (
        <div className="bg-[#1C1C24] p-4 rounded-lg mb-4">
          <h3 className="text-white font-medium mb-2">Jogador Selecionado</h3>
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-300">
            <div>Nome: {selectedJogador.nome}</div>
            <div>
              Time Atual: {selectedJogador.time_nome || times.find(t => t.id === selectedJogador.timeId)?.nome}
            </div>
            <div>
              Número: {selectedJogador.numero}
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!selectedJogador || !selectedNovoTime}
          className="bg-[#63E300] text-black px-4 py-2 rounded-lg font-medium hover:bg-[#50B800] transition-colors disabled:bg-gray-600 disabled:text-gray-400"
        >
          Adicionar Transferência
        </button>
      </div>
    </div>
  );
}