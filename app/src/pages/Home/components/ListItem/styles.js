import styled from 'styled-components';

export const Card = styled.TouchableOpacity`
  flex: 1;
  background-color: #f1f9ff;
  min-height: 50px;
  border-radius: 3px;
  margin-bottom: 10px;
`;

export const Container = styled.View`
  flex: 1;
  padding: 16px 16px;
  justify-content: center;
`;

export const Text = styled.Text`
  font-family: 'Montserrat-Medium';
  color: #3c5c77;
  font-size: ${(props) => props.size || '14px'};
  margin-bottom: ${(props) => props.mb || '0'};
  margin-top: ${(props) => props.mt || '0'};
`;

export const LupaButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  position: absolute;
  right: -22px;
  bottom: -20px;
`;
