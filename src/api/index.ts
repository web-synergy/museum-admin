import { IEventValues, IContactInfo, IEvent } from '@/types/events';
import axios from 'axios';

// const BASE_URL = import.meta.env.VITE_SERVER_URL;
// console.log(BASE_URL);

export const instance = axios.create({
  // baseURL: BASE_URL,
});

interface LoginResponse {
  roles: string[];
  token: string;
}

export const login = (username: string, password: string) => {
  return instance.post<LoginResponse>(
    '/api/admin/login',
    {},
    { auth: { username, password } }
  );
};

export const logout = () => {
  return instance.post('/api/admin/logout');
};

export const getContactInfo = () => {
  return instance.get('/api/museum_data');
};

export const updateContactInfo = (data: IContactInfo) => {
  return instance.put('/api/admin/museum_data', data);
};

interface AddImageResponse {
  imageId: string;
}

export const addNewImage = (file: File | Blob) => {
  const headers = { 'Content-Type': 'multipart/form-data' };
  const formData = new FormData();
  formData.append('file', file);
  return instance.post<AddImageResponse>('/api/admin/images', formData, {
    headers,
  });
};

export const getImage = (imageId: string) => {
  return instance.get(`/api/images?filename=${imageId}&type=ORIGINAL`, {
    responseType: 'blob',
  });
};

export const addEvent = (data: IEventValues) => {
  return instance.post('/api/admin/events', data);
};

interface GetEventsResponse {
  totalPages: number;
  totalElements: number;
  first: boolean;
  content: IEvent[];
}

export const getEvents = (page = 0, size = 5) => {
  return instance.get<GetEventsResponse>(
    `/api/events?size=${size}&page=${page}`
  );
};

export const getEventById = async (id: string) => {
  try {
    const { data } = await instance.get<IEvent>(`/api/events/${id}`);
    return data;
  } catch (e) {
    return null;
  }
};

export const editEvent = async (data: IEventValues, id: string) => {
  return instance.put(`/api/admin/events/${id}`, data);
};

export const deleteEvent = async (id: string) => {
  return instance.delete(`/api/admin/events/${id}`);
};
