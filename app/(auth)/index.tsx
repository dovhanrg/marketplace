import { Button } from '@/components/Button';
import { Text } from '@/components/Text';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useLoginMutation } from '@/store/apiSlice';
import { setCredentials } from '@/store/authSlice';
import * as Notifications from 'expo-notifications';
import { Redirect, router } from 'expo-router';
import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const { token } = useAppSelector((state) => state.auth);
    const passwordInputRef = useRef<TextInput>(null);

    const onEmailChangeEnd = useCallback(() => passwordInputRef.current?.focus(), []);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await login({ username: email, password }).unwrap();

            dispatch(setCredentials({
                token: result.accessToken,
                user: {
                    id: result.id,
                    email: result.email,
                    firstName: result.firstName,
                    lastName: result.lastName,
                    image: result.image,
                    username: result.username
                }
            }));

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Welcome back!',
                    body: 'You have successfully logged in.',
                },
                trigger: null,
            });

            router.replace('/(tabs)/(home)');
        } catch (error) {
            Alert.alert('Login error', 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    if (token) {
        return <Redirect href="/(tabs)/(home)" />;
    }

    return (
        <>
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
                        onSubmitEditing={onEmailChangeEnd}
                    />

                    <TextInput
                        ref={passwordInputRef}
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
        </>
    );
}