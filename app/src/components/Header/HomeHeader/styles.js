import styled from 'styled-components';

export const Container = styled.View``;

export const Text = styled.Text`
  font-family: 'CinzelDecorative-Black';
  font-size: ${(props) => props.size || '20px'};
  margin-top: ${(props) => props.mt || '0px'};
  margin-left: 4px;
`;
