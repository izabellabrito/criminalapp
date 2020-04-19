import styled from 'styled-components';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #f1f9ff;
`;

export const Container = styled.View`
  margin: 0px 20px;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const LoadingText = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 18px;
  margin-bottom: 20px;
`;

export const Title = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 15px;
`;

export const Card = styled.View`
  padding: 16px 20px;
`;

export const Text = styled.Text`
  font-family: 'Montserrat-Medium';
  color: #3c5c77;
  font-size: 14px;
`;

export const Description = styled.Text`
  font-family: 'Montserrat-Medium';
  color: #3c5c77;
  font-size: 10px;
  margin-top: 2px;
  margin-bottom: ${(props) => props.mb || '0px'};
`;

export const Icon = styled.Image`
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 50px;
  margin-left: 20px;
`;

export const ImageContainer = styled.View`
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  position: absolute;
  right: -22px;
  top: 15px;
`;
