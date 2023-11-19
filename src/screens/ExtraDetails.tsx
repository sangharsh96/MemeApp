import {useFormik} from 'formik';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Button, Checkbox, Portal, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {ErrorField} from '../components/comman/ErrorField';
import React, {useContext, useState} from 'react';
import {Title} from '../components/comman/Title';
import {CustomDropdown} from '../components/comman/CustomDropdawn';
import UserModal from './UserModal';
import UserContext from '../context/UserContext';

export function ExtraDetails({navigation}: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const [saveNextClick, setSaveNextClick] = useState(false);
  const {userData, setUserData} = useContext(UserContext);
  const [isChecked, setIsChecked] = useState(false);

  const initialValues = {
    countryCode: '',
    mobileNumber: '',
  };

  const userLoginSchema = Yup.object({
    countryCode: Yup.string().required('Please Select Country Code'),
    mobileNumber: Yup.string()
      .matches(/^[6-9]{1}[0-9]{9}$/, 'Please Enter Correct Mobile Number')
      .typeError('Plase Enter Correct Mobile Number')
      .required('Please Enter Mobile Number'),
  });

  const countryCodeList = [
    {
      label: '+91',
      value: '+91',
    },
    {
      label: '+1',
      value: '+1',
    },
  ];

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  const handleSave = () => {
    setSaveNextClick(true);
    handleSubmit();
  };

  const {
    values,
    errors,
    touched,
    handleSubmit,
    setValues,
    handleBlur,
    handleChange,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: userLoginSchema,
    onSubmit: () => {
      if (saveNextClick && isChecked) {
        setModalVisible(true);
        setUserData({
          ...userData,
          countryCode: values.countryCode,
          mobileNumber: values.mobileNumber,
        });
      }
    },
  });

  return (
    <>
      <Title title="Extra Details" />
      <ScrollView style={styles.container}>
        <CustomDropdown
          {...{
            data1: countryCodeList,
            formData: values,
            setFormData: setValues,
            field: 'countryCode',
            placeholder: 'Country Code',
          }}
        />
        <ErrorField errors={errors.countryCode} touched={touched.countryCode} />
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Mobile Number"
          keyboardType="numeric"
          maxLength={10}
          value={values.mobileNumber}
          onBlur={handleBlur('mobileNumber')}
          onChangeText={handleChange('mobileNumber')}
        />
        <ErrorField
          errors={errors.mobileNumber}
          touched={touched.mobileNumber}
        />

        <TouchableOpacity
          onPress={handleCheckboxPress}
          style={styles.checkboxContainer}>
          <View
            style={
              isChecked ? styles.checkboxChecked : styles.checkboxUnchecked
            }></View>
          <Text style={styles.checkboxLabel}>
            Please accept terms and condition
          </Text>
        </TouchableOpacity>

        <View style={styles.buttonContainer}>
          <Button
            onPress={() => navigation.goBack()}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Back{' '}
          </Button>
          <Button
            onPress={handleSave}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Save{' '}
          </Button>
          <Button
            disabled
            onPress={handleSubmit}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Save and Next{' '}
          </Button>
          <Portal>
            <UserModal
              {...{userData, setModalVisible, modalVisible, setSaveNextClick}}
            />
          </Portal>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  button: {
    backgroundColor: '#035C92',
  },

  checkbox: {
    alignSelf: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: '120%',
    marginTop: 40,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxUnchecked: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checkboxChecked: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#000',
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});
