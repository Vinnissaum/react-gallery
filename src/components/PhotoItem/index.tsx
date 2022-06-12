import { Photo } from "../../types/Photo";
import { Container, Icons } from "./styles";
import { DownloadSimple, TrashSimple } from "phosphor-react";
import { saveAs } from "file-saver";
 
interface Props {
  photo: Photo;
  onDeleteClick: () => void;
}

export const PhotoItem = ({ photo, onDeleteClick }: Props) => {
  
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
        <TrashSimple 
          className='icon'
          size={16}
          weight='bold'
          onClick={onDeleteClick}
        />
      </Icons>
      <img src={photo.url} alt={photo.name} />
      <div>{photo.name}</div>
    </Container>
  );
}