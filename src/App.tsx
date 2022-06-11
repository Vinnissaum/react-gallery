import { Container, Content, Header, WarningProcess,
  PhotoList, UploadForm } from './App.styles';
import { CircleNotch } from 'phosphor-react';
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
    }
  }
  
  return (
    <Container>
      <Content>
        <Header>Photo Gallery</Header>
        <UploadForm method="post" onSubmit={handleFormSubmit}>
          <input type="file" name="image"/>
          <input type="submit" value="Upload" />
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
              <PhotoItem key={index} photo={item}/>
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
