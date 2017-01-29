import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { TimeData } from '../time-data';
import { States } from '../states.enum';
import { WatchStateService } from '../watch-state.service';

const MINUTES = 60000;
const SECONDS = 1000;
const HUNDREDTHS = 10;

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {

  private readonly READY: States = States.ready;
  private readonly RUNNING: States = States.running;
  private readonly WAITING: States = States.waiting;

  @Input() timerTitle: string;

  private dataSubscription: Subscription;
  private stateSubscription: Subscription;
  private currentState: States;
  public currentTime: string = '00:00.00';
  public finalData: TimeData;
  public name: string;
  public grade: string;

  constructor(private watchState: WatchStateService) { }

  ngOnInit() {
    this.stateSubscription = this.watchState.state.asObservable()
      .subscribe((newState: States) => {
        this.currentState = newState;
        if (this.currentState === States.running) {
          requestAnimationFrame(this.updateTime.bind(this) as FrameRequestCallback);
        }
        if (this.currentState === States.ready) {
          this.currentTime = '';
          this.finalData = undefined;
        }
      });
    this.dataSubscription = this.watchState.results[this.timerTitle].asObservable()
      .subscribe((result: TimeData) => {
        this.finalData = result;
        console.log('new final data', this.finalData);
      });
  }

  ngOnDestroy() {
    this.stateSubscription.unsubscribe();
  }

  onStop() {
      const delta: number = Date.now() - this.watchState.startTime;
      this.watchState.triggerUpdate(this.timerTitle, delta);
  }

  onSubmit() {
      this.watchState.triggerUpdate(this.timerTitle, this.finalData.time, this.name, this.grade);
      this.name = undefined;
      this.grade = undefined;
  }

  onCancel() {
      this.watchState.triggerUpdate(this.timerTitle, null);
  }

  updateTime() {
    if (!this.finalData) {
      const delta: number = Date.now() - this.watchState.startTime;
      this.currentTime = this.timeToString(delta);
      requestAnimationFrame(this.updateTime.bind(this) as FrameRequestCallback);
    }
  }

  public timeToString(delta: number): string {
    if (delta === null) {
      return 'Cancelled';
    }

    const minutes: string = ('00' + Math.floor(delta / MINUTES)).substr(-2);
    delta = delta % MINUTES;
    const seconds: string = ('00' + Math.floor(delta / SECONDS)).substr(-2);
    delta = delta % SECONDS;
    const hundredths: string = ('00' + Math.floor(delta / HUNDREDTHS)).substr(-2);
    return minutes + ':' + seconds + '.' + hundredths;
  }

}
