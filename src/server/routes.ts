import { EventEmitter, on } from "events";
import { router, publicProcedure } from "./trpc";
import { db } from "./db";
import { z } from "zod";
import { NoteMutationType } from "@/common/constants/note-mutation-type";

const ee = new EventEmitter();

const createOrUpdateBody = z.object({
  title: z.string(),
  content: z.string().optional(),
  color: z.string().optional(),
});

export const appRouter = router({
  noteList: publicProcedure.query(() => {
    return db.note.findMany();
  }),
  noteCreate: publicProcedure
    .input(createOrUpdateBody)
    .mutation(({ input }) => {
      const newNote = db.note.insert(input);
      ee.emit("event", { action: NoteMutationType.CREATE, data: newNote });
      return newNote;
    }),
  noteUpdate: publicProcedure
    .input(
      z.object({
        id: z.string(),
        data: createOrUpdateBody,
      })
    )
    .mutation(({ input }) => {
      const updatedNote = db.note.update(input.id, input.data);
      ee.emit("event", { action: NoteMutationType.UPDATE, data: updatedNote });
      return updatedNote;
    }),
  noteDelete: publicProcedure.input(z.string()).mutation(({ input }) => {
    db.note.delete(input);
    ee.emit("event", { action: NoteMutationType.DELETE, data: { id: input } });
  }),
  noteSubscription: publicProcedure.subscription(async function* (opts) {
    for await (const [e] of on(ee, "event", {
      signal: opts.signal,
    })) {
      yield e;
    }
  }),
});

export type AppRouter = typeof appRouter;
