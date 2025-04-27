import { Product } from '@/store/apiSlice';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { Text } from './Text';

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {

    const handlePress = () => {
        router.push(`/product/${product.id}`);
    }

    return (
        <Pressable onPress={handlePress}>
            <View className="bg-white dark:bg-gray-800 p-4 mb-4 rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)]">
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