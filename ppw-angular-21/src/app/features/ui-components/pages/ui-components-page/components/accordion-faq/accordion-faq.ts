import { ChangeDetectionStrategy, Component, input } from '@angular/core';

export type FaqItem = {
  question: string;
  answer: string;
};

@Component({
  selector: 'app-accordion-faq',
  templateUrl: './accordion-faq.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionFaq {
  title = input<string>('Preguntas frecuentes');
  items = input<FaqItem[]>([]);
}
