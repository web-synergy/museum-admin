import { IContactInfo, IEvent, IEventValues } from '@/types/events'

import axios from 'axios'

const BASE_URL = import.meta.env.VITE_SERVER_URL

export const instance = axios.create({
  baseURL: BASE_URL,
})

interface LoginResponse {
  roles: string[]
  token: string
}

export const login = (username: string, password: string) => {
  return instance.post<LoginResponse>('/admin/login', {}, { auth: { username, password } })
}

export const logout = () => {
  return instance.post('/admin/logout')
}

export const getContactInfo = () => {
  return instance.get('/museum-data')
}

export const updateContactInfo = (data: IContactInfo) => {
  return instance.put('/admin/museum-data', data)
}

interface AddImageResponse {
  imageId: string
}

export const addNewImage = (file: File | Blob) => {
  const headers = { 'Content-Type': 'multipart/form-data' }
  const formData = new FormData()
  formData.append('file', file)
  return instance.post<AddImageResponse>('/admin/images', formData, {
    headers,
  })
}

export const getImage = (imageId: string) => {
  return instance.get(`/images?filename=${imageId}&type=ORIGINAL`, {
    responseType: 'blob',
  })
}

interface GetEventsResponse {
  totalPages: number
  totalElements: number
  first: boolean
  content: IEvent[]
}

export const getEvents = (page = 0, size = 5) => {
  return instance.get<GetEventsResponse>(`/admin/events?size=${size}&page=${page}`)
}

export const getEventById = async (slug: string) => {
  try {
    const { data } = await instance.get<IEvent>(`/events/${slug}`)
    return data
  } catch (e) {
    return null
  }
}

export const addEvent = (data: IEventValues) => {
  return instance.post<IEvent>('/admin/events', data)
}

export const editEvent = async (data: IEventValues, slug: string) => {
  return instance.put<IEvent>(`/admin/events/${slug}`, { ...data, slug })
}

export const deleteEvent = async (slug: string) => {
  return instance.delete(`/admin/events/${slug}`)
}

export const addDraft = async (data: IEventValues) => {
  return instance.post<IEvent>('/admin/events/draft', data)
}

export const editDraft = async (data: IEventValues, slug: string) => {
  return instance.put<IEvent>(`/admin/events/draft/${slug}`, { ...data, slug })
}

export const verificationNewEmail = (email: string) =>
  instance.post('/admin/update/email', { email })

export const confirmEmail = async (code: string) => {
  try {
    const { status } = await instance.put(`/admin/update/confirm-email?code=${code}`)
    return status
  } catch (e) {
    return null
  }
}

export const recoveryPass = async (email: string) => {
  try {
    const { status } = await instance.put(`/admin/update/recovery-password?email=${email}`)
    return status
  } catch {
    return null
  }
}

export const updatePass = async (pass: string) => {
  try {
    const { status } = await instance.put(`/admin/update/password?password=${pass}`)
    return status
  } catch (error) {
    return null
  }
}
