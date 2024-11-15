import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ListRenderItem,
} from "react-native";

// Typ danych użytkownika
interface User {
  id: number;
  login: string;
}

const HomeScreen: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/auth/users");
        if (!response.ok) {
          throw new Error("Błąd podczas pobierania użytkowników");
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (error) {
        Alert.alert("Błąd", "Nie udało się pobrać użytkowników");
      }
    };

    fetchUsers();
  }, []);

  // Renderowanie jednego użytkownika
  const renderUser: ListRenderItem<User> = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.userLogin}>{item.login}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista użytkowników</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  userItem: { marginBottom: 10 },
  userName: { fontWeight: "bold" },
  userLogin: { color: "gray" },
});

export default HomeScreen;
