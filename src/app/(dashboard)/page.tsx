"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { SignInButton, useUser } from "@clerk/nextjs";
import { Suspense } from "react";
import CollectionList from "./CollectionList";

export default function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense>
        <CollectionList />
      </Suspense>
    </>
  );
}

function WelcomeMsg() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <WelcomeMsgFallback />;
  }

  if (!isSignedIn) {
    return (
      <div>
        <p>You are not signed in. Please sign in to access the home page.</p>
        <SignInButton />
      </div>
    );
  }

  return (
    <div>
      Welcome, <br /> {user?.firstName} {user?.lastName}
    </div>
  );
}

function WelcomeMsgFallback() {
  // return <div>Loading...</div>;
  return (
    <div className="gap-5 flex flex-col">
      <Skeleton className="w-[150px] h-[36px]" />
      <Skeleton className="w-[150px] h-[36px]" />
    </div>
  );
}
