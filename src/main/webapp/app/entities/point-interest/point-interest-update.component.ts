import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {filter, map} from 'rxjs/operators';
import {JhiAlertService} from 'ng-jhipster';
import {IPointInterest} from 'app/shared/model/point-interest.model';
import {PointInterestService} from './point-interest.service';
import {IRating} from 'app/shared/model/rating.model';
import {RatingService} from 'app/entities/rating';
import {ITRoute} from 'app/shared/model/t-route.model';
import {TRouteService} from 'app/entities/t-route';

@Component({
    selector: 'jhi-point-interest-update',
    templateUrl: './point-interest-update.component.html'
})
export class PointInterestUpdateComponent implements OnInit {
    pointInterest: IPointInterest;
    isSaving: boolean;
    routes: ITRoute[];
    ratings: IRating[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected pointInterestService: PointInterestService,
        protected ratingService: RatingService,
        protected routesService: TRouteService,
        protected activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({pointInterest}) => {
            this.pointInterest = pointInterest;
        });
        this.routesService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITRoute[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITRoute[]>) => response.body)
            )
            .subscribe((res: ITRoute[]) => (this.routes = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.ratingService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IRating[]>) => mayBeOk.ok),
                map((response: HttpResponse<IRating[]>) => response.body)
            )
            .subscribe((res: IRating[]) => (this.ratings = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pointInterest.id !== undefined) {
            this.subscribeToSaveResponse(this.pointInterestService.update(this.pointInterest));
        } else {
            this.subscribeToSaveResponse(this.pointInterestService.create(this.pointInterest));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPointInterest>>) {
        result.subscribe((res: HttpResponse<IPointInterest>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackRatingById(index: number, item: IRating) {
        return item.id;
    }
    trackRouteById(index: number, item: ITRoute) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
