import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../auth/services/auth.service';

import { WrapperComponent } from './wrapper.component';
import { MatToolbarModule} from "@angular/material/toolbar";


describe('WrapperComponent', () => {
  let component: WrapperComponent;
  let fixture: ComponentFixture<WrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WrapperComponent],
      imports: [RouterTestingModule, MatToolbarModule],
      providers: [{ provide: AuthService, useValue: { getLoggednInUserId: () => 1 } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
