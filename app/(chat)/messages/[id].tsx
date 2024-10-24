import { useSession, useUsersContext } from "@/app/context";
import { MessageBox, MessageForm } from "@/components";
import { useAppTheme } from "@/hooks";
import { useChatMessage } from "@/hooks/useChatMessage";
import { extractNameFromEmail } from "@/utils";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Keyboard,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from "react-native";
import { useKeyboardHandler } from "react-native-keyboard-controller";
import { Appbar, FAB, Snackbar } from "react-native-paper";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const PADDING_BOTTOM = 0;

const useGradualAnimation = () => {
  const height = useSharedValue(0);

  useKeyboardHandler({
    onMove: (event) => {
      "worklet";
      height.value = Math.max(event.height, PADDING_BOTTOM);
    },
    onEnd: (e) => {
      "worklet";
      height.value = e.height;
    },
  });
  return { height };
};

export default function MessagesPage() {
  const router = useRouter();

  const listRef = useRef<FlatList>(null);
  const [_, requestPermission] = ImagePicker.useCameraPermissions();
  const [error, setError] = useState("");

  const { colors } = useAppTheme();

  const { user } = useSession();
  const { findUser } = useUsersContext();
  const { id, chatId } = useLocalSearchParams();

  const [isExtended, setIsExtended] = useState(false);

  const { messages, sendMessage, toggleFavorite, isSending } = useChatMessage({
    chatId: String(chatId),
    userId: user?.uid || "",
  });

  const { height } = useGradualAnimation();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const recipe = useMemo(() => {
    return findUser(String(id));
  }, [id, findUser]);

  const keyboardSpacer = useAnimatedStyle(() => {
    return {
      height: Math.abs(height.value),
      marginBottom: height.value > 0 ? 0 : PADDING_BOTTOM,
    };
  });

  const onScroll = ({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition > 200);
  };

  const handleScrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const _goBack = () => router.back();

  const handleSubmit = async (text: string, photoUrl: string) => {
    try {
      await sendMessage({ text, photoUrl });
      Keyboard.dismiss();
    } catch (_) {
      setError("Error while sending message");
    }
  };

  const handleToggleFavorite = async (id: string) => {
    try {
      await toggleFavorite(id);
    } catch (_) {
      setError("Error while toggling favorite");
    }
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          height: Dimensions.get("window").height,
          flexDirection: "column",
        }}
      >
        <Appbar.Header
          mode="small"
          style={{
            backgroundColor: colors.surfaceVariant,
          }}
        >
          <Appbar.BackAction onPress={_goBack} />
          <Appbar.Content title={extractNameFromEmail(recipe?.email)} />
        </Appbar.Header>
        <FlatList
          ref={listRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBox
              message={item}
              onDoubleTap={() => handleToggleFavorite(item.id)}
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listInner}
          onScroll={onScroll}
          keyboardDismissMode="on-drag"
          inverted
        />
        <FAB
          icon="chevron-down"
          style={styles.fab}
          size="small"
          visible={isExtended}
          onPress={handleScrollToTop}
        />
        <MessageForm onSubmit={handleSubmit} isSending={isSending} />
        <Animated.View style={keyboardSpacer} />
      </View>
      <Snackbar
        visible={!!error}
        onDismiss={() => setError("")}
        duration={3000}
        action={{
          label: "Close",
          onPress: () => setError(""),
        }}
      >
        {error}
      </Snackbar>
    </>
  );
}

const styles = StyleSheet.create({
  listInner: {
    padding: 8,
    gap: 8,
  },
  fab: {
    position: "absolute",
    margin: 16,
    opacity: 0.8,
    right: 0,
    bottom: 90,
  },
});
