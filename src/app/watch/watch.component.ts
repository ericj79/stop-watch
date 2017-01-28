import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { States } from '../states.enum';
import { WatchStateService } from '../watch-state.service';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.component.html',
  styleUrls: ['./watch.component.css']
})
export class WatchComponent implements OnInit, OnDestroy {
  public readonly READY: States = States.ready;
  public readonly RUNNING: States = States.running;
  public readonly WAITING: States = States.waiting;

  private stateSubscription: Subscription;
  public currentState: States;

  constructor(private watchState: WatchStateService) { }

  ngOnInit() {
    this.stateSubscription = this.watchState.state.asObservable()
      .subscribe((newState: States) => {
        this.currentState = newState;
      });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  onStart() {
    this.watchState.triggerStart();
  }

  onReset() {
    this.watchState.triggerReset();
  }
}
