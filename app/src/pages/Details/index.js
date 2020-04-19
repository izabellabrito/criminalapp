import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {
  Background,
  Container,
  Title,
  Card,
  Text,
  Description,
  Icon,
  ImageContainer,
  DeleteButton,
  LoadingContainer,
  LoadingText,
} from './styles';

import api from '../../services/api';
import Loading from '../../components/Loading';

export default function Details({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const [loading, setLoading] = useState(false);

  async function deleteCrime() {
    setLoading(true);
    await api
      .delete(`crime?crime_id=${item.id_crime}`)
      .then((response) => {
        if (response.data) {
          setLoading(false);
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  return (
    <Background>
      {loading ? (
        <LoadingContainer>
          <LoadingText>Deleting...</LoadingText>
          <Loading />
        </LoadingContainer>
      ) : (
        <Container>
          <Title>crime</Title>
          <Card style={styles.shadow}>
            <Text>
              {moment.utc(item.crime_date).format('MM-DD-YYYY - HH:mm:ss')}
            </Text>
            <Description mb="12px">{item.country}</Description>

            {item.criminal_crime_types.map((crime, index) => {
              return (
                <View key={index}>
                  <Text>{crime.crime_type}</Text>
                  <Description mb="12px">Crime type</Description>

                  <ImageContainer src={''}>
                    <View>
                      <Text>{crime.criminal}</Text>
                      <Description mb="12px">Criminal</Description>
                    </View>
                    <Icon />
                  </ImageContainer>
                </View>
              );
            })}

            {item.weapons_crime.map((weapon, index) => {
              return (
                <View key={index}>
                  <Text>{weapon.weapon}</Text>
                  <Description mb="12px">{weapon.weapon_type}</Description>
                </View>
              );
            })}

            {item.victims_crime.map((victim, index) => {
              return (
                <ImageContainer key={index}>
                  <View>
                    <Text>{victim.victim}</Text>
                    <Description>Victim</Description>
                  </View>
                  <Icon />
                </ImageContainer>
              );
            })}

            <DeleteButton onPress={deleteCrime}>
              <FontAwesomeIcon
                style={styles.icon}
                icon={faTrash}
                transform="shrink-3 left-1 down-2"
                size={14}
              />
            </DeleteButton>
          </Card>
        </Container>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
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
