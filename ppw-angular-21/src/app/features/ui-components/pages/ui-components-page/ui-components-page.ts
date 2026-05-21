import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GlassStatCard } from './components/glass-stat-card/glass-stat-card';
import { GradientCtaBanner } from './components/gradient-cta-banner/gradient-cta-banner';
import { FeatureChipList } from './components/feature-chip-list/feature-chip-list';
import { AlertList, AlertItem } from './components/alert-list/alert-list';
import { DaisyuiStats, StatItem } from './components/daisyui-stats/daisyui-stats';
import { DaisyuiSteps } from './components/daisyui-steps/daisyui-steps';
import { AvatarGroup, AvatarItem } from './components/avatar-group/avatar-group';
import { AccordionFaq, FaqItem } from './components/accordion-faq/accordion-faq';

@Component({
  selector: 'app-ui-components-page',
  imports: [
    GlassStatCard,
    GradientCtaBanner,
    FeatureChipList,
    AlertList,
    DaisyuiStats,
    DaisyuiSteps,
    AvatarGroup,
    AccordionFaq,
  ],
  templateUrl: './ui-components-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UiComponentsPage {
  readonly quickChips = [
    'Glass Surface',
    'Gradient CTA',
    'Responsive Grid',
    'Standalone Components',
    'Tailwind + DaisyUI',
  ];

  readonly systemAlerts: AlertItem[] = [
    { type: 'info', message: 'DaisyUI está activo con el tema cupcake.' },
    { type: 'success', message: 'Todos los componentes se cargaron correctamente.' },
    { type: 'warning', message: 'Recuerda revisar contraste en modo oscuro.' },
    { type: 'error', message: 'Componente sin inputs requeridos lanzará error en runtime.' },
  ];

  readonly projectStats: StatItem[] = [
    { title: 'Páginas', value: '8', desc: 'Rutas activas en la app' },
    { title: 'Componentes', value: '12', desc: 'Piezas reutilizables' },
    { title: 'Cobertura UI', value: '100%', desc: 'Con Tailwind + DaisyUI' },
  ];

  readonly devSteps: string[] = [
    'Configuración',
    'Layout',
    'Formularios',
    'Componentes UI',
    'HTTP',
    'Auth',
  ];

  readonly teamAvatars: AvatarItem[] = [
    { initials: 'PT', color: 'bg-sky-500' },
    { initials: 'MS', color: 'bg-indigo-500' },
    { initials: 'AR', color: 'bg-emerald-500' },
  ];

  readonly faqItems: FaqItem[] = [
    {
      question: '¿Por qué usar DaisyUI con Tailwind?',
      answer: 'DaisyUI añade clases semánticas de componentes (btn, card, badge) sobre Tailwind, reduciendo repetición y acelerando el desarrollo sin perder el control de utilidades.',
    },
    {
      question: '¿Cómo cambio el tema global?',
      answer: 'Modificando el atributo data-theme en el elemento <html> del index.html. DaisyUI incluye más de 30 temas listos para usar.',
    },
    {
      question: '¿Los componentes Angular son compatibles con DaisyUI?',
      answer: 'Sí. DaisyUI es puro CSS, sin JavaScript propio. Las clases se aplican directamente en el template HTML de cualquier componente Angular.',
    },
  ];
}
