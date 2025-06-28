# BUN + UIKIT + TRPC

## How to start?

1. Install Bun

   ```
   bun install
   ```

2. Start bun dev server

   ```
   bun dev:server
   ```

3. Run migration

   ```
   bun migrate up
   ```

   This will setup the database and insert few mock data.

   > If you don't want mock data, then run the down migration.

   ```
   bun migrate down
   ```

4. Start bun dev client

   ```
   bun dev:client
   ```
