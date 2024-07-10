"use client";
import React, { useEffect, useState } from "react";
import prisma from "@/lib/prisma";
import { useUser } from "@clerk/nextjs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

export default function CollectionList() {
  const { user } = useUser();

  // Use state to manage collections and loading state
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        if (user) {
          const fetchedCollections = await prisma.collection.findMany({
            where: {
              userId: user.id,
            },
          });
          setCollections(fetchedCollections);
        }
      } catch (error) {
        console.error("Error fetching collections:", error);
        // Handle error state or logging here
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [user]);

  if (!user) {
    return null; // Or handle loading state for user
  }

  if (loading) {
    return (
      <div className="mt-5">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <Alert>
        <AlertTitle>There are no collections yet</AlertTitle>
        <AlertDescription>Create a collection to get started</AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <h2>My Collections</h2>
      <ul>
        {collections.map((collection) => (
          <li key={collection.id}>{collection.name}</li>
        ))}
      </ul>
    </div>
  );
}
