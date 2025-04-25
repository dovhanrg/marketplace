import { IconSymbol } from '@/components/ui/IconSymbol';
import { useAppSelector } from '@/hooks/useAppSelector';
import { RootState } from '@/store';
import { useGetProductQuery } from '@/store/apiSlice';
import { toggleFavorite } from '@/store/favoritesSlice';
import { useLocalSearchParams } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export default function ProductScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { data: product, isLoading, error } = useGetProductQuery(Number(id));
    const dispatch = useDispatch();
    const isFavorite = useAppSelector((state: RootState) => state.favorites.products?.some(item => item == Number(id)));

    const handleFavoritePress = () => {
        dispatch(toggleFavorite(Number(id)));
    };

    return (
        <View className='flex-1 bg-white'>
            {isLoading && <Text>Loading...</Text>}
            {error && <Text>Error loading product</Text>}
            {product && (
                <View className="p-4">
                    <View className="flex-row justify-between items-start">
                        <Text className="text-2xl font-bold dark:text-white flex-1">{product.title}</Text>
                        <Pressable onPress={handleFavoritePress} className="ml-2">
                            <IconSymbol
                                name={isFavorite ? "star.fill" : "star"}
                                size={24}
                                color={isFavorite ? "#FFD700" : "#A0AEC0"}
                            />
                        </Pressable>
                    </View>
                    <Text className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</Text>
                    <Text className="text-xl font-bold text-green-600 dark:text-green-400 mt-4">
                        ${product.price.toFixed(2)}
                    </Text>
                </View>
            )}
        </View>
    );
} 