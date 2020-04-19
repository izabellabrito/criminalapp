import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import {
  ButtonContainer,
  AddCriminalButton,
  AddCriminalButtonText,
} from './styles';

import { FieldTitle, PickerInput } from '../../styles';

import api from '../../../../services/api';

export default function CriminalFields(props) {
  const [criminals, setCriminals] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [criminalFields, setCriminalFields] = useState([
    {
      crimeType: '',
      criminal: '',
    },
  ]);
  const [criminalList, setCriminalList] = useState([
    {
      criminal: {},
      crimeType: {},
    },
  ]);

  function addField() {
    setCriminalFields((prevCriminalFields) => {
      return [...prevCriminalFields, { crimeType: '', criminal: '' }];
    });
  }

  function createCriminalFields() {
    return criminalFields.map((item, index) => (
      <View key={index}>
        <FieldTitle>Type of crime</FieldTitle>
        <PickerInput>
          <Picker
            style={styles.pickerText}
            selectedValue={criminalFields[index].crimeType}
            onValueChange={(value) =>
              handleCriminalChange(value, index, 'crimeType')
            }>
            {crimeTypes.map((type) => {
              return (
                <Picker.Item
                  label={type.tx_type}
                  value={type.id_crime_type}
                  key={type.id_crime_type}
                />
              );
            })}
          </Picker>
        </PickerInput>

        <FieldTitle>Criminal</FieldTitle>
        <PickerInput>
          <Picker
            style={styles.pickerText}
            selectedValue={criminalFields[index].criminal}
            onValueChange={(value) =>
              handleCriminalChange(value, index, 'criminal')
            }>
            {criminals.map((criminal) => {
              return (
                <Picker.Item
                  label={criminal.tx_name}
                  value={criminal.id_criminal}
                  key={criminal.id_criminal}
                />
              );
            })}
          </Picker>
        </PickerInput>
      </View>
    ));
  }

  function handleCriminalChange(itemValue, itemIndex, itemField) {
    let fields = [...criminalFields];
    fields[itemIndex] = {
      ...fields[itemIndex],
      [itemField]: itemValue,
    };
    setCriminalFields(fields);

    if (itemField === 'crimeType') {
      buildCrimeTypeList(itemValue, itemIndex);
    } else {
      buildCriminalList(itemValue, itemIndex);
    }
  }

  function buildCrimeTypeList(itemValue, itemIndex) {
    const item = crimeTypes.find((x) => x.id_crime_type === itemValue);

    let fields = [...criminalList];
    fields[itemIndex] = {
      ...fields[itemIndex],
      crimeType: item,
    };
    setCriminalList(fields);
    props.dataChanged(fields);
  }

  function buildCriminalList(itemValue, itemIndex) {
    const item = criminals.find((x) => x.id_criminal === itemValue);

    let fields = [...criminalList];
    fields[itemIndex] = {
      ...fields[itemIndex],
      criminal: item,
    };
    setCriminalList(fields);
    props.dataChanged(fields);
  }

  async function loadCrimals() {
    const response = await api.get('criminals');
    setCriminals(response.data.data);
  }

  async function loadCrimeTypes() {
    const response = await api.get('crime_types');
    setCrimeTypes(response.data.data.crime_types);
  }

  useEffect(() => {
    loadCrimals();
    loadCrimeTypes();
  });

  return (
    <>
      {createCriminalFields()}
      <ButtonContainer>
        <AddCriminalButton style={styles.shadow} onPress={addField}>
          <AddCriminalButtonText>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faPlusSquare}
              transform="shrink-4 left-2 down-3"
              size={13}
            />
            add criminal
          </AddCriminalButtonText>
        </AddCriminalButton>
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
