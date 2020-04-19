import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import moment from 'moment';

import {
  Background,
  Container,
  Title,
  FieldTitle,
  DateInput,
  DateInputText,
  TextInput,
  SaveCrimeContainer,
  SaveCrimeButton,
  SaveCrimeButtonText,
} from './styles';

import CriminalFields from './components/CriminalFields';
import WeaponFields from './components/WeaponFields';
import VictimFields from './components/VictimFields';

export default function NewCrime() {
  const navigation = useNavigation();
  const [criminals, setCriminals] = useState([]);
  const [weapons, setWeapons] = useState([]);
  const [victims, setVictimis] = useState([]);
  const [country, setCountry] = useState('');

  const [date, setDate] = useState(Date.now());
  const [formatedDate, setFormatedDate] = useState(moment().format('L'));
  const [show, setShow] = useState(false);

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    setFormatedDate(moment(currentDate).format('L'));
  }

  function criminalsChanged(data) {
    setCriminals(data);
  }

  function weaponsChanged(data) {
    setWeapons(data);
  }

  function victimsChanged(data) {
    setVictimis(data);
  }

  function validate() {
    if (country !== '') {
      navigation.navigate('Confirmation', {
        criminals,
        weapons,
        victims,
        date: moment(date),
        country,
      });
    } else {
      alert('Fill in all fields!');
    }
  }

  return (
    <Background>
      <ScrollView>
        <Container>
          <Title>crimes</Title>
          <FieldTitle>Date</FieldTitle>

          <DateInput onPress={() => setShow(true)}>
            <DateInputText>{formatedDate}</DateInputText>
          </DateInput>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              timeZoneOffsetInMinutes={0}
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <FieldTitle>Country</FieldTitle>
          <TextInput
            placeholder="Country"
            onChangeText={(value) => setCountry(value)}
          />

          <CriminalFields dataChanged={criminalsChanged} />
          <WeaponFields dataChanged={weaponsChanged} />
          <VictimFields dataChanged={victimsChanged} />
        </Container>
      </ScrollView>

      <SaveCrimeContainer>
        <SaveCrimeButton style={styles.shadow} onPress={validate}>
          <SaveCrimeButtonText>
            <FontAwesomeIcon
              style={styles.buttonIcon}
              icon={faPlusSquare}
              transform="shrink-4 left-2 down-3"
              size={13}
            />
            save new crime
          </SaveCrimeButtonText>
        </SaveCrimeButton>
      </SaveCrimeContainer>
    </Background>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: '#2699FB',
    justifyContent: 'flex-end',
    alignContent: 'flex-end',
    alignItems: 'flex-end',
  },
  shadow: {
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomWidth: 2.5,
    borderRightWidth: 3,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: 'rgba(193,193,193,0.4)',
    borderRightColor: 'rgba(193,193,193,0.4)',
    borderRadius: 3,
  },
});
