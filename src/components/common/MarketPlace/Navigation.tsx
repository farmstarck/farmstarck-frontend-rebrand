"use client"
import { ChevronRightIcon } from "lucide-react"
import Link from "next/link"

interface Crumb {
  name: string
  href: string
}

interface NavigationProps {
  routes: Crumb[]
  forward?: boolean
}

const Navigation = ({ routes, forward = false }: NavigationProps) => {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600">

      {/* First link ALWAYS Home */}
      <Link href="/market/marketplace" className="text-primary font-medium">
        Home
      </Link>

      {/* Loop through all passed routes */}
      {routes.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <ChevronRightIcon className="text-dark-green " />
          <Link
            href={index === routes.length - 1 && !forward ? "" : index === routes.length - 1 && forward ? item.href : item.href}
            className={`capitalize ${index === routes.length - 1
              ? "text-dark"
              : "text-primary"
              }`}
          >
            {item.name}
          </Link>
        </div>
      ))}

    </nav>
  )
}

export default Navigation
