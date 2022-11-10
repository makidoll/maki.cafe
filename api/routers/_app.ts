import { router } from "../trpc";
import { uptimeRobotRouter } from "./uptime-robot";

export const appRouter = router({
	uptimeRobot: uptimeRobotRouter,
});

export type AppRouter = typeof appRouter;
