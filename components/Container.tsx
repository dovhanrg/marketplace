import { PropsWithChildren } from "react";
import { type ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

interface ContainerProps extends PropsWithChildren {
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    const { top, bottom, left, right } = useSafeAreaInsets();
    return (
        <SafeAreaView
            // style={{ paddingBottom: bottom }}
            className={`flex border-2 border-red-500 ${className}`}
        >
            {children}
        </SafeAreaView>
    );
}