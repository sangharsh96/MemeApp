import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';



import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { AllMemes } from './src/screens/AllMeme';
import Meme from './src/screens/Meme';
import { PaperProvider } from 'react-native-paper';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    
      <NavigationContainer>
        <PaperProvider>
          <Stack.Navigator initialRouteName="Allmeme">
            <Stack.Screen
              name="Allmeme"
              component={AllMemes}
              //options={{headerShown: false}}
            />
            <Stack.Screen
              name="meme"
              component={Meme}
             // options={{headerShown: false}}
            />
           
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
   
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
