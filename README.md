## Experiment for Belief Eliciation

Web based experimentation for the belief elicitation, specifically quadratic and binarized scoring rules.

Joint project with [Mehmet Yiğit Gürdal](https://econ.boun.edu.tr/mehmet-yigit-gurdal-0) and [Tolga Umut Kuzubaş](https://econ.bogazici.edu.tr/tolga-umut-kuzubas).

## Setup
- `npm install`
- Setup env variables.
- `npx prisma generate`
- `npm run dev`

## Technologies Used

- **Next.js** as the **React** framework.
- Next.js **API routes** as the backend.
- **Prisma** as the ORM for migrations and database access.
- **PostgreSQL** as the database.
- **TypeScript** as the programming language.
- **Mantine** as the UI library.

## Details

Some introductory readings for the concepts.

- https://www.sciencedirect.com/science/article/abs/pii/S016726811400050X
- https://sites.pitt.edu/~alistair/papers/PSR_November.pdf
- https://www.sciencedirect.com/science/article/abs/pii/S0167268121002717
- https://academic.oup.com/restud/article-abstract/80/3/984/1573566

## Sources
- https://stackoverflow.com/questions/34189370/how-to-repeat-an-element-n-times-using-jsx-and-lodash
- https://blog.logrocket.com/effortless-database-schema-migration-prisma/
- https://reacthustle.com/blog/flatten-object-javascript-typescript
- https://codepen.io/mr-t77/pen/jRzmMZ

## What I learned
- This is the first **Next.js** app I completed.
- This is the first time I am using **Prisma**, and also **PostgreSQL**.
- For autoanimate to work as expected, the parent element needs to have a specified width.
- My first use case of ``Intl.ListFormat``.
- I learned that `new Date()` is not safe to use with Next.js outside of a useEffect call.