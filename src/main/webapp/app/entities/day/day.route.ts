import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Day } from 'app/shared/model/day.model';
import { DayService } from './day.service';
import { DayComponent } from './day.component';
import { DayDetailComponent } from './day-detail.component';
import { DayUpdateComponent } from './day-update.component';
import { DayDeletePopupComponent } from './day-delete-dialog.component';
import { IDay } from 'app/shared/model/day.model';
import { DayDeleteDaysComponent } from 'app/entities/day/day-delete-days.component';

@Injectable({ providedIn: 'root' })
export class DayResolve implements Resolve<IDay> {
    constructor(private service: DayService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IDay> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Day>) => response.ok),
                map((day: HttpResponse<Day>) => day.body)
            );
        }
        return of(new Day());
    }
}

export const dayRoute: Routes = [
    {
        path: '',
        component: DayComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: DayDetailComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: DayUpdateComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'route/:routeId',
        component: DayUpdateComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'route/del/:routeId',
        component: DayDeleteDaysComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: DayUpdateComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dayPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: DayDeletePopupComponent,
        resolve: {
            day: DayResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'p1App.day.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
