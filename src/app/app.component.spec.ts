import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MQTT_SERVICE_OPTIONS, MqttModule } from 'ngx-mqtt';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        MqttModule.forRoot(MQTT_SERVICE_OPTIONS)
      ],
      providers: [
        MqttModule
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'smart-mirror' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('smart-mirror');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, smart-mirror');
  });
});
