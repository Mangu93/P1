import { Moment } from 'moment';
import { ITag } from 'app/shared/model/tag.model';
import { IDay } from 'app/shared/model/day.model';
import { IRating } from 'app/shared/model/rating.model';
import {User} from 'app/core';

export interface ITRoute {
    id?: number;
    title?: string;
    description?: string;
    date?: Moment;
    tagsInRoutes?: ITag[];
    daysInRoutes?: IDay[];
    routeHasRatings?: IRating[];
    isFollowedBies?: User[];
    user?: User;
}

export class TRoute implements ITRoute {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public date?: Moment,
        public tagsInRoutes?: ITag[],
        public daysInRoutes?: IDay[],
        public routeHasRatings?: IRating[],
        public isFollowedBies?: User[],
        public user?: User
    ) {}
}
