import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
	const { device, browser } = userAgent(request);

	const headers = new Headers(request.headers);
	headers.set("isMobile", device.type == "mobile" ? "1" : "0");
	headers.set("isSafari", browser.name == "Safari" ? "1" : "0");

	return NextResponse.next({
		request: {
			headers,
		},
	});
}
