import {Component, OnInit} from '@angular/core';
import {Subscription, timer} from 'rxjs';

@Component({
  selector: 'app-stop-watch',
  templateUrl: './stop-watch.component.html',
  styleUrls: ['./stop-watch.component.scss']
})
export class StopWatchComponent implements OnInit {
  private subscription: Subscription;
  sec: string = '00';
  min: string = '00';
  hour: string = '00';
  lastTime: number = 0;
  timeWhenStopped: number = 0;

  constructor() {
  }

  ngOnInit(): void {
    const start = document.getElementById('start');
    const wait = document.getElementById('wait');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');
    const time$ = timer(this.lastTime, 1000);

    start.addEventListener('click', () => {
      start.setAttribute('disabled', 'disabled');
      wait.removeAttribute('disabled');
      stop.removeAttribute('disabled');
      reset.removeAttribute('disabled');
      this.subscription = time$.subscribe({
        next: (value) => {
          value += this.timeWhenStopped
          this.lastTime = value;
          this.sec = ('0' + value % 60).slice(-2);
          this.min = ('0' + Math.floor(value / 60) % 60).slice(-2);
          this.hour = ('0' + Math.floor(value / 3600)).slice(-2);
        }
      });
    });

    wait.addEventListener('click', () => {
      wait.setAttribute('disabled', 'disabled');
      start.removeAttribute('disabled');
      reset.removeAttribute('disabled');
      this.timeWhenStopped = this.lastTime
      this.subscription.unsubscribe();
    });

    stop.addEventListener('click', () => {
      start.removeAttribute('disabled');
      wait.setAttribute('disabled', 'disabled');
      stop.setAttribute('disabled', 'disabled');
      reset.setAttribute('disabled', 'disabled');

      this.timeWhenStopped = 0
      this.lastTime = 0
      this.sec = '00'
      this.min = '00'
      this.hour = '00'
      this.subscription.unsubscribe();
    })

    reset.addEventListener('click', () => {
      start.setAttribute('disabled', 'disabled');
      wait.removeAttribute('disabled');
      stop.removeAttribute('disabled');
      this.timeWhenStopped = 0
      this.lastTime = 0
      this.sec = '00'
      this.min = '00'
      this.hour = '00'
      this.subscription.unsubscribe();
      this.subscription = time$.subscribe({
        next: (value) => {
          value += this.timeWhenStopped
          this.lastTime = value;
          this.sec = ('0' + value % 60).slice(-2);
          this.min = ('0' + Math.floor(value / 60) % 60).slice(-2);
          this.hour = ('0' + Math.floor(value / 3600)).slice(-2);
        }
      });
    })
  }
}
