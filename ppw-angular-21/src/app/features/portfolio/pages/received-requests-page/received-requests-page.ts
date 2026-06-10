import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth';
import { PortfolioService } from '../../services/portfolio.service';
import { RequestsService } from '../../services/requests.service';
import { ContactRequest, RequestStatus } from '../../models/portfolio.models';

@Component({
  selector: 'app-received-requests-page',
  standalone: true,
  imports: [DatePipe, FormsModule, RouterLink],
  templateUrl: './received-requests-page.html',
})
export class ReceivedRequestsPage implements OnInit {
  private auth = inject(AuthService);
  private portfolio = inject(PortfolioService);
  private requestsSvc = inject(RequestsService);

  currentUser = this.auth.currentUser;
  isReady = signal(false);

  developer = computed(() => {
    const u = this.currentUser();
    if (!u?.email) return undefined;
    return this.portfolio.getDeveloperByEmail(u.email);
  });

  requests = signal<ContactRequest[] | undefined>(undefined);

  editing = signal<Record<string, { response: string; status: RequestStatus }>>({});
  saving = signal<string | null>(null);

  async ngOnInit() {
    await this.portfolio.loadAll();
    const dev = this.developer();
    if (dev) {
      this.requestsSvc.getReceivedRequests(dev.slug).subscribe((list) => {
        this.requests.set(list);
      });
    } else {
      this.requests.set([]);
    }
    this.isReady.set(true);
  }

  startEdit(req: ContactRequest) {
    if (!req.id) return;
    const current = this.editing();
    this.editing.set({
      ...current,
      [req.id]: {
        response: req.response ?? '',
        status: req.status,
      },
    });
  }

  cancelEdit(id: string) {
    const current = { ...this.editing() };
    delete current[id];
    this.editing.set(current);
  }

  async saveEdit(id: string) {
    const state = this.editing()[id];
    if (!state) return;
    this.saving.set(id);
    try {
      await this.requestsSvc.updateRequest(id, {
        response: state.response,
        status: state.status,
      });
      this.cancelEdit(id);
    } finally {
      this.saving.set(null);
    }
  }

  updateField(id: string, field: 'response' | 'status', value: any) {
    const current = this.editing();
    if (!current[id]) return;
    this.editing.set({
      ...current,
      [id]: { ...current[id], [field]: value },
    });
  }
}
