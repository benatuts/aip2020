import { TestBed, async, fakeAsync, ComponentFixture, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

describe('AppComponent', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        GameComponent
      ],
    }).compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'week04'`, () => {
    expect(component.title).toEqual('week04');
  });

  it('should show the game', () => {
    expect(fixture.nativeElement.innerText).toContain('guessing game');
  });

});
