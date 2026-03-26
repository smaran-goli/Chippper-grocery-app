import { View, Text, SafeAreaView } from "react-native";
import SplashScreen from "./screens/SplashScreen";
import GlobalStyles from "./GlobalStyles";
import Home from "./screens/BuyerHome";
import AppLogin from "./screens/AppLogin";
import { Provider } from "react-redux";
import store from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <SafeAreaView style={GlobalStyles.AndroidSafeArea}>
      <StripeProvider publishableKey="pk_test_51JLkV2IUDIvcpDpfvaWbhf5U9Ox1ZVIYT0GDbS7ycDs7wD7i9qw9EOK6d9G7DcK1u4Y0qFu7ijiV0KWugjF4yZHv00fBmcyzUs">
        <Provider store={store}>
          <AppLogin />
        </Provider>
      </StripeProvider>
    </SafeAreaView>
  );
}
