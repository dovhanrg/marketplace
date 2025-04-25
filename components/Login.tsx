import { View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/authSlice';
import * as SecureStore from 'expo-secure-store';
import * as Notifications from 'expo-notifications';
import { Text } from '../../components/ui/Text';
import { Button } from '../../components/ui/Button';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (data.token) {
        await SecureStore.setItemAsync('token', data.token);
        dispatch(setCredentials({ token: data.token }));

        // Schedule local notification
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Welcome back!',
            body: 'You have successfully logged in.',
          },
          trigger: null,
        });

        router.replace('/(tabs)');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-4">
        <Text className="text-2xl font-bold mb-6 text-center">Login</Text>

        <TextInput
          className="border border-gray-300 rounded-lg p-3 mb-4"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          returnKeyType="next"
          onSubmitEditing={() => passwordInput.focus()}
        />

        <TextInput
          ref={(input) => { passwordInput = input; }}
          className="border border-gray-300 rounded-lg p-3 mb-6"
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          returnKeyType="go"
          onSubmitEditing={handleLogin}
        />

        <Button
          onPress={handleLogin}
          disabled={loading}
          className="bg-blue-500 py-3 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">
            {loading ? 'Logging in...' : 'Login'}
          </Text>
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}