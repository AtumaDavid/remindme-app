import CollectionCard from "@/components/CollectionCard";
import CreateCollectionBtn from "@/components/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { RedirectToSignIn, useAuth } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomMsg />
      </Suspense>
      <Suspense fallback={<div>Loading collections...</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomMsg() {
  const user = await currentUser();

  if (!user) {
    return null; // Return null instead of an error div
  }

  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName} {user.lastName}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[180px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </h1>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();

  if (!user) {
    console.log("No user found, redirecting to sign in");
    return <RedirectToSignIn />;
  }

  try {
    console.log(`Fetching collections for user ${user.id}`);
    const collections = await prisma.collection.findMany({
      include: {
        tasks: true,
      },
      where: {
        userId: user.id,
      },
    });
    console.log(`Found ${collections.length} collections`);

    if (collections.length === 0) {
      return (
        <div className="flex flex-col gap-5">
          <Alert>
            <AlertTitle>There are no collections yet!</AlertTitle>
            <AlertDescription>
              Create a collection to get started
            </AlertDescription>
          </Alert>
          <CreateCollectionBtn />
        </div>
      );
    }

    return (
      <>
        <CreateCollectionBtn />
        <div className="flex flex-col gap-4 mt-6">
          {collections.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error fetching collections: ", error);

    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === "object" && "message" in error) {
      errorMessage = String(error.message);
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return <div>Error fetching collections: {errorMessage}</div>;
  }
}

// second
// import CollectionCard from "@/components/CollectionCard";
// import CreateCollectionBtn from "@/components/CreateCollectionBtn";
// // import SadFace from "@/components/icons/SadFace";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import { prisma } from "@/lib/prisma";
// import { currentUser } from "@clerk/nextjs/server";
// import { Suspense } from "react";

// export default async function Home() {
//   return (
//     <>
//       <Suspense fallback={<WelcomeMsgFallback />}>
//         <WelcomMsg />
//       </Suspense>
//       <Suspense fallback={<div>Loading collections...</div>}>
//         <CollectionList />
//       </Suspense>
//     </>
//   );
// }

// async function WelcomMsg() {
//   const user = await currentUser();

//   if (!user) {
//     return <div>error</div>;
//   }

//   return (
//     <div className="flex w-full mb-12">
//       <h1 className="text-4xl font-bold">
//         Welcome, <br /> {user.firstName} {user.lastName}
//       </h1>
//     </div>
//   );
// }

// function WelcomeMsgFallback() {
//   return (
//     <div className="flex w-full mb-12">
//       <h1 className="text-4xl font-bold">
//         <Skeleton className="w-[180px] h-[36px]" />
//         <Skeleton className="w-[150px] h-[36px]" />
//       </h1>
//     </div>
//   );
// }

// async function CollectionList() {
//   const user = await currentUser();
//   const collections = await prisma.collection.findMany({
//     include: {
//       tasks: true,
//     },
//     where: {
//       userId: user?.id,
//     },
//   });

//   if (collections.length === 0) {
//     return (
//       <div className="flex flex-col gap-5">
//         <Alert>
//           {/* <SadFace /> */}
//           <AlertTitle>There are no collections yet!</AlertTitle>
//           <AlertDescription>
//             Create a collection to get started
//           </AlertDescription>
//         </Alert>
//         <CreateCollectionBtn />
//       </div>
//     );
//   }

//   return (
//     <>
//       <CreateCollectionBtn />
//       <div className="flex flex-col gap-4 mt-6">
//         {collections.map((collection) => (
//           <CollectionCard key={collection.id} collection={collection} />
//         ))}
//       </div>
//     </>
//   );
// }
