import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { ScullyLibModule } from "@scullyio/ng-lib";
import { AppComponent } from "./app.component";
import { CardsModule } from "./cards/cards.module";
import { HomeComponent } from "./home/home.component";
import { SocialComponent } from "./home/social/social.component";
import { UiModule } from "./ui/ui.module";

const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "**", redirectTo: "/" },
];

@NgModule({
	declarations: [AppComponent, HomeComponent, SocialComponent],
	imports: [
		BrowserModule,
		RouterModule.forRoot(routes),
		UiModule,
		CardsModule,
		ScullyLibModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
