import styled from "styled-components";

export const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
  sans-serif;
  
  background-color: #27282F;
  color: #FFFFFF;
  min-height: 100vh;
`;

export const Content = styled.div`
  margin: auto;
  max-width: 980px;
  padding: 3rem 0;
`;

export const Header = styled.h1`
  margin: 0;
  padding: 0;

  font-size: 3rem;
  text-align: center;
  margin-bottom: 3rem;
`;

export const WarningProcess = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  margin-top: 20rem;

  font-size: 5rem;

  .circle-loading {
    margin-top: 2rem;
    
    animation-name: spin;
    animation-duration: 2000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
  }
  @keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
  } 
`;

export const PhotoList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
`;