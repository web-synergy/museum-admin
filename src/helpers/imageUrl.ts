import { IImageState } from '@/types/events';
import { addNewImage } from '@/api';

export const saveNewImage = async (file: File | Blob) => {
  try {
    const {
      data: { imageId },
    } = await addNewImage(file);

    const imageUrl = URL.createObjectURL(file);
    return { id: imageId, url: imageUrl } as IImageState;
  } catch (error) {
    return null;
  }
};
