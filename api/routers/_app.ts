import { router } from "../trpc";
import { flickrRouter } from "./flickr";
import { uptimeRobotRouter } from "./uptime-robot";

export const appRouter = router({
	uptimeRobot: uptimeRobotRouter,
	flickr: flickrRouter,
});

export type AppRouter = typeof appRouter;
