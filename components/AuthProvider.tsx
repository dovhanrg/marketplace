import { useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';
import { Provider } from 'react-redux';
import { store, persistor } from '@/store';
import { PersistGate } from 'redux-persist/integration/react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ReactNode } from 'react';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    // const segments = useSegments();
    // const router = useRouter();
    // const { token } = useAppSelector((state) => state.auth);

    // useEffect(() => {
    //     const inAuthGroup = segments[0] === '(auth)';

    //     if (!token && !inAuthGroup) {
    //         router.replace('/(auth)');
    //     } else if (token && inAuthGroup) {
    //         router.replace('/(tabs)');
    //     }
    // }, [token, segments]);
    console.log('AuthProvider', persistor.getState(), store.getState());

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
} 