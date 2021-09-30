import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AppComponent } from "./app.component";
import { DiscordComponent } from "./discord/discord.component";
import { HomeComponent } from "./home/home.component";
import { InstagramComponent } from "./instagram/instagram.component";
import { CardComponent } from "./ui/card/card.component";
import { EmojiComponent } from "./ui/emoji/emoji.component";
import { LogoComponent } from "./ui/logo/logo.component";
import { UserImageComponent } from "./ui/user-image/user-image.component";
import { WorkComponent } from "./work/work.component";
import { SpinnerComponent } from "./ui/spinner/spinner.component";
import { DancingLettersComponent } from "./ui/dancing-letters/dancing-letters.component";
import { CardTitleComponent } from "./ui/card-title/card-title.component";
import { DotMapComponent } from "./dot-map/dot-map.component";
import { WhereComponent } from "./where/where.component";
import { LottieModule } from "ngx-lottie";
import player from "lottie-web";
import { SocialComponent } from './social/social.component';
import { SkebComponent } from './skeb/skeb.component';

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
	],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		LottieModule.forRoot({ player: playerFactory }),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
