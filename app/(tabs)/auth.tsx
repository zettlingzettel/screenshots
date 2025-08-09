import { KeyboardAvoidingView, Platform, Text, View } from "react-native"

export default function AuthScreen(){
  return(
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <View>
        <Text>?Login or Register</Text>
      </View>
    </KeyboardAvoidingView>
  )
}