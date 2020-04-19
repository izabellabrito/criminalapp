import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import {
  ButtonContainer,
  AddVictimsButton,
  AddVictimsButtonText,
} from './styles';

import { FieldTitle, PickerInput } from '../../styles';

import api from '../../../../services/api';

export default function VictimFields(props) {
  const [victims, setVictims] = useState([]);
  const [victimFields, setVictimFields] = useState([{ victim: '' }]);
  const [victimList, setVictimList] = useState([
    {
      victim: {},
    },
  ]);

  function addField() {
    setVictimFields((prevVictimFields) => {
      return [...prevVictimFields, { victim: '' }];
    });
  }

  function createVictimFields() {
    return victimFields.map((item, index) => (
      <View key={index}>
        <FieldTitle>Victim</FieldTitle>
        <PickerInput>
          <Picker
            style={styles.pickerText}
            selectedValue={victimFields[index].victim}
            onValueChange={(value) => handleVictimChange(value, index)}>
            {victims.map((victim) => {
              return (
                <Picker.Item
                  label={victim.tx_name}
                  value={victim.id_victim}
                  key={victim.id_victim}
                />
              );
            })}
          </Picker>
        </PickerInput>
      </View>
    ));
  }

  function handleVictimChange(itemValue, itemIndex) {
    let fields = [...victimFields];
    fields[itemIndex] = { ...fields[itemIndex], victim: itemValue };

    setVictimFields(fields);
    buildCrimeTypeList(itemValue, itemIndex);
  }

  function buildCrimeTypeList(itemValue, itemIndex) {
    const item = victims.find((x) => x.id_victim === itemValue);

    let fields = [...victimList];
    fields[itemIndex] = {
      ...fields[itemIndex],
      victim: item,
    };
    setVictimList(fields);
    props.dataChanged(fields);
  }

  async function loadVictims() {
    const response = await api.get('victims');
    setVictims(response.data.data);
  }

  useEffect(() => {
    loadVictims();
  });

  return (
    <>
      {createVictimFields()}
      <ButtonContainer>
        <AddVictimsButton style={styles.shadow} onPress={addField}>
          <AddVictimsButtonText>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faPlusSquare}
              transform="shrink-4 left-2 down-3"
              size={13}
            />
            add victims
          </AddVictimsButtonText>
        </AddVictimsButton>
      </ButtonContainer>
    </>
  );
}

const styles = StyleSheet.create({
  pickerText: {
    height: 20,
    color: '#3C5C77',
    transform: [{ scaleX: 1 }, { scaleY: 0.8 }],
  },
  icon: {
    color: '#2699FB',
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
