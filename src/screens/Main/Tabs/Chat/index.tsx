import React, { useCallback, useEffect, useState } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

export default function Example() {
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'היי אני מיכאל, איך אני יכול לעזור לך?',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'מיכאל',
          avatar:
            'https://doodleipsum.com/700/avatar-3?i=74943b7fc5a9da2affe8c2d8b8558812',
        },
        quickReplies: {
          type: 'radio', // or 'checkbox',
          keepIt: true,
          values: [
            {
              title: 'מהם היתרונות של מדיטציה?',
              value: 'benefits_of_meditation',
            },
            {
              title: 'זקוקים להכוונה עם מדיטציה',
              value: 'learn_to_meditate',
            },
            {
              title: 'למה המוח שלי כל כך עמוס במהלך מדיטציה?',
              value: 'busy_mind_during_meditation',
            },
          ],
        },
        image:
          'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExcmdybWwwbTNqMG5vaGwyemc3bTBxaTUzZGdtNnY1ZWM2bDhsbnJyYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/icUEIrjnUuFCWDxFpU/giphy.gif',
        sent: true,
        received: true,
        pending: true,
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const handleQuickReply = replies => {
    // Each reply is an object containing a 'title' and a 'value'
    const messagesToAdd = replies.map((reply, index) => ({
      _id: messages.length + index + 1, // Assign new, unique ids to these messages
      text: reply.title, // Use the title of the quickReply as the message text
      createdAt: new Date(),
      user: {
        _id: 1,
      },
    }));

    onSend(messagesToAdd);
  };

  return (
    <GiftedChat
      messages={messages}
      onQuickReply={handleQuickReply}
      onSend={messages => onSend(messages)}
      placeholder="הכנס הודעה..."
      user={{
        _id: 1,
      }}
    />
  );
}
