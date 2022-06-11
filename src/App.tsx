import { Container, Content, Header, WarningProcess,
  PhotoList, UploadForm } from './App.styles';
import { CircleNotch } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { Photo } from "./types/Photo";
import * as Photos from "./services/photos";
import { PhotoItem } from './components/PhotoItem';

function App() {
  const [allPhotosLoading, setAllPhotosLoading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);

  useEffect(() => {
    const getPhotos = async () => {
      setAllPhotosLoading(true);
      setPhotos(await Photos.getAll());

      setAllPhotosLoading(false);
    }
    getPhotos();
  }, []);

  const handleFormSubmit = () => {
    
  }
  
  return (
    <Container>
      <Content>
        <Header>Photo Gallery</Header>
        <UploadForm method="post" onSubmit={handleFormSubmit}>

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
