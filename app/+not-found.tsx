import { Link, Stack } from 'expo-router';
import React from 'react';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <ThemedView className='flex-1 items-center justify-center p-4'>
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        <Link href="/" className='mt-15 p-15'>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}


