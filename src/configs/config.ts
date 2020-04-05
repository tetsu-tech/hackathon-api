export default () => ({
  app: {
    port: process.env.APP_PORT || 8080,
  },
  auth: {
    basicUser: process.env.BASIC_USER,
    basicPassword: process.env.BASIC_PASSWORD,
  },
  github: {
    githubUserName: process.env.GITHUB_USER_NAME,
    githubUserPassword: process.env.GITHUB_USER_PASSWORD,
    githubOrganizationName: process.env.GITHUB_ORGANIZATION_NAME,
    githubRepositoryName: process.env.GITHUB_REPOSITORY_NAME,
  },
  // TODO: configure
  mongo: {
    // port: process.env.DB_PORT,
    // host: process.env.DB_HOST,
    // name: process.env.DB_NAME
  }
})