import styled from 'styled-components';

export const Wrapper = styled.article`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  border: 1px solid lightblue;
  padding: 10px 0 0 0;

  button {
    border-radius: 0 0 20px 20px;
  }
  img {
    object-fit: cover;
    max-height: 300px;
    border-radius: 20px 20px 0 0;
  }

  div {
    font-family: Arial, Helvetica, sans-serif;
    height: 100%;
    padding: 1rem;
  }
`;
