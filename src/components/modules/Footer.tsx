import { Box, Stack, Text, TextProps } from "@chakra-ui/layout"
import { ButtonGroup, ButtonGroupProps, IconButton } from "@chakra-ui/react"
import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"
import { SiPixiv } from "react-icons/si"

import { AUTHOR_NAME } from "../../constants"

const Copyright: React.FC<TextProps> = (props) => (
  <Text fontSize="sm" {...props}>
    &copy; {new Date().getFullYear()} {AUTHOR_NAME} All rights reserved.
  </Text>
)

export const SocialMediaLinks: React.FC<ButtonGroupProps> = (props) => (
  <ButtonGroup variant="ghost" color="gray.600" {...props}>
    <IconButton
      as="a"
      href="https://twitter.com/kk6"
      aria-label="Twitter"
      icon={<FaTwitter fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://pixiv.me/ashiyahiro"
      aria-label="Pixiv"
      icon={<SiPixiv fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://github.com/kk6"
      aria-label="GitHub"
      icon={<FaGithub fontSize="20px" />}
    />
    <IconButton
      as="a"
      href="https://instagram.com/__kk6__"
      aria-label="Instagram"
      icon={<FaInstagram fontSize="20px" />}
    />
  </ButtonGroup>
)

export const Footer: React.FC = () => (
  <Box
    as="footer"
    role="contentinfo"
    mx="auto"
    maxW="7xl"
    py="12"
    px={{ base: "4", md: "8" }}
  >
    <Stack direction="row" alignItems="center" justify="space-between">
      {/*
      <Copyright alignSelf={{ base: "center", sm: "start" }} />
      <SocialMediaLinks />  */}
    </Stack>
  </Box>
)
