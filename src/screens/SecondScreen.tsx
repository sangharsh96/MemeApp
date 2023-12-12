import {useFormik} from 'formik';
import {Alert, Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';

import {Title} from '../Components/Title';
import {ErrorField} from '../Components/ErrorField';

export function SecondScreen({navigation, route}: any) {
  const data = route.params.data;
  console.log(data);

  const initialValues = {
    otp: '',
  };
  const userLoginSchema = Yup.object({
    otp: Yup.string()

      .typeError('Please enter correct OTP')
      .required('Please Enter OTP'),
  });

  const handleSaveAndNext = () => {
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
      Alert.alert('OTP Verified', 'Your deatails has been submitted');
    },
  });

  return (
    <>
      <Title title="OTP Verify" />
      <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{
              width: '70%',
              height: 100,

              borderRadius: 10,
              padding: 100,
            }}
            source={require('../assests/UserImage.png')}
          />
        </View>
        <Text style={styles.text}>OTP send on +91-{data}</Text>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="OTP"
          value={values.otp}
          keyboardType="number-pad"
          onBlur={handleBlur('otp')}
          onChangeText={handleChange('otp')}
        />
        <ErrorField errors={errors.otp} touched={touched.otp} />

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSaveAndNext}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Sumbit OTP{' '}
          </Button>
        </View>
        <View>
          <Text style={styles.labelText}>
            By signing up you agree with our Terms and conditions
          </Text>
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
    paddingHorizontal: 16,
    marginBottom: 40,
    marginTop: 40,
  },
  textInput: {
    height: 40,
    marginBottom: 20,
    backgroundColor: 'white',
    width: '100%',
  },
  text: {
    color: 'gray',
    margin: 20,
    textAlign: 'center',
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
    fontSize: 15,
    color: 'gray',
    marginTop: 10,
    marginBottom: 30,
    padding: 20,
  },
});
