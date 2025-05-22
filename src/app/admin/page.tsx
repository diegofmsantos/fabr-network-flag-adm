// src/app/admin/page.tsx - Flag Football com Design Melhorado
"use client"

import React, { useState } from 'react';
import AdminUploadForm from '@/components/admin/AdminUploadForm';
import ProcessedGamesList from '@/components/admin/ProcessedGamesList';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('upload');
  const [temporada, setTemporada] = useState("2025")

  return (
    <div className="min-h-screen bg-[#1C1C24] pt-4 pb-16 px-4">
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
            <h1 className="text-4xl text-[#63E300] font-extrabold italic leading-[55px] tracking-[-3px]">IMPORTAÇÃO</h1>
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
      
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#272731] shadow rounded-lg overflow-hidden mb-8">
          <div className="flex border-b border-gray-700">
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'upload' ? 'bg-[#1C1C24] text-[#63E300] border-b-2 border-[#63E300]' : 'text-gray-400 hover:text-gray-300'
                }`}
              onClick={() => setActiveTab('upload')}
            >
              Upload de Planilhas
            </button>
            <button
              className={`px-6 py-3 text-sm font-medium ${activeTab === 'games' ? 'bg-[#1C1C24] text-[#63E300] border-b-2 border-[#63E300]' : 'text-gray-400 hover:text-gray-300'
                }`}
              onClick={() => setActiveTab('games')}
            >
              Jogos Processados
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'upload' ? (
              <AdminUploadForm />
            ) : (
              <ProcessedGamesList />
            )}
          </div>
        </div>

        <div className="bg-[#272731] text-gray-300 shadow rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4 text-white">Instruções de Uso</h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#63E300]">Upload de Times</h3>
              <div className="text-gray-300">
                <p>Colunas necessárias:</p>
                <div className='flex gap-3 mb-2 flex-wrap'>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">nome</span>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">sigla</span>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">cor</span>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">cidade</span>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">bandeira_estado</span>
                  <span className="font-mono bg-[#1C1C24] px-2 py-1 rounded text-xs">logo</span>
                </div>
                Novos campos: <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">regiao</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">sexo</span>.
                Opcionais: <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">instagram</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">instagram2</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">temporada</span>.
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#63E300]">Upload de Jogadores</h3>
              <div className="text-gray-300">
                Colunas necessárias: <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">nome</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">time_nome</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">numero</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">camisa</span>. Opcionais: <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">temporada</span>.
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#63E300]">Upload de Estatísticas</h3>
              <p className="text-gray-300 mb-2">
                Colunas necessárias: <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jogador_id</span> ou <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jogador_nome</span> (com <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">time_nome</span>).
              </p>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <strong className="text-[#63E300]">Passe:</strong> <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">passes_completos</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">passes_tentados</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">passes_incompletos</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jds_passe</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tds_passe</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">passe_xp1</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">passe_xp2</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">int_sofridas</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">sacks_sofridos</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">pressao_pct</span>
                </p>
                <p className="text-gray-300">
                  <strong className="text-[#63E300]">Corrida:</strong> <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">corridas</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jds_corridas</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tds_corridos</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">corrida_xp1</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">corrida_xp2</span>
                </p>
                <p className="text-gray-300">
                  <strong className="text-[#63E300]">Recepção:</strong> <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">recepcoes</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">alvos</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">drops</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jds_recepcao</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jds_yac</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tds_recepcao</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">recepcao_xp1</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">recepcao_xp2</span>
                </p>
                <p className="text-gray-300">
                  <strong className="text-[#63E300]">Defesa:</strong> <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tck</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tfl</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">pressao_pct_def</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">sacks</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tip</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">int</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">tds_defesa</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">defesa_xp2</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">sft</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">sft_1</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">blk</span>, <span className="font-mono bg-[#1C1C24] px-1 rounded text-xs">jds_defesa</span>
                </p>
              </div>
              <p className="text-red-300 mt-2">
                Sempre preencha o ID do Jogo (ex: jogo_001) e a Data do Jogo.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2 text-[#63E300]">Reprocessar Estatísticas</h3>
              <p className="text-gray-300">
                Utilize esta opção quando precisar corrigir estatísticas de um jogo já processado. As estatísticas antigas serão revertidas e as novas serão aplicadas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}