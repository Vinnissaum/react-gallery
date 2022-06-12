import { Photo } from "../../types/Photo";
import { Container, Icons } from "./styles";
import { DownloadSimple } from "phosphor-react";
import { saveAs } from "file-saver";
 
interface Props {
  photo: Photo;
}

export const PhotoItem = ({ photo }: Props) => {
  
  const handleDownloadClick = () => {
    saveAs(`"${photo.url}"`, photo.name);
  }
  
  return(
    <Container>
      <Icons>
        <DownloadSimple 
          className='icon'
          size={16} 
          weight='bold'
          onClick={handleDownloadClick}
        />
      </Icons>
      <img src={photo.url} alt={photo.name} />
      <div>{photo.name}</div>
    </Container>
  );
}