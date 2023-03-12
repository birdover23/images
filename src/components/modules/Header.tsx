import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons"
import { Box, Flex, Text } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"

import { SITE_NAME } from "../../constants"

interface MenuItemProps {
  children: React.ReactNode
  isLast?: boolean
  to: string
}

const MenuItem: React.FC<MenuItemProps> = ({ children, isLast, to = "/" }) => {
  return (
    <Text
      mb={{ base: isLast ? 0 : 8, sm: 0 }}
      mr={{ base: 0, sm: isLast ? 0 : 8 }}
      display="block"
      data-cy="nav-item"
    >
      <Link href={to}>{children}</Link>
    </Text>
  )
}

export const Header: React.FC = () => {
  const [show, setShow] = useState(false)
  const toggleMenu = () => setShow(!show)
  return (
    <Flex
      mb={8}
      p={8}
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
    >
      <Box w="200px">
        <Text fontSize="lg" fontWeight="bold">
          <Link href="/">
            <a data-cy="site-name">{SITE_NAME}</a>
          </Link>
        </Text>
      </Box>

      <Box display={{ base: "block", md: "none" }} onClick={toggleMenu}>
        {show ? <CloseIcon /> : <HamburgerIcon />}
      </Box>

      <Box
        display={{ base: show ? "block" : "none", md: "block" }}
        flexBasis={{ base: "100%", md: "auto" }}
      >
        <Flex
          align="center"
          justify={["center", "space-between", "flex-end", "flex-end"]}
          direction={["column", "row", "row", "row"]}
          pt={[4, 4, 0, 0]}
        >
          {/*
          <MenuItem to="/">Home</MenuItem>
          <MenuItem to="/illustration">Illustration</MenuItem>
          <MenuItem to="/blog">Blog</MenuItem>
          <MenuItem to="/about">About</MenuItem>
          <MenuItem to="/contact" isLast>
            Contact
          </MenuItem>
          */}
        </Flex>
      </Box>
    </Flex>
  )
}
