import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define route matchers
const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/']); // Mark homepage as public
const isProtectedRoute = createRouteMatcher(['/myKanban(.*)']); // Define protected routes

// Single middleware to handle both cases
export default clerkMiddleware(async (auth, req) => {
  if (isPublicRoute(req)) {
    // Allow public routes without authentication
    return;
  }

  if (isProtectedRoute(req)) {
    // Protect protected routes
    await auth.protect();
  }
});

// Configuration to skip unnecessary checks
export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};






// import { auth, clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// // Create a route matcher for protected routes
// const isProtectedRoute = createRouteMatcher(["/myKanban(.*)", "/projects(.*)",]);

// export default clerkMiddleware(async (auth, req) => {
//   if (isProtectedRoute(req)) {
//     await auth.protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }
