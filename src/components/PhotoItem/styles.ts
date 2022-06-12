import styled from "styled-components";

export const Container = styled.div`
  background-color: #3D3F43;
  border-radius: 1rem;
  padding: 1rem;

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 1rem;
    border-radius: 1rem;
  } 

  div  {
    font-size: 1.1rem;
    text-align: center;
  }
`;

export const Icons = styled.div`
  display: flex;
  justify-content: space-between;
  top: 0;
  right: 0;

  padding-bottom: 0.5rem;

  .icon {
    cursor: pointer;
    transition: all 200ms;

    :hover {
      transform: scale(1.2);
    }
  }
`;