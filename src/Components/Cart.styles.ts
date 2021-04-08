import styled from 'styled-components';
import CloseIcon from '@material-ui/icons/Close';

export const Wrapper = styled.aside`
  font-family: Arial, Helvetica, sans-serif;
  width: 100%;
  padding: 20px;

  @media (min-width: 768px) {
    width: 500px;
  }
`;

export const StyledCloseButton = styled(CloseIcon)`
  position: fixed;
  right: 20px;
  top: 20px;
  cursor: pointer;
`;
