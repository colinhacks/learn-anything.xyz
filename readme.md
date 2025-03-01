# [Learn-Anything.xyz](https://learn-anything.xyz)

> Organize world's knowledge, explore connections and curate learning paths

<!-- See [learn-anything.xyz/about](https://learn-anything.xyz/about) for what problems LA is trying to solve. -->

###### Contents

- [File structure](#file-structure) - make sense of how code is laid out in the repo
- [Setup](#setup) - get started with development
    - [Setup EdgeDB](#setup-edgedb)
- [Run GraphQL server (Grafbase)](#run-graphql-server-grafbase)
- [Run website (Solid)](#run-website-solid)
- [Run desktop app (Tauri/Rust)](#run-desktop-app-taurirust)
- [Contribute](#contribute) - contribute to project effectively
- [Docs](#docs)

Current tasks to do are in [docs/todo.md](docs/todo.md) (sorted by priority).

Ask questions on [Discord](https://discord.com/invite/bxtD8x6aNF) if interested in developing the project or you get issues with setup.

## File structure

Tech stack is described in [docs/tech-stack.md](docs/tech-stack.md).

- [app](app) - desktop app in Tauri/Solid
- [docs](docs) - all the docs
- [edgedb](edgedb) - [EdgeDB](https://www.edgedb.com/) used as main server database
  - [dbschema](edgedb/dbschema)
    - [default.esdl](edgedb/dbschema/default.esdl) - [EdgeDB schema](https://www.edgedb.com/docs/intro/schema) definining all the models and relations
    - [migrations](edgedb/dbschema/migrations) - migration files get generated after running `bun db:migrate`
  - [client.ts](edgedb/client.ts) - exports client to connect with EdgeDB
  - [topic.ts](edgedb/topic.ts) / [user.ts](api/edgedb/user.ts) - CRUD functions on models
- [grafbase](grafbase) - [Grafbase](https://grafbase.com/) provides GraphQL API layer for all server functions like talking with DB
  - [resolvers](grafbase/resolvers) - [edge resolvers](https://grafbase.com/docs/edge-gateway/resolvers) are server functions exposed with GraphQL
  - [grafbase.config.ts](grafbase/grafbase.config.ts) - [Grafbase's config](https://grafbase.com/docs/config)
- [lib](lib) - shared utility functions
- [test](test) - test cases (useful for itereating quickly)
- [website](website) - learn-anything.xyz website code in Solid
  - [components](website/components) - solid components
  - [routes](website/src/routes) - routes defined using file system

## Setup

Everything is driven using [bun](https://bun.sh) commands as part of monorepo setup using [bun workspaces](https://bun.sh/docs/install/workspaces).

First run:

```
bun i
bun dev-setup
```

`bun dev-setup` will `git clone` [seed repo](https://github.com/learn-anything/seed). It's needed for some commands below to work.

### Setup EdgeDB

> **Warning**
> instructions might break, will be reviewed before first LA public release

Install EdgeDB by running `curl ..` command from [EdgeDB](https://www.edgedb.com) website. It is used as main server database.

Then run:

```
bun db:init
```

Follow instructions, name EdgeDB instance `learn-anything`.

Run `edgedb ui`. This will open EdgeDB graphical interface where you can run queries or explore the schema.

Run below command to apply the schema defined in [default.esdl](db/dbschema/default.esdl) on your local DB:

```
bun db:watch
```

Then, generate [EdgeDB TS](https://github.com/edgedb/edgedb-js) bindings with:

```
bun db:ts-generate
```

<!-- ### Seed DB with content -->

<!-- The goal is to seed EdgeDB with [this content](https://github.com/learn-anything/seed/tree/main/wiki/nikita). Can be seen online [here](https://wiki.nikiv.dev).

However you can try seed it with a wiki / folder of markdown of yourself.

Just add a folder in `seed/wiki` like `seed/wiki/my-wiki` and put some .md files inside. -->

<!-- ### Run Sync DB code

The goal of this command:

```
bun db:sync
```

Is to sync your local EdgeDB instance with the contents of the `seed` folder you just cloned.

For this, you need to create a file here:`api/edgedb/sync/.env`. With content like this:

```
SEED_FOLDER_NAME=nikita
USERNAME=nikita
```

You can swap the names to your own. The `SEED_FOLDER_NAME` is the folder that is found in `seed/wiki`.

Read [api/edgedb/sync/sync.ts](api/edgedb/sync/sync.ts) and [api/edgedb/sync/wiki.ts](api/edgedb/sync/wiki.ts) for details how sync works. -->

## Run GraphQL server (Grafbase)

> **Warning**
> instructions might break, will be reviewed before first LA public release

Before running [Grafbase](https://grafbase.com) server, create file at `grafbase/.env` with this content:

```
EDGEDB_INSTANCE=learn-anything
EDGEDB_SECRET_KEY=edbt_ey
```

`EDGEDB_SECRET_KEY` can be gotten by running `bun db:ui` which will open the EdgeDB UI.

In terminal after running above command you will see url like `http://localhost:10700/ui?authToken=edbt_ey`. `EDGEDB_SECRET_KEY` is the authToken content.

Then run:

```
bun grafbase
```

Will start Grafbase locally and give you GraphQL access.

Visit http://localhost:4000/ to see [Grafbase pathfinder](https://grafbase.com/docs/tools/pathfinder)

## Run website (Solid)

> **Warning**
> instructions might break, will be reviewed before first LA public release

<!-- TODO: automate creating of `.env` file with default content as part of `bun setup` command -->
<!-- TODO: do same for API .env too -->

Create `.env` file inside [website](app/packages/website) with this content:

```
VITE_HANKO_API=https://e879ccc9-285e-49d3-b37e-b569f0db4035.hanko.io
API_OF_GRAFBASE=http://127.0.0.1:4000/graphql
```

[Hanko](https://www.hanko.io/) is used as auth provider. You can swap Hanko API variable content with one from a project you create yourself.

Run:

```
bun web:dev
```

Open http://localhost:3000

## Run desktop app (Tauri/Rust)

> **Warning**
> instructions might break, will be reviewed before first LA public release

```
bun app:dev
```

<!-- ### Useful DevTools panel

In the app you get after running `bun app:dev`, you will see DevTools panel in bottom right corner. It contains a list of useful actions you can run to aid you.

One of the actions is `Seed TinyBase`. This will seed your local TinyBase store/sqlite with [one of the wikis](https://github.com/learn-anything/seed/tree/main/wiki/nikita) in seed folder.

Read [app/packages/preload/src/index.ts](app/packages/preload/src/index.ts) file for details. `syncWikiFromSeed` is the function. -->

<!-- ## Run mobile app

> WIP -->

<!-- ## Test

> below tests are in TS, only relevant now to help migration to rust

```
bun test
```

Will run tests found in [test](test).

[test/wiki.test.ts](test/wiki.test.ts) file tests markdown file parsing.

Running code via tests is very effective. You can open terminal on your right and edit code on the left and on each `.ts` file save it will rerun the test and check if behavior you are testing is correct. Reading through the test suite is great way to understand the backend part of the app.

You can point the tests at your own wiki/notes folder too. Put the folder with files into seed/test folder you get from running `bun dev-setup` -->

## Contribute

Current tasks to do are in [docs/todo.md](docs/todo.md) (sorted by priority).

If task/bug is not mentioned there, open a GitHub issue or start a discussion.

Join [Discord](https://discord.com/invite/bxtD8x6aNF) to get any help you need to make your contribution.

All PRs with improvements to docs/code or contributions to existing discussions/issues are welcome.

## Docs

All docs can be seen in [docs](docs).

It is advisable you read them, before you start developing anything as they try give a lot of context and general knowledge.

There is big focus on documentation and clarity in the project. All code should be clear and understandable and well documented.

Check [docs/dev-tips.md](docs/dev-tips.md) for some advice on development.

### ♥️

[![MIT](http://bit.ly/mitbadge)](https://choosealicense.com/licenses/mit/) [![Twitter](http://bit.ly/latwitt)](https://twitter.com/learnanything_)
