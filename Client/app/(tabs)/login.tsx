import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { login } from "../../api/auth";

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Błąd", "Wszystkie pola są wymagane");
      return;
    }

    try {
      const response = await login(username, password);
      if (response.success) {
        Alert.alert("Sukces", "Zalogowano pomyślnie!");
      } else {
        Alert.alert("Błąd", "Niepoprawne dane logowania");
      }
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił błąd podczas logowania");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Nazwa użytkownika"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Hasło"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title="Zaloguj się" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: "100%" },
});

export default LoginScreen;
