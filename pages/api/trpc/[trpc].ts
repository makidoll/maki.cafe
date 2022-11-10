import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../api/routers/_app";

export default trpcNext.createNextApiHandler({
	router: appRouter,
	createContext: () => ({}),
	// onError({ error }) {
	// 	if (error.code === "INTERNAL_SERVER_ERROR") {
	// 		// send to bug reporting
	// 		console.error("Something went wrong", error);
	// 	}
	// },
});
