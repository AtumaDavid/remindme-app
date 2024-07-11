// "use server";
// import { useUser } from "@clerk/nextjs";
// import { createCollectionSchemaType } from "../schema/createCollection";
// import prisma from "@/lib/prisma";

// export async function createCollection(form: createCollectionSchemaType) {
//   const { user } = useUser();
//   // const currentUser = await user

//   if (!user) {
//     throw new Error("user not found");
//   }

//   return await prisma.collection.create({
//     data: {
//       userId: user.id,
//       color: form.color,
//       name: form.name,
//     },
//   });
// }

"use server";

// "use server";

import { currentUser } from "@clerk/nextjs/server";
import { createCollectionSchemaType } from "../schema/createCollection";
import prisma from "@/lib/prisma";

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  if (!form.name || !form.color) {
    throw new Error("Name and color are required");
  }

  try {
    const newCollection = await prisma.collection.create({
      data: {
        userId: user.id,
        color: form.color,
        name: form.name,
      },
    });

    return newCollection;
  } catch (error) {
    console.error("Error creating collection:", error);
    throw new Error("Failed to create collection");
  }
}
