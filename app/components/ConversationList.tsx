'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Conversation, Message, User } from '@prisma/client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import ConversationBox from './ConversationBox';

interface ConversationListProps {
  initialItems: (Conversation & {
    participants: {
      user: User;
    }[];
    messages: (Message & {
      user: User;
      seenBy: User[];
    })[];
  })[];
}

const ConversationList: React.FC<ConversationListProps> = ({ initialItems }) => {
  const router = useRouter();
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState('');

  const filteredConversations = items.filter((item) =>
    item.participants.some((participant) =>
      participant.user.name?.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex-col">
          <div className="text-2xl font-bold text-neutral-800 py-4">Messages</div>
        </div>
        <div className="mb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations"
              className="form-input block w-full pl-10 sm:text-sm sm:leading-5 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        {filteredConversations.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            selected={false}
            onClick={() => router.push(`/conversations/${item.id}`)}
          />
        ))}
      </div>
    </aside>
  );
};

export default ConversationList; 