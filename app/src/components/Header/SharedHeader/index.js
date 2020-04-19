import React from 'react';

import { Container, Text } from './styles';

export default function SharedHeader({ title }) {
  return (
    <Container>
      <Text>{title}</Text>
    </Container>
  );
}
