import React, { useState, useEffect } from 'react';
import { ScrollView, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Picker } from '@react-native-community/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faFolderOpen,
  faSortAmountDown,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import {
  faCalendarAlt,
  faPlusSquare,
} from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import {
  Background,
  Container,
  Title,
  FilterContainer,
  FilterItem,
  FilterTitle,
  TextInput,
  PickerInput,
  DateInput,
  DateInputText,
  FilterButton,
  ListContainer,
  NewCrimeContainer,
  NewCrimeButton,
  NewCrimeButtonText,
} from './styles';

import ListItem from './components/ListItem';
import Loading from '../../components/Loading';
import api from '../../services/api';

export default function Home() {
  const navigation = useNavigation();
  const [crimes, setCrimes] = useState([]);
  const [crimeTypes, setCrimeTypes] = useState([]);
  const [filteredCrimes, setFilteredCrimes] = useState([]);
  const [filterFields, setFilterFields] = useState({
    crimeType: 'All types',
    orderBy: 'None',
    text: '',
  });
  const [orderby] = useState(['Descending', 'Ascending', 'None']);
  const [date, setDate] = useState(Date.now());
  const [formatedDate, setFormatedDate] = useState('All dates');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);

    if (event.type === 'neutralButtonPressed') {
      setFormatedDate('All dates');
    } else {
      setFormatedDate(moment(currentDate).format('L'));
    }
  }

  function handleFilterChange(itemValue, itemField) {
    let fields = { ...filterFields };
    fields = { ...fields, [itemField]: itemValue };
    setFilterFields(fields);
  }

  function filter() {
    setLoading(true);
    setFilteredCrimes([]);

    let filtered = crimes;

    if (filterFields.crimeType !== 'All types') {
      filtered = filtered.filter((crime) =>
        crime.criminal_crime_types.find(
          (types) => types.crime_type === filterFields.crimeType,
        ),
      );
    }

    if (formatedDate !== 'All dates') {
      filtered = filtered.filter((crime) => {
        return moment(crime.crime_date)
          .startOf('day')
          .isSame(moment(date).startOf('day'));
      });
    }

    if (filterFields.orderBy !== 'None') {
      filtered = filtered.slice(0).sort((a, b) => {
        if (filterFields.orderBy === 'Descending') {
          return new Date(b.crime_date) - new Date(a.crime_date);
        } else {
          return new Date(a.crime_date) - new Date(b.crime_date);
        }
      });
    }

    if (filterFields.text !== '') {
      filtered = filtered.filter((item) => {
        return (
          item.country
            .toLowerCase()
            .indexOf(filterFields.text.toLowerCase()) !== -1
        );
      });
    }

    setFilteredCrimes(filtered);
    setLoading(false);
  }

  async function loadCrimes() {
    const response = await api.get('crimes');
    setCrimes(response.data.data.crimes);
    setFilteredCrimes(response.data.data.crimes);
    setLoading(false);
  }

  async function loadCrimeTypes() {
    const response = await api.get('crime_types');
    setCrimeTypes([
      ...response.data.data.crime_types,
      { tx_type: 'All types' },
    ]);
  }

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      loadCrimes();
    }, []),
  );

  useEffect(() => {
    loadCrimes();
    loadCrimeTypes();
  }, []);

  return (
    <Background>
      <ScrollView>
        <Container>
          <Title>crime list</Title>

          <FilterContainer>
            <FilterItem>
              <FilterTitle>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faCalendarAlt}
                  transform="shrink-3 left-1 down-2"
                  size={14}
                />
                Date
              </FilterTitle>
              <DateInput onPress={() => setShow(true)}>
                <DateInputText>{formatedDate}</DateInputText>
              </DateInput>
            </FilterItem>

            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                timeZoneOffsetInMinutes={0}
                value={date}
                mode="date"
                display="default"
                onChange={onDateChange}
                neutralButtonLabel="all dates"
              />
            )}

            <FilterItem>
              <FilterTitle>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faFolderOpen}
                  transform="shrink-3 left-1 down-3"
                  size={13}
                />
                Type of crime
              </FilterTitle>

              <PickerInput>
                <Picker
                  style={styles.pickerText}
                  selectedValue={filterFields.crimeType}
                  onValueChange={(itemValue) =>
                    handleFilterChange(itemValue, 'crimeType')
                  }>
                  {crimeTypes.map((crime, index) => (
                    <Picker.Item
                      label={crime.tx_type}
                      value={crime.tx_type}
                      key={index}
                    />
                  ))}
                </Picker>
              </PickerInput>
            </FilterItem>

            <FilterItem>
              <FilterTitle>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faSortAmountDown}
                  transform="shrink-3 left-1 down-3"
                  size={14}
                />
                Order by
              </FilterTitle>
              <PickerInput>
                <Picker
                  style={styles.pickerText}
                  selectedValue={filterFields.orderBy}
                  onValueChange={(itemValue) =>
                    handleFilterChange(itemValue, 'orderBy')
                  }>
                  {orderby.map((item, index) => {
                    return (
                      <Picker.Item label={item} value={item} key={index} />
                    );
                  })}
                </Picker>
              </PickerInput>
            </FilterItem>

            <FilterItem>
              <FilterTitle>Text filter</FilterTitle>
              <TextInput
                placeholder="Search for..."
                onChangeText={(itemValue) =>
                  handleFilterChange(itemValue, 'text')
                }
              />
            </FilterItem>

            <FilterButton style={styles.shadow} onPress={filter}>
              <FontAwesomeIcon
                style={styles.buttonIcon}
                icon={faSearch}
                transform="shrink-2"
                size={14}
              />
            </FilterButton>
          </FilterContainer>

          <ListContainer>
            {loading ? (
              <Loading />
            ) : (
              <FlatList
                scrollEnabled={false}
                data={filteredCrimes}
                renderItem={({ item }) => <ListItem item={item} />}
                keyExtractor={(item) => String(item.id_crime)}
              />
            )}
          </ListContainer>
        </Container>
      </ScrollView>

      <NewCrimeContainer>
        <NewCrimeButton
          style={styles.shadow}
          onPress={() => navigation.navigate('NewCrime')}>
          <NewCrimeButtonText>
            <FontAwesomeIcon
              style={styles.buttonIcon}
              icon={faPlusSquare}
              transform="shrink-4 left-2 down-3"
              size={13}
            />
            add new crime
          </NewCrimeButtonText>
        </NewCrimeButton>
      </NewCrimeContainer>
    </Background>
  );
}

const styles = StyleSheet.create({
  pickerText: {
    height: 20,
    color: '#3C5C77',
    transform: [{ scaleX: 1 }, { scaleY: 0.8 }],
  },
  icon: {
    color: '#3C5C77',
  },
  buttonIcon: {
    color: '#313131',
  },
  shadow: {
    borderTopColor: '#fff',
    borderTopWidth: 0.5,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 0.5,
    borderColor: 'rgba(193,193,193,0.5)',
  },
});
