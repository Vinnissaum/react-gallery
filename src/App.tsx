import { Container, Content, Header, WarningProcess,
  PhotoList, UploadForm } from './App.styles';
import { CircleNotch, UploadSimple } from 'phosphor-react';
import { FormEvent, useEffect, useState } from 'react';
import { Photo } from "./types/Photo";
import * as Photos from "./services/photos";
import { PhotoItem } from './components/PhotoItem';

function App() {
  const [allPhotosLoading, setAllPhotosLoading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setAllPhotosLoading(true);
      setPhotos(await Photos.getAll());

      setAllPhotosLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image') as File;

    if (file && file.size > 0) {
      setIsUploadingPhoto(true);
      const result = await Photos.upload(file);
      setIsUploadingPhoto(false);

      if (result instanceof Error) {
        alert (result.message);
      } else {
        const newPhotoList = [...photos];
        newPhotoList.push(result);

        setPhotos(newPhotoList);
      }
    }
  }

  const handleDeleteClick = async (fileToDelete: Photo) => {
    // Delete photo from firebase storage
    await Photos.deleteImage(fileToDelete);
    
    // Update photos State
    const newList = [...photos];
    for (let i in newList) {
      if (newList[i].name === fileToDelete.name) {
        newList.splice(parseInt(i), 1);
      } else {
        return;
      }
      setPhotos(newList);
    } 
  }

  return (
    <Container>
      <Content>
        <Header>Photo Gallery</Header>
        <UploadForm method="post" onSubmit={handleFormSubmit}>
          <input type="file" name="image"/>
          <button type="submit">
            <UploadSimple size={16} weight='bold'/>
            Upload
          </button>
          {isUploadingPhoto &&
          <span>Uploading...</span>
          }
        </UploadForm>
        {allPhotosLoading &&
          <WarningProcess>
            Loading photos, please wait
            <CircleNotch className='circle-loading' />
          </WarningProcess>
        }
        {(!allPhotosLoading && photos.length > 0 ) &&
          <PhotoList>
            {photos.map((item, index) =>(
              <PhotoItem 
                key={index} 
                photo={item}
                onDeleteClick={() => handleDeleteClick(item)} 
              />
            ))}
          </PhotoList>
        }
        {!allPhotosLoading && photos.length === 0 &&
          <WarningProcess>There aren't photos yet!</WarningProcess>}   
      </Content>
    </Container>
  );
}

export default App;
