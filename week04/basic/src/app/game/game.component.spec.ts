import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ GameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Technology guessing game');
  });

  it('should fail on "React"',  () => {
    component.guess = 'React';
    component.check();
    expect(component.status).toContain('incorrect');
  });

  it('should succeed on "Angular"',  () => {
    component.guess = 'Angular';
    component.check();
    expect(component.status).toContain(' correct');
  });

  it('input updates guess',  () => {
    const compiled = fixture.nativeElement;
    compiled.querySelector('input').value = 'asdf';
    compiled.querySelector('input').dispatchEvent(new Event('input'));
    expect(component.guess).toEqual('asdf');
  });

  it('shows status',  () => {
    const compiled = fixture.nativeElement;
    component.guess = 'Angular';
    component.check();
    fixture.detectChanges();
    expect(compiled.innerText).toContain(' correct');
  });

});
