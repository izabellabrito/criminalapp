import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faThumbsDown, faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import moment from 'moment';

import {
  Background,
  Container,
  Title,
  Card,
  Text,
  Description,
  Icon,
  ImageContainer,
  ConfirmationContainer,
  ConfirmationButton,
  ConfirmationButtonText,
  LoadingContainer,
  LoadingText,
} from './styles';

import api from '../../services/api';
import Loading from '../../components/Loading';

export default function Confirmation({ route }) {
  const { criminals, weapons, victims, date, country } = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  async function addCrime() {
    setLoading(true);
    const data = {
      victim_list: victims.map((item) => {
        return { victim_id: item.victim.id_victim };
      }),
      weapon_list: weapons.map((item) => {
        return { weapon_id: item.weaponType.id_weapon_type };
      }),
      criminal_list: criminals.map((item) => {
        return {
          criminal_id: item.criminal.id_criminal,
          id_crime_type: item.crimeType.id_crime_type,
        };
      }),
      country: 'Brazil',
      crime_date: moment(date).format('YYYY-MM-DD'),
    };

    await api
      .post('crime', data)
      .then((response) => {
        if (response.data) {
          navigation.navigate('Home');
        }
      })
      .catch((error) => {
        console.warn(error);
      });

    setLoading(false);
  }

  return (
    <Background>
      {loading ? (
        <LoadingContainer>
          <LoadingText>Saving...</LoadingText>
          <Loading />
        </LoadingContainer>
      ) : (
        <>
          <ScrollView>
            <Container>
              <Title>the information is correct?</Title>

              <Card style={styles.shadow}>
                <Text>{moment(date).format('DD / MM / YYYY - HH:mm:ss')}</Text>
                <Description mb="12px">{country}</Description>

                {criminals.map((item) => {
                  return (
                    <>
                      <Text>{item.crimeType.tx_type}</Text>
                      <Description mb="12px">Crime type</Description>

                      <ImageContainer>
                        <View>
                          <Text>{item.criminal.tx_name}</Text>
                          <Description mb="12px">Criminal</Description>
                        </View>
                        <Icon />
                      </ImageContainer>
                    </>
                  );
                })}

                {weapons.map((item) => {
                  return (
                    <>
                      <Text>{item.weapon.tx_weapon_type}</Text>
                      <Description mb="12px">
                        {item.weaponType.tx_weapon_type}
                      </Description>
                    </>
                  );
                })}

                {victims.map((item) => {
                  return (
                    <ImageContainer>
                      <View>
                        <Text>{item.victim.tx_name}</Text>
                        <Description>Victim</Description>
                      </View>
                      <Icon />
                    </ImageContainer>
                  );
                })}
              </Card>
            </Container>
          </ScrollView>

          <ConfirmationContainer>
            <ConfirmationButton
              style={styles.shadow}
              onPress={() => navigation.navigate('NewCrime')}>
              <ConfirmationButtonText>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faThumbsDown}
                  transform="shrink-4 left-2 down-3"
                  size={13}
                />
                nope
              </ConfirmationButtonText>
            </ConfirmationButton>
            <ConfirmationButton style={styles.shadow} onPress={addCrime}>
              <ConfirmationButtonText>
                <FontAwesomeIcon
                  style={styles.icon}
                  icon={faThumbsUp}
                  transform="shrink-4 left-2 down-3"
                  size={13}
                />
                ok
              </ConfirmationButtonText>
            </ConfirmationButton>
          </ConfirmationContainer>
        </>
      )}
    </Background>
  );
}

const styles = StyleSheet.create({
  icon: {
    color: '#313131',
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
