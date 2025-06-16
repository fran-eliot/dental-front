export class Treatments {
  id_treatments: number;
  name_treatments: string;
  type_treatments: string;
  duration_treatments: number;
  price_treatments: number;
  visible_to_patients_treatments: boolean;


  constructor(id_treatments: number, name_treatments: string, type_treatments: string, duration_treatments: number, price_treatments: number, visible_to_patients_treatments: boolean) {
    this.id_treatments = id_treatments;
    this.name_treatments = name_treatments;
    this.type_treatments = type_treatments;
    this.duration_treatments = duration_treatments;
    this.price_treatments = price_treatments;
    this.visible_to_patients_treatments = visible_to_patients_treatments;
  }
}
