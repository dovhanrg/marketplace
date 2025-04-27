import { ProductCard } from '@/components/ProductCard';
import { productEntityAdapter, productEntitySelectors, useGetProductsQuery } from '@/store/apiSlice';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Text } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const { bottom } = useSafeAreaInsets();
  const [pageParams, setPageParams] = useState({ skip: 0, limit: 10 });

  const { data, isLoading, error, refetch, isUninitialized, currentData, isFetching, } = useGetProductsQuery(pageParams, {
    selectFromResult: ({ data, ...otherParams }) => ({
      data: {
        ...data,
        products: productEntitySelectors.selectAll(data?.products ?? productEntityAdapter.getInitialState()),
      },
      ...otherParams,
    }),
  });
  const products = data?.products ?? [];
  const total = data?.total ?? 0;

  const handleRefresh = () => {
    refetch();
  };

  return (
    <SafeAreaView
      style={{ paddingBottom: bottom }}
      className={`flex`}
    >
      {(isLoading || isUninitialized) && <ActivityIndicator className='justify-center items-center' size="large" />}
      {error && <Text>Error: {error?.message}</Text>}
      {products?.length > 0 && (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          onRefresh={handleRefresh}
          refreshing={isLoading}
          onEndReached={() => {
            if (products.length < total && !isFetching) {
              const nextSkip = pageParams.skip + pageParams.limit;
              setPageParams({ skip: nextSkip, limit: pageParams.limit });
            }
          }}
          onEndReachedThreshold={0.8}
          renderItem={({ item }) => (
            <ProductCard product={item} />
          )}
        />
      )}
    </SafeAreaView>
  );
}
