import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL, uploadBytes, 
  getStorage, deleteObject } from "firebase/storage";
import { v4 as createId } from "uuid";

export const getAll = async () => {
  const list: Photo[] = [];

  const imagesFolder = ref(storage, 'images');
  const photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    const url = await getDownloadURL(photoList.items[i]);

    list.push({
      name: photoList.items[i].name,
      url
    });
  }

  return list;
}

export const upload = async (file: File) => {
  if (['image/jpg', 'image/png', 'image/jpeg'].includes(file.type)) {

    const randomAddress = createId();
    const newFile = ref(storage, `images/${randomAddress}`);
    
    const upload = await uploadBytes(newFile, file);
    const url = await getDownloadURL(upload.ref);

    return { name: upload.ref.name, url } as Photo;
  } else {
    return new Error('File type not supported');
  }
}

export const deleteImage = async ( photo: Photo ) => {
  const storage = getStorage();

  const fileRef = ref(storage, `images/${photo.name}`);

  await deleteObject(fileRef);
}