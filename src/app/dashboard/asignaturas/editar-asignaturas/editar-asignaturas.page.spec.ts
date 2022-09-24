import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditarAsignaturasPage } from './editar-asignaturas.page';

describe('EditarAsignaturasPage', () => {
  let component: EditarAsignaturasPage;
  let fixture: ComponentFixture<EditarAsignaturasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAsignaturasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditarAsignaturasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
