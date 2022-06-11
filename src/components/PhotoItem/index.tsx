import { Photo } from "../../types/Photo";
import { Container } from "./styles";

interface Props {
  photo: Photo;
}

export const PhotoItem = ({ photo }: Props) => {
  return(
    <Container>
      <img src={photo.url} alt={photo.name} />
      <span>{photo.name}</span>
    </Container>
  );
}