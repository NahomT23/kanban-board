import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <SignUp fallbackRedirectUrl="/onBoarding"/>
      </div>
    </div>
  )
}