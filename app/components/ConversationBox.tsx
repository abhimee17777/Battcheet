'use client';

import React from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { Conversation, Message, User } from '@prisma/client';

interface ConversationBoxProps {
  data: Conversation & {
    participants: { user: User }[];
    messages: (Message & {
      user: User;
      seenBy: User[];
    })[];
  };
  selected?: boolean;
  onClick: () => void;
}

const ConversationBox: React.FC<ConversationBoxProps> = ({
  data,
  selected,
  onClick,
}) => {
  const session = useSession();
  const otherUser = data.participants.find(
    (participant) => participant.user.email !== session.data?.user?.email
  );

  const lastMessage = data.messages[0];

  const lastMessageText = lastMessage?.content || 'Started a conversation';
  const lastMessageTime = lastMessage?.createdAt
    ? format(new Date(lastMessage.createdAt), 'p')
    : '';

  return (
    <div
      onClick={onClick}
      className={clsx(
        'w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer',
        selected ? 'bg-neutral-100' : 'bg-white'
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.isGroup ? data.name : otherUser?.user.name}
            </p>
            {lastMessage?.createdAt && (
              <p className="text-xs text-gray-400 font-light">{lastMessageTime}</p>
            )}
          </div>
          <p className="truncate text-sm text-gray-500">{lastMessageText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConversationBox; 