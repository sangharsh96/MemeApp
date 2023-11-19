import {useFormik} from 'formik';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';
import {ErrorField} from '../components/comman/ErrorField';
import {Title} from '../components/comman/Title';
import {useContext, useState} from 'react';
import UserContext from '../context/UserContext';

export function UserLogin({navigation}: any) {
  const [saveNextClick, setSaveNextClick] = useState(false);
  const {userData, setUserData} = useContext(UserContext);
  const initialValues = {
    email: '',
    password: '',
  };
  const userLoginSchema = Yup.object({
    email: Yup.string()
      .matches(
        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        'Please enter correct email ID',
      )
      .typeError('Plase enter correct height')
      .required('Please Enter Email'),
    password: Yup.string()
      .matches(
        /^(?=(.*[A-Z]){2,})(?=(.*[a-z]){2,})(?=(.*\d){2,})(?=(.*[\W_]){2,}).{8,}$/,
        'Please enter Correct Password',
      )
      .typeError('Plase enter correct weight')
      .required('Please Enter Password'),
  });

  const onSaveClick = () => {
    handleSubmit();
  };
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
          email: values.email,
          password: values.password,
        });
        navigation.navigate('Personal');

        setSaveNextClick(false);
      }
    },
  });

  return (
    <>
      <Title title="User Login" />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: '70%',
              height: 100,

              borderRadius: 10,
              padding: 100,
            }}
            source={require('../assets/UserImage.png')}
          />
        </View>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Email"
          value={values.email}
          onBlur={handleBlur('email')}
          onChangeText={handleChange('email')}
        />
        <ErrorField errors={errors.email} touched={touched.email} />
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Password"
          value={values.password}
          onBlur={handleBlur('password')}
          onChangeText={handleChange('password')}
        />
        <ErrorField errors={errors.password} touched={touched.password} />
        <View style={styles.buttonContainer}>
          <Button
            disabled
            onPress={handleSubmit}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Back{' '}
          </Button>
          <Button
            onPress={onSaveClick}
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
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: '70%',
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
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  label: {
    backgroundColor: '#035C92',
    height: 90,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    width: '100%',
  },
  labelText: {
    textAlign: 'center',
    fontSize: 40,
    color: 'white',
    marginTop: 15,
  },
});
