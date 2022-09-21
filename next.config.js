/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    NEXT_APP_Humans_Node_Provider1: process.env.NEXT_APP_Humans_Node_Provider1,
    NEXT_APP_Humans_Node_Provider1_Query: process.env.NEXT_APP_Humans_Node_Provider1_Query,
    NEXT_APP_CLUSTER: process.env.NEXT_APP_CLUSTER,
    NEXT_APP_ETHEREUM_POOL_ADDRESS: process.env.NEXT_APP_ETHEREUM_POOL_ADDRESS,
    NEXT_APP_Ethereum_USDK_Token_Address: process.env.NEXT_APP_Ethereum_USDK_Token_Address,
    NEXT_APP_HUMAN_POOL_ADDRESS: process.env.NEXT_APP_HUMAN_POOL_ADDRESS,
  }
}

module.exports = nextConfig
