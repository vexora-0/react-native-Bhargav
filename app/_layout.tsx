import CartLoader from "@/components/CartLoader";
import { store } from "../store/store";
import { Stack } from "expo-router";
import {Provider} from 'react-redux'



export default function RootLayout() {

  return (
    <Provider store={store}>
        <CartLoader/>
       <Stack screenOptions={{headerShown:false}} />
    </Provider>
  )

}
