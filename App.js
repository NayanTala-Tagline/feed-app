import { StatusBar, StyleSheet } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { colors } from './src/styles/colors'
import { persistor, store } from './src/redux/store'
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AddFeed from './src/screens/AddFeed'
import FeedList from './src/screens/FeedList'

export const navigationRef = React.createRef();
const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar
            translucent
            backgroundColor={colors.TRANS}
            barStyle="dark-content"
          />
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              screenOptions={{
                headerShown: false
              }}
              initialRouteName={'AddFeed'}
            >
              <Stack.Screen name={'AddFeed'} component={AddFeed} />
              <Stack.Screen name={'FeedList'} component={FeedList} />
            </Stack.Navigator>
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  )
}

export default App

const styles = StyleSheet.create({})