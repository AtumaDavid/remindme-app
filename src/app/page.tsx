import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main>
      <SignedOut>
        <div>
          <p>You are not signed in. Please sign in to access the home page.</p>
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div>
          <UserButton />
          <p>Welcome to the Home Page</p>
        </div>
      </SignedIn>
    </main>
  );
}
