import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage"; 

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