import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-community/picker';
import { View, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';

import {
  ButtonContainer,
  AddWeaponsButton,
  AddWeaponsButtonText,
} from './styles';

import { FieldTitle, PickerInput } from '../../styles';

import api from '../../../../services/api';

export default function WeaponFields(props) {
  const [weapons, setWeapons] = useState([]);
  const [weaponTypes, setWeaponTypes] = useState([]);
  const [weaponFields, setWeaponFields] = useState([
    { weaponType: '', weapon: '' },
  ]);
  const [weaponList, setWeaponList] = useState([
    {
      weapon: {},
      weaponType: {},
    },
  ]);

  function addField() {
    setWeaponFields((prevWeaponFields) => {
      return [...prevWeaponFields, { weaponType: '', weapon: '' }];
    });
  }

  function createWeaponFields() {
    return weaponFields.map((item, index) => (
      <View key={index}>
        <FieldTitle>Type of weapon</FieldTitle>
        <PickerInput>
          <Picker
            style={styles.pickerText}
            selectedValue={weaponFields[index].weaponType}
            onValueChange={(value) =>
              handleWeaponChange(value, index, 'weaponType')
            }>
            {weaponTypes.map((type) => {
              return (
                <Picker.Item
                  label={type.tx_weapon_type}
                  value={type.id_weapon_type}
                  key={type.id_weapon_type}
                />
              );
            })}
          </Picker>
        </PickerInput>

        <FieldTitle>Weapon</FieldTitle>
        <PickerInput>
          <Picker
            style={styles.pickerText}
            selectedValue={weaponFields[index].weapon}
            onValueChange={(value) =>
              handleWeaponChange(value, index, 'weapon')
            }>
            {weapons.map((weapon) => {
              return (
                <Picker.Item
                  label={weapon.tx_weapon_type}
                  value={weapon.id_weapon}
                  key={weapon.id_weapon}
                />
              );
            })}
          </Picker>
        </PickerInput>
      </View>
    ));
  }

  function handleWeaponChange(itemValue, itemIndex, itemField) {
    let fields = [...weaponFields];
    fields[itemIndex] = {
      ...fields[itemIndex],
      [itemField]: itemValue,
    };
    setWeaponFields(fields);

    if (itemField === 'weaponType') {
      buildWeaponTypeList(itemValue, itemIndex);
    } else {
      buildWeaponList(itemValue, itemIndex);
    }
  }

  function buildWeaponTypeList(itemValue, itemIndex) {
    const item = weaponTypes.find((x) => x.id_weapon_type === itemValue);

    let fields = [...weaponList];
    fields[itemIndex] = {
      ...fields[itemIndex],
      weaponType: item,
    };
    setWeaponList(fields);
    props.dataChanged(fields);
  }

  function buildWeaponList(itemValue, itemIndex) {
    const item = weapons.find((x) => x.id_weapon === itemValue);

    let fields = [...weaponList];
    fields[itemIndex] = {
      ...fields[itemIndex],
      weapon: item,
    };
    setWeaponList(fields);
    props.dataChanged(fields);
  }

  async function loadWeapons() {
    const response = await api.get('weapons');
    setWeapons(response.data.data);
  }

  async function loadWeaponTypes() {
    const response = await api.get('weapon_types');
    setWeaponTypes(response.data.data.weapon_type);
  }

  useEffect(() => {
    loadWeapons();
    loadWeaponTypes();
  });

  return (
    <>
      {createWeaponFields()}
      <ButtonContainer>
        <AddWeaponsButton style={styles.shadow} onPress={addField}>
          <AddWeaponsButtonText>
            <FontAwesomeIcon
              style={styles.icon}
              icon={faPlusSquare}
              transform="shrink-4 left-2 down-3"
              size={13}
            />
            add weapon
          </AddWeaponsButtonText>
        </AddWeaponsButton>
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
