import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  weight: number;
  height: number;

  constructor(private toastController: ToastController) {}

  isFormValid() {
    return this.height && this.weight && this.height > 0 && this.weight > 0;
  }

  onCalculate() {
    const imc = this.weight / (this.height * this.height);

    const imcCategory = this.getIMCCategory(imc)

    this.showMessage(`IMC = ${imcCategory}`);
  }

  getIMCCategory(imc) {
    const roundedIMC = imc.toFixed(2);

    const imcTypes = {
      thinness: `${roundedIMC} - Magreza`,
      normal: `${roundedIMC} - Normal`,
      overWeight: `${roundedIMC} - Sobrepeso`,
      obesity: `${roundedIMC} - Obesidade`,
      severeObesity: `${roundedIMC} - Obesidade grave`,
    };

    if (imc < 18.5) return imcTypes.thinness;
    if (imc >= 18.5 && imc <= 24.9) return imcTypes.normal;
    if (imc >= 18.5 && imc <= 24.9) return imcTypes.normal;
    if (imc >= 25 && imc <= 29.9) return imcTypes.overWeight;
    if (imc >= 30 && imc <= 39.9) return imcTypes.obesity;
    if (imc >= 40) return imcTypes.severeObesity;
  }

  async showMessage(msg: string) {
    const previousToast = await this.toastController.getTop();
    if (previousToast) {
      await this.toastController.dismiss();
    }

    const toast = await this.toastController.create({
      message: msg,
      color: 'light',
      buttons: [
        {
          icon: 'close',
        },
      ],
    });
    toast.present();
  }
}
