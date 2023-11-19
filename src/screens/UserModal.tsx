import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Modal, Portal, TextInput} from 'react-native-paper';

const UserModal = ({
  setModalVisible,
  modalVisible,
  userData,
  setSaveNextClick,
}: any) => {
  return (
    <Portal>
      <Modal
        visible={modalVisible}
        onDismiss={() => setModalVisible(false)}
        contentContainerStyle={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View
            style={{
              backgroundColor: '#035C92',
              width: '100%',
              marginBottom: 10,
              borderRadius: 5,
            }}>
            <Text
              style={{
                marginBottom: 10,
                textAlign: 'center',
                paddingTop: 10,
                color: 'white',
              }}>
              User Details
            </Text>
          </View>
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="Email ID"
            value={userData.email}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="Password"
            value={userData.password}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="User First Name"
            value={userData.firstName}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="User Last Name"
            value={userData.lastName}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="Address"
            value={userData.address}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="Country Code"
            value={userData.countryCode}
          />
          <TextInput
            disabled
            mode="outlined"
            style={styles.textInput}
            label="Mobile Number"
            value={userData.mobileNumber}
          />

          <View style={{width: '100%'}}>
            <Button
              onPress={() => {
                setModalVisible(false);

                setSaveNextClick(false);
              }}
              textColor={'white'}
              style={styles.button}>
              Close
            </Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  button: {
    backgroundColor: '#035C92',
    width: '100%',
  },
});

export default UserModal;
