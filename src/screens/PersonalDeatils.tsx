import {useFormik} from 'formik';
import {ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {ErrorField} from '../components/comman/ErrorField';
import {Title} from '../components/comman/Title';
import {useContext, useState} from 'react';
import UserContext from '../context/UserContext';

export function PersonalDetails({navigation}: any) {
  const [saveNextClick, setSaveNextClick] = useState(false);
  const {userData, setUserData} = useContext(UserContext);
  const initialValues = {
    firstName: '',
    lastName: '',
    address: '',
  };
  const userLoginSchema = Yup.object({
    firstName: Yup.string()
      .matches(/^[a-zA-Z]{2,50}$/, 'Please enter correct First Name')
      .typeError('Plase enter correct First Name')
      .required('Please Enter First Name'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Please enter Correct Last Name ')
      .typeError('Plase enter correct Last Name'),
    address: Yup.string()
      .matches(/^.{10,}$/, 'Address must be at least 10 characters long')
      .required('Please enter address'),
  });
  const handleSaveAndNext = () => {
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
      if (saveNextClick) {
        setUserData({
          ...userData,
          firstName: values.firstName,
          lastName: values.lastName,
          address: values.address,
        });

        setSaveNextClick(false);
        navigation.navigate('Extra');
      }
    },
  });

  return (
    <>
      <Title title="Personal Deatils" />
      <ScrollView style={styles.container}>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="User First Name"
          value={values.firstName}
          onBlur={handleBlur('firstName')}
          onChangeText={handleChange('firstName')}
        />
        <ErrorField errors={errors.firstName} touched={touched.firstName} />
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="User Last Name"
          value={values.lastName}
          onBlur={handleBlur('lastName')}
          onChangeText={handleChange('lastName')}
        />
        <ErrorField errors={errors.lastName} touched={touched.lastName} />
        <TextInput
          numberOfLines={6}
          style={{backgroundColor: 'white', marginBottom: 20}}
          mode="outlined"
          label="Address"
          value={values.address}
          onBlur={handleBlur('address')}
          onChangeText={handleChange('address')}
        />
        <ErrorField errors={errors.address} touched={touched.address} />
        <View style={styles.buttonContainer}>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Back{' '}
          </Button>
          <Button
            onPress={handleSubmit}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Save{' '}
          </Button>
          <Button
            onPress={handleSaveAndNext}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Save and Next{' '}
          </Button>
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
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: '110%',
    marginTop: 40,
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
});
