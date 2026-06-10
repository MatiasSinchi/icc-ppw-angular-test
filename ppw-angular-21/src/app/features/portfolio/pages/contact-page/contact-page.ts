import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth';
import { PortfolioService } from '../../services/portfolio.service';
import { RequestsService } from '../../services/requests.service';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact-page.html',
})
export class ContactPage implements OnInit {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private portfolio = inject(PortfolioService);
  private requests = inject(RequestsService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  developers = this.portfolio.developers;
  currentUser = this.auth.currentUser;

  isSubmitting = signal(false);
  successId = signal<string | null>(null);
  errorMsg = signal<string | null>(null);

  form = this.fb.group({
    applicantName: ['', [Validators.required, Validators.minLength(3)]],
    applicantEmail: ['', [Validators.required, Validators.email]],
    description: ['', [Validators.required, Validators.minLength(20)]],
    developerSlug: ['', [Validators.required]],
  });

  async ngOnInit() {
    await this.portfolio.loadAll();

    const u = this.currentUser();
    if (u?.email) {
      this.form.patchValue({ applicantEmail: u.email });
    }
    if (u?.displayName) {
      this.form.patchValue({ applicantName: u.displayName });
    }
    const devSlug = this.route.snapshot.queryParamMap.get('developer');
    if (devSlug) {
      this.form.patchValue({ developerSlug: devSlug });
    }
  }

  async onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.errorMsg.set(null);

    const { applicantName, applicantEmail, description, developerSlug } =
      this.form.getRawValue();
    const dev = this.portfolio.getDeveloperBySlug(developerSlug!);

    try {
      const id = await this.requests.createRequest({
        applicantName: applicantName!,
        applicantEmail: applicantEmail!,
        description: description!,
        developerSlug: developerSlug!,
        developerName: dev?.fullName ?? developerSlug!,
      });
      this.successId.set(id);
      this.form.reset();
    } catch (e: any) {
      this.errorMsg.set(
        e?.message ?? 'No se pudo enviar la solicitud. Intenta de nuevo.',
      );
    } finally {
      this.isSubmitting.set(false);
    }
  }
}
