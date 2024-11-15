import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { register } from "../../api/auth";

const RegisterScreen = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!username || !password || !confirmPassword) {
      Alert.alert("Błąd", "Wszystkie pola są wymagane");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Błąd", "Hasła muszą się zgadzać");
      return;
    }

    try {
      const response = await register(username, password);
      if (response.success) {
        Alert.alert("Sukces", "Rejestracja zakończona pomyślnie!");
      } else {
        Alert.alert("Błąd", response.message || "Wystąpił błąd podczas rejestracji");
      }
    } catch (error) {
      Alert.alert("Błąd", "Wystąpił błąd podczas rejestracji");
    }
  };

  return (
    <View style={styles.container}>
      <Text>Rejestracja</Text>
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
      <TextInput
        placeholder="Potwierdź hasło"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
      />
      <Button title="Zarejestruj się" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10, width: "100%" },
});

export default RegisterScreen;
