import styled from 'styled-components';

export const Background = styled.SafeAreaView`
  flex: 1;
  background-color: #f1f9ff;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.View`
  margin: 0px 20px;
`;

export const Title = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 18px;
  margin-top: 15px;
`;

export const FilterContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 5px;
`;

export const FilterItem = styled.View`
  width: 50%;
  margin-top: 10px;
`;

export const FilterTitle = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  color: #3c5c77;
  height: 13px;
  line-height: 15px;
`;

export const FilterButton = styled.TouchableOpacity`
  height: 35px;
  width: 100%;
  justify-content: center;
  align-items: center;
  background-color: #f1f9ff;
  margin-top: 12px;
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
`;

export const DateInput = styled.TouchableOpacity`
  background-color: #fff;
  height: 30px;
  padding: 5px;
  padding-left: 12px;
  border: 1px solid #bce0fd;
  margin-top: 7px;
`;

export const DateInputText = styled.Text`
  font-family: 'Montserrat-Medium';
  font-size: 14px;
  color: #3c5c77;
`;

export const ListContainer = styled.View`
  margin-top: 25px;
`;

export const NewCrimeContainer = styled.View`
  height: 60px;
  width: 100%;
  background-color: #fcfc99;
  padding: 15px;
`;

export const NewCrimeButton = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  background-color: #fcfc99;
  border: 1px solid black;
`;

export const NewCrimeButtonText = styled.Text`
  font-family: 'CinzelDecorative-Bold';
  font-size: 14px;
`;
