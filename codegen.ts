import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://api1.bestellgastro.de/graphql",
  documents: ["./src/**/*.{ts,tsx,gql,graphql}"],
  ignoreNoDocuments: true,
  hooks: { afterAllFileWrite: ["prettier --write"] },
  generates: {
    "./src/graphql/generated/": {
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
};

export default config;
