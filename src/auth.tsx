import React, { useState, useEffect } from 'react';
import { Button } from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { Container, TextInput } from './styles';

enum Step {
  FIRST_STEP = 'first_step',
  SECOND_STEP = 'second_step',
}

export function PhoneAuth() {
  const [step, setStep] = useState<Step>(Step.FIRST_STEP);

  const [firebaseUser, setFirebaseUser] =
    useState<FirebaseAuthTypes.User | null>();

  const [phoneConfirm, setPhoneConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();

  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  useEffect(() => {
    const currentFirebaseUser = auth().currentUser;
    setFirebaseUser(currentFirebaseUser);
  }, []);

  const signOutFirebase = async () => {
    try {
      await auth().signOut();
      setFirebaseUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithPhoneNumber = async (phoneNumber: string) => {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    setPhoneConfirm(confirmation);
  };

  const sendEmailVerification = async (email: string) => {
    try {
      // await auth().currentUser?.sendEmailVerification({
      //   handleCodeInApp: true,
      //   url: 'https://firauthpoc.page.link/email-verification',
      // });

      // METHOD FOR SIGN-IN (email already verified)
      // await auth().sendSignInLinkToEmail(email, {
      //   handleCodeInApp: true,
      //   url: 'firebase.auth.poc://email-verification',
      // });

      // METHOD FOR SIGN-UP
      await auth().currentUser?.verifyBeforeUpdateEmail(email, {
        handleCodeInApp: true,
        url: 'https://firauthpoc.page.link/email-verification',
      });
      console.log('Email sent!');
    } catch (error) {
      console.log(error);
    }
  };

  async function confirmCode() {
    try {
      await phoneConfirm?.confirm(code);
      setStep(Step.SECOND_STEP);
    } catch (error) {
      console.error(error);
      console.log('Invalid code.');
    }
  }

  switch (step) {
    case Step.FIRST_STEP:
      return (
        <Container>
          {firebaseUser ? (
            <Button title="Sign out" onPress={() => signOutFirebase()} />
          ) : !phoneConfirm ? (
            <Button
              title="Phone Number Sign In"
              onPress={() => signInWithPhoneNumber('+55 5398127-6614')}
            />
          ) : (
            <>
              <TextInput value={code} onChangeText={text => setCode(text)} />
              <Button title="Confirm Code" onPress={() => confirmCode()} />
            </>
          )}
        </Container>
      );

    case Step.SECOND_STEP:
      return (
        <Container>
          <Button
            title="Email Verify"
            onPress={() => sendEmailVerification('roberson.costa@ckl.io')}
          />
        </Container>
      );
  }
}
