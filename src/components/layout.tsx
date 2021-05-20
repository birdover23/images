import { Container } from "@chakra-ui/layout"
import { motion } from "framer-motion"
import React from "react"

import Footer from "../components/footer"
import Header from "../components/header"

const Layout: React.FC = ({ children }): React.ReactElement => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <Container maxW="container.xl">
      <Header />
      {children}
      <Footer />
    </Container>
  </motion.div>
)

export default Layout
