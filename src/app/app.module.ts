import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RoutesModule } from './routes/routes.module';
import { WatchStateService } from './watch-state.service';
import { AppComponent } from './app.component';
import { WatchComponent } from './watch/watch.component';
import { TimerComponent } from './timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    WatchComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutesModule
  ],
  providers: [WatchStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
