import { Box, Flex, VStack } from "@chakra-ui/layout"
import { Heading, Text } from "@chakra-ui/react"
import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next"
import { useRouter } from "next/router"
import { NextSeo } from "next-seo"

import { BreadCrumb } from "../../components/elements/BreadCrumb"
import { DefaultLayout } from "../../components/layouts/DefaultLayout"
import { SITE_URL } from "../../constants"
import { BlogResponse } from "../../types/blog"
import { client } from "../../utils/api"
import { formatDate } from "../../utils/date"

type StaticProps = {
  post: BlogResponse
}
type PageProps = InferGetStaticPropsType<typeof getStaticProps>

export const toStringId = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value[0]
  }

  return value
}

const Blog: NextPage<PageProps> = (props) => {
  const { post } = props
  const title = post.title
  const description = post.description
  const url = `${SITE_URL}/blog/${post.id}`
  const breadCrumbItems = [
    { text: "Home", path: "/", isCurrentPage: false },
    { text: "Blog", path: "/blog/", isCurrentPage: false },
    { text: title, path: `/blog/${post.id}`, isCurrentPage: true },
  ]
  const router = useRouter()
  if (router.isFallback) {
    return <Box>Loading...</Box>
  }

  return (
    <DefaultLayout>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <Flex maxW="container.xl" justify="center">
        <Box w="container.md">
          <VStack>
            <Heading>{title}</Heading>
            <Flex>
              <Text fontSize="sm" p={2}>
                {formatDate(post.publishedAt)}
              </Text>
              <Text fontSize="sm" p={2}>
                {post.category.name}
              </Text>
            </Flex>

            <text dangerouslySetInnerHTML={{ __html: post.body }} />
          </VStack>
        </Box>
      </Flex>
      <Flex maxW="container.xl" justify="center" p={4}>
        <BreadCrumb items={breadCrumbItems} />
      </Flex>
    </DefaultLayout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    fallback: "blocking",
    paths: [],
  }
}

export const getStaticProps: GetStaticProps<StaticProps> = async (context) => {
  const { params } = context
  if (!params?.id) {
    throw new Error("Error: ID not found")
  }
  const id = toStringId(params.id)
  const post = await client.blog._id(id).$get()
  return {
    props: { post },
    revalidate: 60,
  }
}
export default Blog
