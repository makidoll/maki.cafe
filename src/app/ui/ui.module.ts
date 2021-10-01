import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CardFooterComponent } from "./card-footer/card-footer.component";
import { CardTitleComponent } from "./card-title/card-title.component";
import { CardComponent } from "./card/card.component";
import { DancingLettersComponent } from "./dancing-letters/dancing-letters.component";
import { DotMapComponent } from "./dot-map/dot-map.component";
import { EmojiComponent } from "./emoji/emoji.component";
import { HstackComponent } from "./hstack/hstack.component";
import { LogoIconDirective } from "./logo-icon/logo-icon.directive";
import { LogoComponent } from "./logo/logo.component";
import { MaterialIconComponent } from "./material-icon/material-icon.component";
import { SocialIconDirective } from "./social-icon/social-icon.directive";
import { SpinnerComponent } from "./spinner/spinner.component";
import { UserImageComponent } from "./user-image/user-image.component";
import { VstackComponent } from "./vstack/vstack.component";

const components = [
	CardFooterComponent,
	CardTitleComponent,
	CardComponent,
	DancingLettersComponent,
	DotMapComponent,
	EmojiComponent,
	HstackComponent,
	LogoComponent,
	MaterialIconComponent,
	SpinnerComponent,
	UserImageComponent,
	VstackComponent,
];

const directives = [LogoIconDirective, SocialIconDirective];

@NgModule({
	declarations: [...components, ...directives],
	imports: [CommonModule],
	exports: [...components, ...directives],
})
export class UiModule {}
