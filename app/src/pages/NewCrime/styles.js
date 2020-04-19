import styled from 'styled-components';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #fafafa;
`;

export const Container = styled.View`
  margin: 0px 20px;
`;

export const Title = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 18px;
  margin-bottom: 20px;
  margin-top: 15px;
`;

export const FieldTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  color: #3c5c77;
`;

export const DateInput = styled.TouchableOpacity`
  background-color: #fff;
  height: 30px;
  padding: 5px;
  padding-left: 12px;
  border: 1px solid #bce0fd;
  margin-top: 7px;
  margin-bottom: 15px;
`;

export const DateInputText = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  color: #3c5c77;
`;

export const PickerInput = styled.View`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  background-color: #fff;
  height: 30px;
  padding: 5px;
  padding-left: 12px;
  border: 1px solid #bce0fd;
  margin-top: 7px;
  margin-bottom: 15px;
`;

export const TextInput = styled.TextInput`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  background-color: #fff;
  height: 30px;
  padding: 5px;
  padding-left: 12px;
  border: 1px solid #bce0fd;
  margin-top: 7px;
  margin-bottom: 15px;
`;

export const ButtonContainer = styled.View`
  flex-direction: column;
  align-items: flex-end;
  margin-top: 20px;
`;

export const SaveCrimeContainer = styled.View`
  height: 60px;
  width: 100%;
  background-color: #fcfc99;
  padding: 15px;
`;

export const SaveCrimeButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fcfc99;
`;

export const SaveCrimeButtonText = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 14px;
`;
