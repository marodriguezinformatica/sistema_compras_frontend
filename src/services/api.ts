import axios from 'axios';
import type { Usuario } from '../interfaces/interfaces'
import type { Compra } from '../interfaces/interfaces'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (username: string, password: string): Promise<Usuario> => {
  const response = await api.post('/auth/login', { username, password });
  return response.data;
};

export const register = async ( usuario: Omit<Usuario, 'id'>): Promise<Usuario> => {
  const response = await api.post('/auth/registro', usuario);
  return response.data;
};

export const load = async (username: string): Promise<Compra[]> => {
  const response = await api.get('/compras', { params: { username } });
  return response.data;
};

// Eliminar compra por id
export const remove = async (id: number): Promise<void> => {
  await api.delete(`/compras/${id}`);
};

export const create = async (compra: Omit<Compra, 'id'> & { usuario_id: number }): Promise<Compra> => {
  const response = await api.post('/compras', compra);
  return response.data;
};

export const update = async (compra: Compra): Promise<Compra> => {
  const response = await api.put(`/compras/${compra.id}`, compra);
  return response.data;
};

export const loadCompra = async (id: number): Promise<Compra> => {
  const response = await api.get<Compra>(`/compras/${id}`);
  return response.data;
};