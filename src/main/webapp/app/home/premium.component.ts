import { Component, OnInit } from '@angular/core';
import { Account, AccountService } from 'app/core';
import { JhiEventManager } from 'ng-jhipster';
import { Router } from '@angular/router';

@Component({
    selector: 'jhi-premium',
    templateUrl: './premium.component.html',
    styleUrls: ['premium.scss']
})
export class PremiumComponent implements OnInit {
    account: Account;

    ngOnInit(): void {
        this.accountService.identity().then((account: Account) => {
            this.account = account;
        });
    }

    constructor(private accountService: AccountService, private eventManager: JhiEventManager, protected router: Router) {
        this.router.routeReuseStrategy.shouldReuseRoute = function() {
            return false;
        };
    }

    save() {
        this.accountService.makeUserPremium(this.account.login).subscribe(response => {
            this.eventManager.broadcast({
                name: 'paymentDone',
                content: `Payment was done for user ${this.account.login}!`
            });
            this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(data => {
                this.router.navigated = false;
                this.router.navigate([''], { queryParams: { refresh: true } });
            });
        });
    }
}
