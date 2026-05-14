import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './app-header.html',
  styleUrls: ['./app-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeader {
  readonly brand = signal("ppw-angular");
  readonly showInfo = signal(false);
  readonly toggleLabel = computed(() => this.showInfo() ? "Ocultar info" : "Mostrar info");
    
  changeBrand(): void {
    //actualizar el valor de la senal brand
    this.brand.update((valor)=> valor + '!');
  }
  resetBrand(): void {
    //actualizar el valor de la senal brand
    this.brand.set("ppw-angular");
  }
  toggleInfo(){
    this.showInfo.update((valor) => !valor);
  }
}