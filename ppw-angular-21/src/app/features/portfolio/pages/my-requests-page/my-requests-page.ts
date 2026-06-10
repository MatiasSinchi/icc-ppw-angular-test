import { Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-my-requests-page',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './my-requests-page.html',
  styleUrls: ['./my-requests-page.css'],
})
export class MyRequestsPage {
  private requestsSvc = inject(RequestsService);
  requests = toSignal(this.requestsSvc.getMyRequests(), { initialValue: undefined });
}
