import { User } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { first, Subscription } from 'rxjs';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  error: undefined;
  private _subscription: Subscription = new Subscription();
  constructor(private service: UserService) {}

  user: User[] = [];
  loading = true;

  ngOnInit(): void {
    console.log('User data:', this._subscription);

    this.service
      .getUsers()
      .pipe(first())

      .subscribe({
        next: (data) => {
          this.user = data;
        },
        error: (e) => {
          this.user = [];
          this.loading = false;
          this.error = e.message;
        },
        complete: () => (this.loading = false),
      });
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to avoid memory leaks
    if (this._subscription && !this._subscription.closed) {
      this._subscription.unsubscribe();
    }
    console.log('User data:', this._subscription);
  }
}
