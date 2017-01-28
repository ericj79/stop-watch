import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

import { TimeData } from './time-data';
import { States } from './states.enum';

@Injectable()
export class WatchStateService {

  public state: BehaviorSubject<States> = new BehaviorSubject<States>(States.ready);
  public startTime: number;
  public results: {[key: string]: BehaviorSubject<TimeData>};

  private socket: SocketIOClient.Socket;
  constructor() {
    this.socket = io();
    this.socket.on('update', this.handleMessage.bind(this));
    this.results = {
      'Runner A': new BehaviorSubject<TimeData>(null),
      'Runner B': new BehaviorSubject<TimeData>(null)
    };
  }

  handleMessage(message: any) {
    if (!message || !message.state ) {
        console.log('??: ', message);
    }
    switch (message.state) {
      case States.running:
        this.start(message.time);
        break;
      case States.partial:
        this.partial(message.target, message.result);
        break;
      case States.ready:
        this.reset();
        break;
    }
  }

  triggerUpdate(title: string, time: number, name?: string, grade?: string) {
    const data: TimeData = new TimeData(time, name, grade);
    const mssg = {
      state: States.partial,
      target: title,
      result: data
    };
    this.socket.emit('update', mssg);
    this.partial(title, data);
  }

  partial(target: string, result: TimeData) {
    this.results[target].next(result);
    if ((this.results['Runner A'].getValue() !== null)
    && (this.results['Runner B'].getValue() !== null)) {
      this.state.next(States.waiting);
    } else {
      this.state.next(States.partial);
    }
  }

  triggerReset() {
    const data = {
      state: States.ready
    };
    this.socket.emit('update', data);
    this.reset();
  }

  reset() {
    this.results['Runner A'].next(null);
    this.results['Runner B'].next(null);
    this.state.next(States.ready);
  }

  triggerStart() {
    if (this.state.getValue() === States.ready) {
      const data = {state: States.running, time: 0};
      this.socket.emit('update', data);
      this.start(data.time);
    }
  }

  start(time: number) {
    if (this.state.getValue() === States.ready) {
      console.log('elapsed time', time)
      this.startTime = Date.now() - time;
      this.state.next(States.running);
    }
  }

}
