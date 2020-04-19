import styled from 'styled-components';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #fafafa;
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
  text-align: center;
`;

export const Card = styled.View`
  padding: 16px 20px;
  background-color: #f1f9ff;
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

export const ConfirmationContainer = styled.View`
  height: 60px;
  width: 100%;
  background-color: #fcfc99;
  padding: 15px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const ConfirmationButton = styled.TouchableOpacity`
  width: 162px;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fcfc99;
`;

export const ConfirmationButtonText = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 14px;
`;
