import { Product } from '@/store/apiSlice';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { toggleFavorite } from '../store/favoritesSlice';
import { Text } from './Text';
import { IconSymbol } from './ui/IconSymbol';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.products);
    const isFavorite = favorites.includes(product.id);

    const handleFavoritePress = () => {
        dispatch(toggleFavorite(product.id));
    };

    return (
        <Pressable onPress={() => router.push(`/product/${product.id}`)}>
            <View className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
                {/* <Text className="text-2xl font-bold dark:text-white flex-1">{product.title}</Text> */}
                <Text className="text-lg font-bold dark:text-white">{product.title}</Text>
                <Text className="text-gray-600 dark:text-gray-300 mt-2">{product.description}</Text>
                <View className="flex-row justify-between mt-4">
                    <Text className="text-green-600 dark:text-green-400 font-bold">
                        ${product.price.toFixed(2)}
                    </Text>
                    <Text className="text-gray-500 dark:text-gray-400">
                        Stock: {product.stock}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
} 