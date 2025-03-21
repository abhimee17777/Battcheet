import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { User } from "@prisma/client";

import { authOptions } from "../../libs/auth";
import prismadb from "../../libs/prismadb";
import ConversationList from "../../components/ConversationList";
import EmptyState from "../../components/EmptyState";

export default async function ConversationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = session.user as User;

  const conversations = await prismadb.conversation.findMany({
    where: {
      participants: {
        some: {
          userId: user.id,
          leftAt: null,
        },
      },
    },
    include: {
      participants: {
        include: {
          user: true,
        },
      },
      messages: {
        include: {
          user: true,
          seenBy: true,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
      },
    },
    orderBy: {
      lastMessageAt: "desc",
    },
  });

  return (
    <div className="h-full">
      <div className="h-full">
        <div className="h-full flex lg:pl-80">
          <div className="h-full lg:pl-80 w-full lg:w-[450px] border-r border-gray-200">
            <ConversationList initialItems={conversations} />
          </div>
          <div className="hidden lg:block lg:pl-80 h-full">
            <EmptyState />
          </div>
        </div>
      </div>
    </div>
  );
} 