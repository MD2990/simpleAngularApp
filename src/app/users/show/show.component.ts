import { User } from './../model/model';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

@Component({
  selector: 'app-show',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show.component.html',
  styleUrl: './show.component.css',
})
export class ShowComponent implements OnInit {
  error: undefined;
  constructor(private service: UserService) {}

  user: User[] = [];
  loading = true;

  ngOnInit(): void {
    // handle data and error
    of(
      this.service.getUsers().subscribe({
        next: (data) => (this.user = data),
        error: (e) => {
          this.user = [];
          this.loading = false;
          this.error = e.message;
        },

        complete: () => (this.loading = false),
      })
    );
  }
}
