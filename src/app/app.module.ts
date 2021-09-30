import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import player from "lottie-web";
import { LottieModule } from "ngx-lottie";
import { AppComponent } from "./app.component";
import { DiscordComponent } from "./discord/discord.component";
import { DotMapComponent } from "./dot-map/dot-map.component";
import { GamesComponent } from "./games/games.component";
import { HomeComponent } from "./home/home.component";
import { InstagramComponent } from "./instagram/instagram.component";
import { SkebComponent } from "./skeb/skeb.component";
import { SocialComponent } from "./social/social.component";
import { CardTitleComponent } from "./ui/card-title/card-title.component";
import { CardComponent } from "./ui/card/card.component";
import { DancingLettersComponent } from "./ui/dancing-letters/dancing-letters.component";
import { EmojiComponent } from "./ui/emoji/emoji.component";
import { LogoComponent } from "./ui/logo/logo.component";
import { SpinnerComponent } from "./ui/spinner/spinner.component";
import { UserImageComponent } from "./ui/user-image/user-image.component";
import { WhereComponent } from "./where/where.component";
import { WorkComponent } from "./work/work.component";

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
	return player;
}

const routes: Routes = [{ path: "", component: HomeComponent }];

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LogoComponent,
		EmojiComponent,
		CardComponent,
		DiscordComponent,
		UserImageComponent,
		InstagramComponent,
		WorkComponent,
		SpinnerComponent,
		DancingLettersComponent,
		CardTitleComponent,
		DotMapComponent,
		WhereComponent,
		SocialComponent,
		SkebComponent,
		GamesComponent,
	],
	imports: [
		BrowserModule.withServerTransition({ appId: "serverApp" }),
		RouterModule.forRoot(routes, { initialNavigation: "enabled" }),
		LottieModule.forRoot({ player: playerFactory }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
