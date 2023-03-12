import { GetStaticProps, InferGetStaticPropsType, NextPage } from "next"
import { NextSeo } from "next-seo"

import { DefaultLayout } from "../components/layouts/DefaultLayout"
import { ImageGallery } from "../components/modules/ImageGallery"
import { SITE_URL } from "../constants"
import { IllustrationsResponse } from "../types/illustrations"
import { client } from "../utils/api"

const url = `${SITE_URL}/illustration`
const title = "Illustration"
const description = "作品一覧"

type StaticProps = {
  illustrations: IllustrationsResponse
}
type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const Illustration: NextPage<PageProps> = (props) => {
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
      <ImageGallery illustrations={props.illustrations.contents} />
    </DefaultLayout>
  )
}

export const getStaticProps: GetStaticProps<StaticProps> = async () => {
  const illustrations = await client.illustrations.$get({
    query: { orders: "-posted_at", limit: 100 },
  })
  return {
    props: {
      illustrations,
    },
    revalidate: 60,
  }
}

export default Illustration
