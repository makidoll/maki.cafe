import { Pipe, PipeTransform } from "@angular/core";
import { format } from "timeago.js";

@Pipe({
	name: "timeAgo",
})
export class TimeAgoPipe implements PipeTransform {
	transform(value: Date, ...args: unknown[]): string {
		return format(value);
	}
}
