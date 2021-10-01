import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardTitleComponent } from "./card-title/card-title.component";
import { CardComponent } from "./card/card.component";
import { DancingLettersComponent } from "./dancing-letters/dancing-letters.component";
import { DotMapComponent } from "./dot-map/dot-map.component";
import { EmojiComponent } from "./emoji/emoji.component";
import { LogoIconDirective } from "./logo-icon/logo-icon.directive";
import { LogoComponent } from "./logo/logo.component";
import { MaterialIconComponent } from "./material-icon/material-icon.component";
import { SocialIconDirective } from "./social-icon/social-icon.directive";
import { SpinnerComponent } from "./spinner/spinner.component";
import { UserImageComponent } from "./user-image/user-image.component";

const components = [
	CardTitleComponent,
	CardComponent,
	DancingLettersComponent,
	DotMapComponent,
	EmojiComponent,
	LogoComponent,
	MaterialIconComponent,
	SpinnerComponent,
	UserImageComponent,
];

const directives = [LogoIconDirective, SocialIconDirective];

@NgModule({
	declarations: [...components, ...directives],
	imports: [CommonModule],
	exports: [...components, ...directives],
})
export class UiModule {}
