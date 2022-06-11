import { Container, Content, Header, LoadingPhotosProcess } from './App.styles';
import { CircleNotch } from 'phosphor-react';
import { useState } from 'react';

function App() {
  const [allPhotosLoading, setAllPhotosLoading] = useState(false);

  return (
    <Container>
      <Content>
        <Header>Photo Gallery</Header>
        {allPhotosLoading &&
          <LoadingPhotosProcess>
            Loading photos, please wait
            <CircleNotch className='circle-loading' />
          </LoadingPhotosProcess>
        }
      </Content>
    </Container>
  );
}

export default App;
