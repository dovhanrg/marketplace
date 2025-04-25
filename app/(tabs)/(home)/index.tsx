import { ProductCard } from '@/components/ProductCard';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetProductsQuery } from '@/store/apiSlice';
import { resetProducts, setProducts } from '@/store/productsSlice';
import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [pageParams, setPageParams] = useState({ skip: 0, limit: 10 });
  const dispatch = useDispatch();
  const { items, total, isLoading: storeLoading } = useAppSelector((state) => state.products);

  const { data, isLoading, error, refetch } = useGetProductsQuery(pageParams);

  useEffect(() => {
    if (data) {
      dispatch(setProducts({
        products: data.products,
        total: data.total,
        skip: data.skip,
        limit: data.limit,
      }));
    }
  }, [data, dispatch]);

  const handleRefresh = () => {
    dispatch(resetProducts());
    setPageParams({ skip: 0, limit: 10 });
  };

  return (
    <SafeAreaView
      style={{ paddingBottom: bottom }}
      className={`flex border-2 border-red-500`}
    >
      {(isLoading || storeLoading) && <ActivityIndicator className='justify-center items-center' size="large" />}
      {error && <Text>Error: {error?.message}</Text>}
      {items.length > 0 && (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          onEndReached={() => {
            if (items.length < total) {
              const nextSkip = pageParams.skip + pageParams.limit;
              setPageParams({ skip: nextSkip, limit: pageParams.limit });
            }
          }}
          onEndReachedThreshold={1}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
