import { Button } from 'react-native';

import { logout } from '@/store/authSlice';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function TabTwoScreen() {
    const dispatch = useDispatch();

    return (
        <SafeAreaView className="items-start">
            <Button title="Logout" onPress={() => {
                dispatch(logout());
                router.replace('/(auth)');
            }} />
        </SafeAreaView>
    );
}