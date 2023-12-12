
import {useFormik} from 'formik';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import * as Yup from 'yup';


import {Title} from '../Components/Title';
import {ErrorField} from '../Components/ErrorField';

export function FirstScreen({navigation}: any) {
  const initialValues = {
    mobileNumber: '',
  };
  const userLoginSchema = Yup.object({
    mobileNumber: Yup.string()
      .matches(/^[6-9]{1}[0-9]{9}$/, 'Please enter correct mobile number')
      .typeError('Please enter correct mobile number')
      .required('Please Enter Mobile Number'),
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
      //navigation.navigate('SecondScreen',{mobile:values.mobileNumber});
       navigation.navigate('SecondScreen', {
         data: values.mobileNumber,
       });
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
            source={require('../assests/UserImage.png')}
          />
        </View>
        <TextInput
          mode="outlined"
          style={styles.textInput}
          label="Mobile Number"
          value={values.mobileNumber}
          keyboardType="number-pad"
          onBlur={handleBlur('mobileNumber')}
          onChangeText={handleChange('mobileNumber')}
        />
        <ErrorField
          errors={errors.mobileNumber}
          touched={touched.mobileNumber}
        />

        <View style={styles.buttonContainer}>
          <Button
            onPress={handleSaveAndNext}
            textColor={'white'}
            style={styles.button}>
            {' '}
            Get OTP{' '}
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
    marginTop: 15,
    marginBottom: 30,
    padding: 20,
  },
});
