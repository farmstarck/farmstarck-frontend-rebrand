"use client"

import { useRouter } from "next/navigation"

export const useNavigate = () => {
  const router = useRouter()

  const navigate = (route: string) => {
    router.push(route)
  }

  return { navigate }
}
