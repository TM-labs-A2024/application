import { Link } from '@chakra-ui/next-js'
import NextLink from 'next/link'
import { ReactNode } from 'react'

export default function LinkComponent({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      as={NextLink}
      href={href}
      color="green.400"
      _hover={{ color: 'green.700' }}
      data-testid="link-component"
    >
      {children}
    </Link>
  )
}
