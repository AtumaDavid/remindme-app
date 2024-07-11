## A Remind Me app

## Table of Contents

- [A Remind Me app](#a-remind-me-app)
- [Table of Contents](#table-of-contents)
- [Technologies](#technologies)
- [Techniques](#techniques)

## Technologies

- clerk
- shadcn-ui
- next-themes (npm i next-themes)
- prisma
  - npm i @prisma/client
  - npx prisma init --datasource-provider sqlite
  - npx prisma migrate dev
  - npx prisma studio
- React hook form (npm i react-hook-form)
- zod: For form Validation/ API validation

## Techniques

- Server Actions to create Collections in database (root directory: `actions/collection.ts`)
