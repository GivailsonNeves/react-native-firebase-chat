import { Message } from "@/models";
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
            visualized: documentSnapshot.data().visualized,
            liked: documentSnapshot.data().liked,
          });
        });

        setMessages(_messages);
      });

    return () => subscriber();
  }, [userId]);

  const sendMessage = async (message: Pick<Message, "text" | "photoUrl">) => {
    let photoUrl = undefined;
    console.log(message);
    try {
      if (message.photoUrl) {
        const reference = storage().ref(`images/${new Date().getTime()}`);
        await reference.putFile(message.photoUrl);
        photoUrl = await reference.getDownloadURL();
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
      console.error(error);
    }
  };

  return { messages, sendMessage };
}
