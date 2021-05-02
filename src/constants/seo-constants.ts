export const getURL = (): string => {
  const url =
    process?.env?.URL && process.env.URL !== ''
      ? process.env.URL
      : process?.env?.VERCEL_URL && process.env.VERCEL_URL !== ''
        ? process.env.VERCEL_URL
        : 'http://localhost:3000'
  return url.includes('http') ? url : `https://${url}`
}

const DEFAULT_TITLE = ''
const DEFAULT_TITLE_TEMPLATE = 'Cowin | %s'
const DEFAULT_DESCRIPTION = 'Easily check available slots for 18+ in nearby vaccination centers'
const DEFAULT_CANONICAL = getURL()
const SITE_NAME = 'Cowin'
// const DEFAULT_OG_IMAGE = `${DEFAULT_CANONICAL}/preview.png`
const DEFAULT_OG_IMAGE = "https://og-image.vercel.app/Easily%20check%20available%20slots%20for%2018%2B%20in%20nearby%20vaccination%20centers.png?theme=dark&md=1&fontSize=100px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fvercel-triangle-white.svg"
const TWITTER_HANDLE = '@bhimtebhaisaab'
const TWITTER_CARD_TYPE = 'summary_large_image'
const FAVICON_LINK = '/favicon.ico'

export const SEO = {
  DEFAULT_TITLE,
  DEFAULT_TITLE_TEMPLATE,
  DEFAULT_DESCRIPTION,
  DEFAULT_CANONICAL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
  TWITTER_CARD_TYPE,
  FAVICON_LINK,
}
