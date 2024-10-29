export type Route = {
  text: string
  link: string
  linkTitle: string
}

export type Teammate = {
  name: string
  about: string
  imageAlt: string
  imageSrc: string
}

export type SectionCtaProps = {
  list: Route[]
}

export type SectionTeamProps = {
  list: Teammate[]
}
