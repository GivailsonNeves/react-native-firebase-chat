import { Message } from "@/models";
import { chatIdExtractMembers } from "@/utils";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import { useEffect, useState } from "react";

export function useChatMessage({
  chatId,
  userId,
}: {
  chatId: string;
  userId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const subscriber = firestore()
      .collection(`chats/${chatId}/messages`)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _messages: Message[] = [];

        querySnapshot.forEach((documentSnapshot) => {
          _messages.push({
            createdAt: documentSnapshot.data().createdAt?.toDate(),
            id: documentSnapshot.id,
            text: documentSnapshot.data().text,
            isSender: documentSnapshot.data().senderId === userId,
            liked: documentSnapshot.data().liked,
            photoUrl: documentSnapshot.data().photoUrl,
          });
        });

        setMessages(_messages);
      });

    return () => subscriber();
  }, [userId]);

  const sendMessage = async (message: Pick<Message, "text" | "photoUrl">) => {
    let photoUrl = "";
    setIsSending(true);
    try {
      if (message.photoUrl) {
        const reference = storage().ref(`images/${new Date().getTime()}`);
        await reference.putFile(message.photoUrl);
        photoUrl = await reference.getDownloadURL();
      }

      const chat = await firestore().collection(`chats`).doc(chatId).get();

      if (!chat.exists) {
        await firestore()
          .collection("chats")
          .doc(chatId)
          .set({
            createdAt: firestore.FieldValue.serverTimestamp(),
            participants: chatIdExtractMembers(chatId),
          });
      }

      return firestore()
        .collection(`chats/${chatId}/messages`)
        .add({
          ...message,
          createdAt: firestore.FieldValue.serverTimestamp(),
          senderId: userId,
          photoUrl,
        });
    } catch (error) {
      throw error;
    } finally {
      setIsSending(false);
    }
  };

  const toggleFavorite = async (messageId: string) => {
    const message = messages.find((message) => message.id === messageId);
    if (message) {
      await firestore()
        .collection(`chats/${chatId}/messages`)
        .doc(messageId)
        .update({
          liked: !message.liked,
        });
    }
  };

  return { messages, sendMessage, toggleFavorite, isSending };
}
