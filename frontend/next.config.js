// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/coffee",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["localhost"],
  },
};
