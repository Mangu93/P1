import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { P1SharedModule } from 'app/shared';
import {
    RatingComponent,
    RatingDetailComponent,
    RatingUpdateComponent,
    RatingDeletePopupComponent,
    RatingDeleteDialogComponent,
    ratingRoute,
    ratingPopupRoute
} from './';

const ENTITY_STATES = [...ratingRoute, ...ratingPopupRoute];

@NgModule({
    imports: [P1SharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [RatingComponent, RatingDetailComponent, RatingUpdateComponent, RatingDeleteDialogComponent, RatingDeletePopupComponent],
    entryComponents: [RatingComponent, RatingUpdateComponent, RatingDeleteDialogComponent, RatingDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class P1RatingModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
