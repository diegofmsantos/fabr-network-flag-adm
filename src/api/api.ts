// src/api/api.ts
import { Time } from '@/types/time'
import { Jogador } from '@/types/jogador'
import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// FUNÇÕES PARA TIMES

// Função para obter os times com filtro de temporada
export const getTimes = async (temporada = '2025'): Promise<Time[]> => {
  try {
    console.log(`Buscando times com URL: ${api.defaults.baseURL}/times?temporada=${temporada}`);
    const response = await api.get(`/times?temporada=${temporada}`)
    return response.data || []
  } catch (error) {
    console.error('Erro ao buscar times:', error)
    throw new Error('Falha ao buscar times')
  }
}

// Função para adicionar um time
export const addTime = async (data: Omit<Time, "id">): Promise<Time> => {
  try {
    // Garante que temporada exista no objeto
    const timeData = {
      ...data,
      temporada: data.temporada || '2025'
    }
    const response = await api.post('/time', timeData)
    return response.data
  } catch (error) {
    console.error('Erro ao adicionar time:', error)
    throw new Error('Falha ao adicionar time')
  }
}

// Função para atualizar um time
export const atualizarTime = async (data: Time): Promise<Time> => {
  try {
    const response = await api.put(`/time/${data.id}`, data)
    return response.data
  } catch (error) {
    console.error(`Erro ao atualizar o time com ID ${data.id}:`, error)
    throw new Error('Falha ao atualizar time')
  }
}

// Função para deletar um time
export const deletarTime = async (id: number): Promise<void> => {
  try {
    await api.delete(`/time/${id}`)
  } catch (error) {
    console.error(`Erro ao deletar o time com ID ${id}:`, error)
    throw new Error('Falha ao deletar time')
  }
}

// FUNÇÕES PARA JOGADORES

// Função para obter jogadores com filtro de temporada
export const getJogadores = async (temporada = '2025'): Promise<Jogador[]> => {
  try {
    console.log(`Buscando jogadores com URL: ${api.defaults.baseURL}/jogadores?temporada=${temporada}`);
    const response = await api.get(`/jogadores?temporada=${temporada}`)
    return response.data || []
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error)
    throw new Error('Falha ao buscar jogadores')
  }
}

// Função para buscar um jogador específico em uma temporada
export const getJogadorTemporada = async (jogadorId: number, temporada: string): Promise<any> => {
  try {
    const response = await api.get(`/jogador/${jogadorId}/temporada/${temporada}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar jogador ${jogadorId} na temporada ${temporada}:`, error);
    throw new Error('Falha ao buscar jogador na temporada');
  }
};

// Função para adicionar um jogador
export const addJogador = async (data: any): Promise<Jogador> => {
  try {
    // Garante que temporada exista no objeto
    const jogadorData = {
      ...data,
      temporada: data.temporada || '2025'
    }
    const response = await api.post('/jogador', jogadorData)
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar jogador:', error)
    throw new Error('Falha ao adicionar jogador')
  }
}

// Função para atualizar um jogador
export const atualizarJogador = async (data: any): Promise<Jogador> => {
  try {
    // Verificamos se há temporada no objeto, caso não, usamos a default
    const temporada = data.temporada || '2025';
    
    const response = await api.put(`/jogador/${data.id}`, {
      ...data,
      timeId: data.timeId,
      temporada,
      numero: data.numero,
      camisa: data.camisa,
      estatisticas: data.estatisticas
    });
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar o jogador com ID ${data.id}:`, error);
    throw new Error('Falha ao atualizar jogador');
  }
};

// Função para deletar um jogador
export const deletarJogador = async (id: number): Promise<void> => {
  try {
    console.log(`Tentando excluir jogador com ID: ${id}`); // Log para debug
    const response = await api.delete(`/jogador/${id}`);

    if (response.status === 200) {
      console.log(`Jogador com ID ${id} excluído com sucesso.`);
    } else {
      console.error(`Falha ao excluir jogador. Status: ${response.status}`);
      throw new Error('Falha ao deletar jogador');
    }
  } catch (error) {
    console.error(`Erro ao deletar o jogador com ID ${id}:`, error);
    throw new Error('Falha ao deletar jogador');
  }
};

// FUNÇÕES PARA COMPARAÇÃO DE TIMES

// Função para comparar times
export const compararTimes = async (time1Id: number, time2Id: number, temporada: string = '2025'): Promise<any> => {
  try {
    const response = await api.get('/comparar-times', {
      params: {
        time1Id,
        time2Id,
        temporada
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao comparar times:', error);
    throw new Error('Falha ao comparar times');
  }
};

// FUNÇÕES PARA MANIPULAÇÃO DE TEMPORADAS

// Função para iniciar nova temporada
export const iniciarTemporada = async (ano: string, alteracoes: any): Promise<any> => {
  try {
    const response = await api.post(`/iniciar-temporada/${ano}`, alteracoes);
    return response.data;
  } catch (error) {
    console.error(`Erro ao iniciar temporada ${ano}:`, error);
    throw new Error('Falha ao iniciar nova temporada');
  }
};

// FUNÇÕES PARA IMPORTAÇÃO DE DADOS

// Função para importar times a partir de uma planilha
export const importarTimes = async (arquivo: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    const response = await api.post('/importar-times', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao importar times:', error);
    throw new Error('Falha ao importar times');
  }
};

// Função para importar jogadores a partir de uma planilha
export const importarJogadores = async (arquivo: File): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    
    const response = await api.post('/importar-jogadores', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao importar jogadores:', error);
    throw new Error('Falha ao importar jogadores');
  }
};

// Função para importar estatísticas a partir de uma planilha de jogo
export const atualizarEstatisticas = async (arquivo: File, id_jogo: string, data_jogo: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('id_jogo', id_jogo);
    formData.append('data_jogo', data_jogo);
    
    const response = await api.post('/atualizar-estatisticas', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar estatísticas:', error);
    throw new Error('Falha ao atualizar estatísticas');
  }
};

// Função para reprocessar estatísticas de um jogo
export const reprocessarJogo = async (arquivo: File, id_jogo: string, data_jogo: string, force: boolean = false): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append('arquivo', arquivo);
    formData.append('id_jogo', id_jogo);
    formData.append('data_jogo', data_jogo);
    formData.append('force', String(force));
    
    const response = await api.post('/reprocessar-jogo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao reprocessar jogo:', error);
    throw new Error('Falha ao reprocessar jogo');
  }
};

// Função para obter jogos processados
export const getJogosProcessados = async (): Promise<any> => {
  try {
    const response = await api.get('/jogos-processados');
    return response.data;
  } catch (error) {
    console.error('Erro ao obter jogos processados:', error);
    throw new Error('Falha ao obter jogos processados');
  }
};