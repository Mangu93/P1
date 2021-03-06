/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { P1TestModule } from '../../../test.module';
import { PointInterestDeleteDialogComponent } from 'app/entities/point-interest/point-interest-delete-dialog.component';
import { PointInterestService } from 'app/entities/point-interest/point-interest.service';

describe('Component Tests', () => {
    describe('PointInterest Management Delete Component', () => {
        let comp: PointInterestDeleteDialogComponent;
        let fixture: ComponentFixture<PointInterestDeleteDialogComponent>;
        let service: PointInterestService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [P1TestModule],
                declarations: [PointInterestDeleteDialogComponent]
            })
                .overrideTemplate(PointInterestDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(PointInterestDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(PointInterestService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
