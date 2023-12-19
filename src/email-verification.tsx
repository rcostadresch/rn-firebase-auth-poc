import React from 'react';
import { Button, Text } from 'react-native';
import { Container } from './styles';
import { useNavigation } from '@react-navigation/native';

export function EmailVerification() {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Email verified</Text>
      <Button title="Go back" onPress={() => navigation.navigate('Auth')} />
    </Container>
  );
}
