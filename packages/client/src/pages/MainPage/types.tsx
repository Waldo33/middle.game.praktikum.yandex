export type Route = {
  text: string
  link: string
  linkTitle: string
}

export type Rule = {
  imageSrc: string
  imageAlt: string
  text: string
}

export type Teammate = {
  name: string
  about: string
  imageAlt: string
  imageSrc: string
}

export type SectionRulesProps = {
  list: Rule[]
}

export type SectionCtaProps = {
  list: Route[]
}

export type SectionTeamProps = {
  list: Teammate[]
}
