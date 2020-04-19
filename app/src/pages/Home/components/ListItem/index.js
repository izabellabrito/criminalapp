import React from 'react';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { Card, Container, Text, LupaButton } from './styles';

export default function ListItem({ item }) {
  const navigation = useNavigation();

  return (
    <Card
      style={styles.shadow}
      onPress={() => navigation.navigate('Details', { item })}>
      <Container>
        <Text>
          {moment.utc(item.crime_date).format('MM/DD/YYYY - HH:mm:ss')}
        </Text>
        <Text size="10px" mb="10px" mt="2px">
          {item.country}
        </Text>

        {item.criminal_crime_types.map((type, index) => {
          return (
            <View key={index}>
              <Text>{type.crime_type}</Text>
              <Text size="10px" mt="2px">
                Crime type
              </Text>
            </View>
          );
        })}
      </Container>

      <LupaButton onPress={() => navigation.navigate('Details', { item })}>
        <FontAwesomeIcon
          style={styles.icon}
          icon={faSearchPlus}
          transform="shrink-3 left-1 down-2"
          size={14}
        />
      </LupaButton>
    </Card>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: '#2699FB',
  },
  shadow: {
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderTopColor: '#fff',
    borderLeftColor: '#fff',
    borderBottomColor: 'rgba(193,193,193,0.4)',
    borderRightColor: 'rgba(193,193,193,0.4)',
    borderRadius: 3,
  },
});
