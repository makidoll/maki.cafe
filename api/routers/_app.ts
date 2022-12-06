import { router } from "../trpc";
import { flickrRouter } from "./flickr";
import { sketchfabRouter } from "./sketchfab";
import { uptimeRobotRouter } from "./uptime-robot";

export const appRouter = router({
	uptimeRobot: uptimeRobotRouter,
	flickr: flickrRouter,
	sketchfab: sketchfabRouter,
});

export type AppRouter = typeof appRouter;
