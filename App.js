import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllPlaces from './srceens/AllPlaces';
import AddPlace from './srceens/AddPlace';
import IconButton from './components/UI/IconButton';
import { Colors } from './constants/colors';
import Map from './srceens/Map';
import { useEffect, useState } from 'react';
import { init } from './util/database';
import PlaceDetails from './srceens/PlaceDetails';


const Stack = createNativeStackNavigator();

export default function App() {

  const [dbInitialized, setDbInitialized] = useState(false)

  useEffect(() => {
    init().then(() => {
      setDbInitialized(true);
    }).catch((err) => {
      console.log('error', err);
    });
  }, [])

  if (!dbInitialized) {
    return (
      <Text>Database connect ...</Text>
    )
  }
  return (
    <>
      <StatusBar style='dark' />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: { backgroundColor: Colors.primary500 },
          headerTintColor: Colors.gray700,
          contentStyle: { backgroundColor: Colors.gray700 }
        }}
        >
          <Stack.Screen
            name='AllPlaces'
            component={AllPlaces}
            options={({ navigation }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) => (
                <IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace')} />
              ),
            })}
          />
          <Stack.Screen name='AddPlace' component={AddPlace}
            options={{
              title: 'Add a new Place'
            }}
          />

          <Stack.Screen name='Map' component={Map} />
          <Stack.Screen name='PlaceDetails' component={PlaceDetails}
            options={{
              title: 'Loading Placec ...'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({

});
