import { PaginationResponse } from '@models/api/common';
import { Note } from '@models/note';
import axios, { axiosFormDataInstance } from '@utils/apis/axios';
import { objectFormDataSerializer } from '@utils/validateHelpers';

export const getNoteList = async (page: string | null) => {
  const requestPage = page ? page.split('page=')[1] : null;
  const { data } = await axios.get<PaginationResponse<Note[]>>(
    `/notes/${!requestPage ? '' : `?page=${requestPage}`}`,
  );
  return data;
};

export const getNoteDetail = async (noteId: number) => {
  const { data } = await axios.get<Note>(`/notes/${noteId}/`);
  return data;
};

export const postNote = async (noteData: Partial<Note>) => {
  const noteFormData = objectFormDataSerializer(noteData);
  const { data } = await axiosFormDataInstance.post(`notes/`, noteFormData);
  return data;
};

export const updateNote = async (noteId: number, noteData: Partial<Note>) => {
  const noteFormData = objectFormDataSerializer(noteData);
  const { data } = await axios.put(`/notes/${noteId}/`, noteFormData);
  return data;
};

export const deleteNote = async (noteId: number) => {
  await axios.delete(`/notes/${noteId}/`);
};
