"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import prisma from "@/lib/prisma";
import { SignInButton, SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import { Collection } from "@prisma/client";
import { Suspense, useEffect, useState } from "react";
import CollectionList from "./CollectionList";

// export async function getServerSideProps() {
//   const collections = await prisma.collection.findMany();
//   return {
//     props: { collections },
//   };
// }
// export async function getServerSideProps(){
//   const collections = await prisma.collection.findMany
// }

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

// ...
// async function CollectionList() {
//   const { user } = useUser();
//   const collection = await prisma.collection.findMany({
//     where: {
//       userId: user?.id,
//     },
//   });

//   if (collection.length === 0) {
//     return (
//       <Alert>
//         <AlertTitle>There is no collection yet</AlertTitle>
//         <AlertDescription>Create a collection to get started</AlertDescription>
//       </Alert>
//     );
//   }
// }

// function CollectionList() {
//   const { user } = useUser();

//   // Ensure user is loaded before fetching collections
//   if (!user) {
//     return null; // Or handle loading state
//   }

//   // Use a state to manage collections and loading state
//   const [collections, setCollections] = useState<Collection[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   // Move useEffect to the top level of the component
//   useEffect(() => {
//     const fetchCollections = async () => {
//       try {
//         const fetchedCollections = await prisma.collection.findMany({
//           where: {
//             userId: user.id,
//           },
//         });
//         setCollections(fetchedCollections);
//       } catch (error) {
//         console.error("Error fetching collections:", error);
//         // Handle error state or logging here
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCollections();
//   }, [user]); // Ensure useEffect runs whenever user changes

//   // Now conditionally render based on loading and collections
//   if (loading) {
//     return (
//       <div className="mt-5">
//         <Skeleton className="w-[150px] h-[36px]" />
//         <Skeleton className="w-[150px] h-[36px]" />
//       </div>
//     );
//   }

//   if (collections.length === 0) {
//     return (
//       <Alert>
//         <AlertTitle>There is no collection yet</AlertTitle>
//         <AlertDescription>Create a collection to get started</AlertDescription>
//       </Alert>
//     );
//   }

//   return (
//     <div>
//       <h2>My Collections</h2>
//       <ul>
//         {collections.map((collection) => (
//           <li key={collection.id}>{collection.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }
