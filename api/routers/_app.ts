import { router } from "../trpc";
import { flickrRouter } from "./flickr";
import { githubGistRouter } from "./github-gists";
import { sketchfabRouter } from "./sketchfab";
import { uptimeRobotRouter } from "./uptime-robot";

export const appRouter = router({
	uptimeRobot: uptimeRobotRouter,
	flickr: flickrRouter,
	sketchfab: sketchfabRouter,
	githubGist: githubGistRouter,
});

export type AppRouter = typeof appRouter;
